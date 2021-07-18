import React, { useState, useEffect } from "react";
import Layout from "../core/layout.component";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValue, updateStatusValue } from "./apiAdmin";
import moment from "moment";


const Orders = () => {
    const [orders, setOrders] = useState ([]);

    const [statusValues, setStatusValues] = useState ([]);

    const {user, token} = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            console.log(data);
            if(data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        })
    }

    const loadStatusValue = () => {
        getStatusValue(user._id, token).then(data => {
            console.log(data);
            if(data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        })
    }
    //update order status in backend 
    const handleStatusChange = (event, orderId) => {
       updateStatusValue(user._id, token, orderId, event.target.value).then(data => {
           console.log(data);
           if(data.error) {
               console.log('Không update được')
           } else {
               loadOrders()
           }
       })
    }
    //
    const showStatus = (order) => (
        <div className='form-group'>
            <h3 className='mark mb-4'> Status: {order.status} </h3>
            <select className='form-control' 
                onChange={(event) => handleStatusChange(event, order._id)}
            >
                <option> Update Status</option>    
                {statusValues.map((status,index) => (
                    <option key={index} value={status}> {status} </option>
                ))}
             </select>
        </div>
    )


    const noOrders = orders => {
        return orders.length < 1 ? <h3> No Orders</h3> : null
    }

    //lấy orders length 
    const showOrdersLength = (orders) => {
        if(orders.length > 0) {
            return (
                <h1 className='text-danger display-2'> Total orders : {orders.length} </h1>
            )
        }
        else {
            return <h1 className='text-danger'> No orders </h1>
        }
    }


    useEffect(() => {
      loadOrders()
      loadStatusValue()
    }, [])

    return (
        <Layout 
            title='Orders'
            description={`Xin chào ${user.name}`}
        >
            <div className='row'> 
                <div className='col-md-8 offset-md-2'>
                    {showOrdersLength(orders)}

                    {orders.map((order, orderIndex) => {
                        return (
                            <div className='mt-5' key={orderIndex} style={{borderBottom: "5px solid red"}}> 
                                <h2 className='mb-5'>
                                    <span className='bg-primary'>
                                        OrderId: {order._id}
                                    </span>
                                </h2>

                                <ul className='list-group mb-2'>
                                    <li className='list-group-item'>
                                        {showStatus(order)}
                                    </li>
                                    <li className='list-group-item'>
                                        Transaction Id : {order.transaction_id}
                                    </li>
                                    <li className='list-group-item'>
                                       Amount : {order.amount}
                                    </li>
                                    <li className='list-group-item'>
                                       Name : {order.userInfo.userName}
                                    </li>
                                    <li className='list-group-item'>
                                        Ordered on: {moment(order.createdAt).fromNow()}
                                    </li>
                                    <li className='list-group-item'>
                                        Delivery Address : {order.address}
                                    </li>
                                </ul>
                                <h3 className='mt-4 mb-4 font-itaclic'>
                                    Tổng số lượng sản phẩm {order.products.length}
                                </h3>
                            </div>
                        )
                    } )}
                </div>
            </div>

        </Layout>
    )
}

export default Orders;