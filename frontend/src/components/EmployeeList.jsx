import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [infoFromDB, setInfoFromDB] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4001/employee-list")
      .then((response) => {
        setInfoFromDB(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data in EmployeeList useEffect:", error);
      });
  }, [reload]);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:4001/employee-list/${id}`)
      .then(() => {
        setReload(prev => !prev);
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  return (
    <div className='w-full p-6 bg-gray-100'>
      <h1 className='text-xl font-semibold mb-4'>Total Employees: {infoFromDB.length}</h1>
      <div className='overflow-x-auto rounded-lg shadow-lg'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead className='bg-gray-200 text-gray-600'>
            <tr>
              <th className='px-4 py-2 border-b'>Unique Id</th>
              <th className='px-4 py-2 border-b'>Image</th>
              <th className='px-4 py-2 border-b'>Name</th>
              <th className='px-4 py-2 border-b'>Email</th>
              <th className='px-4 py-2 border-b'>Phone</th>
              <th className='px-4 py-2 border-b'>Designation</th>
              <th className='px-4 py-2 border-b'>Gender</th>
              <th className='px-4 py-2 border-b'>Course</th>
              <th className='px-4 py-2 border-b'>Action</th>
            </tr>
          </thead>
          <tbody className='text-center text-gray-700'>
            {infoFromDB.map((item, index) => (
              <tr key={item.id || index} className='hover:bg-gray-100 transition duration-200'>
                <td className='border-b border-gray-300'>{index + 1}</td>
                <td className='border-b border-gray-300'>
                  {item.image ? (
                    <img src={`backend/Images/${item.image}`} alt={`${item.name}'s profile`} className='w-12 h-12 object-cover rounded-full' />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className='border-b border-gray-300'>{item.name || 'N/A'}</td>
                <td className='border-b border-gray-300'>{item.email || 'N/A'}</td>
                <td className='border-b border-gray-300'>{item.phone || 'N/A'}</td>
                <td className='border-b border-gray-300'>{item.designation || 'N/A'}</td>
                <td className='border-b border-gray-300'>{item.gender || 'N/A'}</td>
                <td className='border-b border-gray-300'>
                  {item.course?.[0] || 'N/A'}, {item.course?.[1] || 'N/A'}
                </td>
                <td className='border-b border-gray-300 flex justify-center space-x-2'>
                  <Link to={`/edit-employee/${item._id}`}>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteUser(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
