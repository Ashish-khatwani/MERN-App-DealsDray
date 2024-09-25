import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

const Login = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let navigate = useNavigate();

  let login = () => {
    let payload = { email, password };
    axios.post('http://localhost:4001/login', payload)
      .then((e) => {
        if (e.data.status === "success") {
          navigate(`/dashbord/${e.data.id}`);
        } else if (e.data.status === "fail") {
          alert("Wrong password");
        } else if (e.data.status === "noUser") {
          alert("Invalid Email");
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">Login</h1>
        <div className="space-y-5">
          <input
            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={login}
          >
            LOGIN
          </button>
        </div>
        <p className="text-center mt-6 text-gray-500">
          Don't have an account? <Button variant="outlined"><Link to='/register'>Sign Up</Link></Button>
        </p>
      </div>
    </div>
  );
};

export default Login;
