import React, { useState, useEffect } from 'react';
import Layout from './layout.component';
import CardComponent from './card.component';
import { getCategories, getFilteredProduct } from './apiCore';
import Checkbox from './checkBox.component';
import { prices } from './fixedPrices';
import RadioBox from './radioBox.component';


const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilterResults] = useState([]);
    const [size, setSize] = useState(0);


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data.data);
            }
        });
    };

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters)
        getFilteredProduct(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error);
            }
            setFilterResults(data.data);
            setSize(data.size);
            setSkip(0);
        })
    }

    // load thêm nhiều sản phẩm 
    const loadMoreProducts = () => {
       let toSkip = skip + limit; 
        getFilteredProduct(toSkip, limit, myFilters.filters).then(data => {
            if(data.error) {
                setError(data.error);
            }
            setFilterResults([...filteredResults, ...data.data]);
            setSize(data.size);
            setSkip(toSkip);
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick= {loadMoreProducts} className="btn btn-warning mb-5"> Load more  </button>
            )
        )
    }
    const handleFilters =(filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters; 

         if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    }

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for(let key in data) {
            if(data[key]._id === parseInt(value)) {
                array = data[key].array
            }   
        }
        return array;
    }

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])

    return (
        <Layout
            title="Demo App"
            description="Demo App "
            className="container-fluid"
        >
            <h2 className="mb-4">Shop</h2>
            <div className="row">
               <div className='col-4'>
                   <h4> Tìm kiếm theo danh mục  </h4>
                   <ul>
                     <Checkbox categories={categories} handleFilters={(filters => handleFilters(filters, 'category'))} />
                    </ul>     

                    <h4> Tìm kiếm theo giá  </h4>
                   <div>
                    <RadioBox prices={prices} handleFilters={(filters => handleFilters(filters, 'price'))} />
                    </div>  

                </div>

                <div className='col-8'>
                   <h2 className='mb-4'> Products </h2>
                    <div className='row'>
                        {filteredResults.map((product,index) => (
                            <div key={index} className='col-4 mb-3'> 
                                <CardComponent key={index} product = {product} />
                            </div>
                        ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>    
            </div>
        </Layout>
    );
}

export default Shop;