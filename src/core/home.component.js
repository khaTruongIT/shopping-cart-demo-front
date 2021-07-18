import React, { useState, useEffect } from 'react';
import Layout from './layout.component';
import { getProducts } from './apiCore';
import CardComponent from './card.component';
import Search from './search.component';
import './css/styles.css';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Demo App"
            description="Demo App "
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4">Sách mới </h2>
            <div className="row">
                {productsByArrival.map((product, index) => (
                     <div className='col-4 mb-3' key={index}> 
                         <CardComponent key={index} product={product} />
                     </div>
                ))}
            </div>

            <h2 className="mb-4">Bán chạy </h2>
            <div className="row">
                {productsBySell.map((product, index) => (
                    <div className='col-4 mb-3' key={index}> 
                         <CardComponent key={index} product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;