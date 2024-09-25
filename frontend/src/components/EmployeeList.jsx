import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [infoFromDB, setInfoFromDB] = useState([]);
  const [reload, setReload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filtered Employee List based on the search term
  const filteredEmployees = infoFromDB.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full p-6 bg-gray-100'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-semibold'>Total Employees: {filteredEmployees.length}</h1>
        <Link to="/create-employee">
          <Button variant="contained" color="primary">
            Create Employee
          </Button>
        </Link>
      </div>
      
      <div className='flex mb-4'>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-300 rounded-lg p-2 mr-2 w-full'
        />
        <Button variant="contained" color="primary" onClick={() => setSearchTerm("")}>
          Clear
        </Button>
      </div>

      <div className='overflow-x-auto rounded-lg shadow-lg bg-white'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead className='bg-blue-500 text-white'>
            <tr>
              <th className='px-4 py-3 border-b'>Unique Id</th>
              <th className='px-4 py-3 border-b'>Image</th>
              <th className='px-4 py-3 border-b'>Name</th>
              <th className='px-4 py-3 border-b'>Email</th>
              <th className='px-4 py-3 border-b'>Phone</th>
              <th className='px-4 py-3 border-b'>Designation</th>
              <th className='px-4 py-3 border-b'>Gender</th>
              <th className='px-4 py-3 border-b'>Course</th>
              <th className='px-4 py-3 border-b'>Date Created</th>
              <th className='px-4 py-3 border-b'>Action</th>
            </tr>
          </thead>
          <tbody className='text-center text-gray-700'>
            {filteredEmployees.map((item, index) => (
              <tr key={item.id || index} className='hover:bg-gray-100 transition duration-200'>
                <td className='border-b border-gray-300 py-4'>{index + 1}</td>
                <td className='border-b border-gray-300 py-4'>
                  {item.image ? (
                    <img src={`backend/Images/${item.image}`} alt={`${item.name}'s profile`} className='w-16 h-16 object-cover rounded-full mx-auto' />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className='border-b border-gray-300 py-4'>{item.name || 'N/A'}</td>
                <td className='border-b border-gray-300 py-4'>{item.email || 'N/A'}</td>
                <td className='border-b border-gray-300 py-4'>{item.phone || 'N/A'}</td>
                <td className='border-b border-gray-300 py-4'>{item.designation || 'N/A'}</td>
                <td className='border-b border-gray-300 py-4'>{item.gender || 'N/A'}</td>
                <td className='border-b border-gray-300 py-4'>
                  {item.course?.[0] || 'N/A'}, {item.course?.[1] || 'N/A'}
                </td>
                <td className='border-b border-gray-300 py-4'>{new Date(item.dateCreated).toLocaleDateString() || 'N/A'}</td>
                <td className='border-b border-gray-300 py-4 flex justify-center space-x-2'>
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
