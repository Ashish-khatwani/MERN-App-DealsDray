import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Registration = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [cnfPassword, setCnfPassword] = useState('');
    let navigate = useNavigate();

    let submitForm = () => {
        let payload = {
            name, email, cnfPassword
        };
        if (!name || !email || !cnfPassword) {
            alert("To register, fill all the fields!");
        } else {
            if (password === cnfPassword) {
                axios.post('http://localhost:4001/register', payload)
                    .then((e) => {
                        alert(e.data);
                        navigate("/");
                    })
                    .catch((e) => {
                        alert("Problem in sending data to the Backend!");
                    });
            } else {
                alert("Both passwords should match.");
            }
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-200'>
            <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8'>
                <h1 className='text-center text-2xl font-semibold text-gray-800 mb-6'>Admin Registration</h1>
                <div className='space-y-4'>
                    <input 
                        className='w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200' 
                        placeholder='Enter Full Name' 
                        type='text' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    <input 
                        className='w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200' 
                        placeholder='Enter Email' 
                        type='text' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        className='w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200' 
                        placeholder='Enter Password' 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <input 
                        className='w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200' 
                        placeholder='Retype Password' 
                        type='password' 
                        value={cnfPassword} 
                        onChange={(e) => setCnfPassword(e.target.value)} 
                        required 
                    />
                    <button 
                        className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300' 
                        onClick={submitForm}
                    >
                        Register Me
                    </button>
                </div>
                <p className='text-center mt-6 text-gray-500'>
                    Already have an account? <Button variant="outlined"><Link to='/'>Sign In</Link></Button>
                </p>
            </div>
        </div>
    );
};

export default Registration;
