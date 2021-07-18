import React, {useState} from 'react';
import Layout from "../core/layout.component";
import {Link} from 'react-router-dom';
import { signup } from '../auth';

const SignUp = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false 
    });

    const {name, email, password, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpFrom = () => (
        <form>
            <div className="form-group"> 
                <label className="text-muted"> Name </label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
            </div>

            <div className="form-group"> 
                <label className="text-muted"> Email </label>
                <input type="text" onChange={handleChange('email')} className="form-control" value={email}/>
            </div>

            <div className="form-group"> 
                <label className="text-muted"> Password </label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary"> Submit </button>
        </form>
    ) 

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please<Link to='/singin'> Sign in  </Link>
        </div>
    );

    return (
        <Layout title="Signup" description="Sign up for demo app" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpFrom()}
        </Layout>
    )
}
    


export default SignUp;