import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar'; // For user avatar

const DashBord = () => {
  let [name, setname] = useState("");
  let ID = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4001/user/${ID.ID}`)
      .then((e) => {
        setname(e.data);
      })
      .catch(() => { console.log("Unable to fetch data in Edit comp"); });
  }, [ID.ID]);

  return (
    <div className="min-h-screen bg-gray-200">
      <div id='navbar' className='bg-white shadow-md p-4 flex justify-between items-center'>
        <div className="flex items-center">
          <h1 className='text-xl font-semibold text-gray-800 mr-4'>Dashboard</h1>
          <Link to="/employee-list">
            <Button variant="text" className="text-gray-700 hover:text-blue-500">Employee List</Button>
          </Link>
        </div>
        <div className='flex items-center'>
          <Avatar alt={name} src="/path/to/profile-pic.jpg" className="mr-2" />
          <span className='mr-4 font-medium text-gray-800'>{name}</span>
          <Button variant="text" className="text-gray-700 hover:text-blue-500">Logout</Button>
        </div>
      </div>
      <div className='max-w-3xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Welcome to the Admin Panel</h2>
        <p className='text-gray-600'>Here you can manage your employees, view reports, and handle other administrative tasks.</p>
      </div>
    </div>
  );
}

export default DashBord;
