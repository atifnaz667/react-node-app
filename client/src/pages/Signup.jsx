import { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import API_BASE_URL from "../config.js"
import { useAuth } from '../AuthContext.jsx';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {checkAuth} = useAuth();

    const submitForm = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            toast.error("Password and confirm password do not match");
            return;
        }
    
        try {
            const response = await fetch(API_BASE_URL + "api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong");
            }
            
            checkAuth();
            let result = await response.json();
            toast.success(result.message);
            
        } catch (error) {
            toast.error(error.message || "An error occurred");
        }
    };
  return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6 mx-auto">
                    <h4 className='text-center'>Register Here</h4>
                    <form onSubmit={submitForm}>
                        <div className="form-group">
                            <label htmlFor="name">Enter name</label>
                            <input type="text" name="name" value={name} required onChange={(e) => setName(e.target.value)} id="name" className="form-control" />
                        </div>
                        <div className="form-group mt-3">
                            <label  htmlFor="email">Enter Email</label>
                            <input type="email" name="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} className="form-control" />
                        </div>
                        <div className="forn-control mt-3">
                            <label htmlFor="password">Enter Password</label>   
                            <input type="password" name="password" id="password" value={password} required onChange={(e) => setPassword(e.target.value)}  className="form-control" />
                        </div>
                        <div className="forn-control mt-3">
                            <label htmlFor="password">Confirm Password</label>   
                            <input type="password" name="c-password" id="c-password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)}  className="form-control" />
                        </div>
                        <button className="btn btn-primary mt-3">Register</button>
                        <span className="ms-5">
                            Already have an account? <Link to="/login" >Login</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup