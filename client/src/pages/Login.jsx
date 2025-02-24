import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import API_BASE_URL from "../config.js"
import { useAuth } from '../AuthContext.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { checkAuth } = useAuth();

    const submitForm = async (e) => {
        e.preventDefault();
        
        try {
            let response = await fetch(API_BASE_URL+'api/auth/login', {
                method: 'post',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message);
                throw new Error(errorData.message || 'Something went wrong');
            }

            await checkAuth();

        } catch (error) {
            console.log(error)
        }
    }
  return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6 mx-auto">
                    <h4 className='text-center'>Login Here</h4>
                    <form onSubmit={submitForm}>
                        <div className="form-group mt-3">
                            <label  htmlFor="email">Enter Email</label>
                            <input type="email" name="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} className="form-control" />
                        </div>
                        <div className="forn-control mt-3">
                            <label htmlFor="password">Enter Password</label>   
                            <input type="password" name="password" id="password" value={password} required onChange={(e) => setPassword(e.target.value)}  className="form-control" />
                        </div>
                        <button className="btn btn-primary mt-3">Login</button>
                        <span className='ms-5'>
                            Dont have an account yet? <Link to="/register" >Signup</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login