import React, {useState, useEffect} from 'react';
import Layout from '../core/layout.component';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getCategories } from '../admin/apiAdmin';
import { connect } from 'react-redux';

const AdminDashboard = (props) => {

    const { user: { _id, name, email, role }} = isAuthenticated();
    const init = () => {
        getCategories().then(data => {
            console.log(data)
            props.dispatch({
                type: 'FETCH_CATEGORIES',
                payload: data.data
            })
        })
        
    };

    useEffect(() => {
        init();
    }, );
    const adminLinks = () => {
        return (
            <div className='card'>
                <h4 className='card-header'> Admin Links </h4>
                <ul className='list-group'>
                    <li className='list-group-item'> 
                        <Link to ='/create/category' className='nav-link'> Create Category  </Link>
                     </li>
                    <li className='list-group-item'> 
                        <Link className='nav-link' to ='/create/product'> Create Product  </Link>
                     </li>
                     <li className='list-group-item'> 
                        <Link className='nav-link' to ='/admin/Orders'> View Orders   </Link>
                     </li>
                     <li className='list-group-item'> 
                        <Link className='nav-link' to ='/admin/products'> Manage Product  </Link>
                     </li>
                </ul>
            </div>
        )
    }


    const adminInfo = () => {
        return ( 
            <div className='card mb-5'>
                <h3 className='card-header'> User Information </h3>
                <ul className='list-group'>
                    <li className='list-group-item'> {name}  </li>
                    <li className='list-group-item'> {email} </li>
                    <li className='list-group-item'> { role === 1 ? 'Admin' : 'User'}</li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title='Dashboard' description='Admin dashboard' className='container-fluid' >
            <div className='row'> 
                <div className='col-3'> 
                    {adminLinks()}
                </div>
                <div className='col-9'> 
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default connect()(AdminDashboard);
