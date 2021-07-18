import React, { useState, useEffect } from "react";
import Layout from "../core/layout.component";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProduct = () => {

    const [products, setProducts] = useState([]);
    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            console.log(data);
            if(data.error) {
                console.log(data.error)
            }
            setProducts(data)
        })
    }


    //deleteProduct
    const destroyProduct = productId => {   
        // console.log(user)
        deleteProduct(productId, user._id, token).then(data => {
            // console.log(user._id, 'userId');
            if(data.error) {
                console.log(data.error)
            }
            else {
                loadProducts()
            }
        })
    }

    useEffect(() => {
      loadProducts()
    }, [])

    return (
        <Layout
            title="Quản lý"
            description="Quản lý sản phẩm  "
            className="container-fluid"
        >
         <div className='row'> 
            <div className='col-12'> 
                <h2 className='text-center'> Tổng cộng {products.length} sản phẩm </h2>
                <ul className="list-group">
                        {products.map((product, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{product.name}</strong>
                                <Link to={`/admin/product/update/${product._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroyProduct(product._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
            </div>
         </div>
        </Layout>
    );
}

export default ManageProduct;