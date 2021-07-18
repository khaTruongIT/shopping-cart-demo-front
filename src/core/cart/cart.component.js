import React, { useState, useEffect } from "react";
import Layout from "../layout.component";
import CardComponent from "../card.component";
import { getCart } from './cartHelpers';
import { Link } from "react-router-dom";
import Checkout from "./checkout.component";

const CartComponent = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run])

    //nếu có sản phẩm 
    const showItems = items => {
        return (
            <div>
                <h2> Giỏ hàng có {`${items.length}`} sản phẩm</h2>
                <hr/>
                {/* {JSON.stringify(items)} */}
                {items.map((product, i) => (
                    <CardComponent
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        )
    }

    //nếu không có sản phẩm 
    const noItemsMessage = () => {
        <h2>Giỏ hàng rỗng. <br> <Link to='/shop' Tiếp tục mua sắm /> </br></h2>
    }

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>


                <div className="col-4">
                    <h2 className="mb-4">Tổng cộng</h2>
                    <hr/>
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );

}

export default CartComponent;