import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './user/signup.component';
import SignIn from './user/signin.component';
import Home from './core/home.component'
import PrivateRoute from './auth/privateRoute';
import Dashboard from './user/user-dashboard.component';
import AdminRoute from './auth/adminRoutes';
import AdminDashboard from './user/admin-dashboard.component';
import AddCategory from './admin/addCategory.component';
import AddProduct from './admin/addProduct.component';
import Shop from './core/shop.component';
import Product from './core/product.component';
import CardComponent from './core/card.component';
import CartComponent from './core/cart/cart.component';
import Orders from './admin/orders.component';
import ManageProduct from './admin/manageProduct.component';
import UpdateProduct from './admin/updateProduct.component';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component = {Home} />
                <Route path="/shop" exact component = {Shop} />
                <Route path="/signin"  component={SignIn} />
                <Route path="/signup"  component={SignUp} />

                <PrivateRoute path="/user/dashboard" exact component = {Dashboard} />
               
                <AdminRoute path = '/admin/dashboard' exact component = {AdminDashboard} />
                //tạo category
                <AdminRoute path="/create/category" exact component={AddCategory} />
                //tạo sản phẩm 
                <AdminRoute path="/create/product" exact component={AddProduct} />
                //quản lý đơn hàng 
                <AdminRoute path="/admin/orders" exact component={Orders} />
                //quản lý sản phẩm 
                <AdminRoute path="/admin/products" exact component={ManageProduct} />
                //Cập nhật sản phẩm 
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                
                <Route path="/product/:productId" exact component = {Product} />
                //cart component 
                <Route path="/cart" exact component = {CartComponent} />

            </Switch>
        </BrowserRouter>
    )
};

export default Routes;