import React, { useState, useEffect } from "react";
import Layout from "../layout.component";
import CardComponent from "../card.component"
import { getBraintreeClientToken, processPayment, getProduct, createOrder } from "../apiCore";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";

const Checkout = ({products, setRun = f => f, run = undefined}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    console.log(userId, 'userId');
    const token = isAuthenticated() && isAuthenticated().token;
    console.log(token, 'token');

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);



    const handleAddress = event => { 
        setData({...data, address: event.target.value })
    }

    let deliveryAddress = data.address

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price; 
        }, 0)
    }

    // nếu người dùng có đăng nhập thì sẽ hiện checkout 
    const showCheckout = () => {
        return isAuthenticated() ? (
               <div> {showDropIn()} </div>
            ) : (
                <Link to='/signin'>
                    <button className='btn btn-primary'>
                        Đăng nhập để thanh toán 
                    </button>
                </Link>
            )   
    }

    // mua sản phẩm 
    const buy = () => {
        setData({ loading: true });
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
    
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);
                        // empty cart
                        // create order

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    setRun(!run); // run useEffect in parent Cart
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };

    //hiện lỗi khi ko thanh toán đc 
    const showError = error => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    // thanh toán đc 
     //hiện lỗi khi ko thanh toán đc 
     const showSuccess = success => (
        <div className='alert alert-info' style={{display: success ? '' : 'none'}}>
            Cảm ơn và hẹn gặp lại 
        </div>
    )

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Nhập nơi giao hàng"
                        />
                    </div>

                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success btn-block">
                        Pay
                    </button>
                </div>
            ) : null}
        </div>
    );
    
    const showLoading = loading => (
        loading && <h2> Loading...</h2>
    )

    return (
        <div> 
            <h2> Total: ${getTotal()} </h2>
            {showLoading()}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
}

export default Checkout;