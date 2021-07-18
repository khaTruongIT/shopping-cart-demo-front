import React, { useState, useEffect } from 'react';
import Layout from './layout.component';
import { getCategories, list  } from './apiCore';
import CardComponent from './card.component';

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const {categories, category, search, results, searched} = data 

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setData({...data, categories: data.data })
            }
        })
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const handleChange = name => event =>  {
        setData({...data, [name]: event.target.value, searched: false });
    }
    //search data 
    const searchData = () => {
        //console.log(search, category);  
        if(search) {
            list({search: search || undefined, category: category})
            .then(res => {
                if(res.error) {
                    console.log(res.error);
                }
                else {
                    setData({...data, results: res, searched: true})
                }
            }) 
        }
    }
    //submit 
    const searchSubmit = (event) => {
        event.preventDefault();
        searchData()
    }

    //tạo form search
    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={handleChange("category")}
                        >
                            <option value="All">All</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return `Tìm thấy ${results.length} products`;
        }
        if(searched && results.length < 1) {
            return `Không tìm thấy sản phẩm`;
        }
    }
    
    // lấy những sản phảm đã search
    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>

                <div className="row">   
                    {results.map((product, index) => (
                    
                     <CardComponent key={index} product={product} />
                 
                    ))}
                </div>
            </div>
        );
    };
    return (
        <div className='row'>
           <div className='container mb-3'>
            {searchForm()}
           </div>

           <div className='container-fluid mb-3'>
            {searchedProducts(results)}
           </div>

        </div>
    )
}

export default Search; 