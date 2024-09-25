import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Getting data from the DB to React
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
    <div className='w-screen'>
      <p>Total Count : {infoFromDB.length}</p>
      <table>
        <thead className='border border-black w-screen'>
          <tr>
            <th className='px-7 py-2'>Unique Id</th>
            <th className='px-7 py-2'>Image</th>
            <th className='px-7 py-2'>Name</th>
            <th className='px-7 py-2'>Email</th>
            <th className='px-7 py-2'>Phone</th>
            <th className='px-7 py-2'>Designation</th>
            <th className='px-7 py-2'>Gender</th>
            <th className='px-7 py-2'>Course</th>
            <th className='px-12 py-2'>Action</th>
          </tr>
        </thead>
        <tbody className='text-center text-[15px]'>
          {infoFromDB.map((item, index) => (
            <tr key={item.id || index}> {/* Use index as fallback key */}
              <td className='border-2 border-green-700'>{index + 1}</td>
              <td className='border-2 border-green-700'>
                {item.image ? (
                  <img src={`backend/Images/${item.image}`} alt={`${item.name}'s profile`} />
                ) : (
                  'No Image'
                )}
              </td>
              <td className='border-2 border-green-700'>{item.name || 'N/A'}</td>
              <td className='border-2 border-green-700'>{item.email || 'N/A'}</td>
              <td className='border-2 border-green-700'>{item.phone || 'N/A'}</td>
              <td className='border-2 border-green-700'>{item.designation || 'N/A'}</td>
              <td className='border-2 border-green-700'>{item.gender || 'N/A'}</td>
              <td className='border-2 border-green-700'>
                {item.course?.[0] || 'N/A'}, {item.course?.[1] || 'N/A'}
              </td>
              <td className='border-2 border-green-700'>
                <Link to={`/edit-employee/${item._id}`}>Edit - </Link>
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
  );
};

export default EmployeeList;
