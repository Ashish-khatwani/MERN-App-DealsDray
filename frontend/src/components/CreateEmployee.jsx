import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
    let navigate = useNavigate();
    let [name, setName] = useState("");
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [designation, setDesignation] = useState('');
    let [gender, setGender] = useState("");
    let [course, setCourse] = useState([]);
    let [image, setImage] = useState(null);

    let formHandle = (e) => {
        e.preventDefault();
        let payload = {
            name: name,
            email: email,
            phone: phone,
            image: image,
            designation: designation,
            gender: gender,
            course: course
        };

        if (!name || !email || !phone || !designation || !gender || !course.length || !image) {
            alert("To Create Employee Fill all the fields..!");
        } else {
            axios.post("http://localhost:4001/employees", payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => { 
                alert(response.data); 
                navigate("/employee-list"); 
            })
            .catch(() => { console.log("Cannot register"); });
        }
    };

    let handleCourseChange = (e) => {
        const course1 = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setCourse(prev => [...prev, course1]);
        } else {
            setCourse(prev => prev.filter(item => item !== course1));
        }
    };

    return (
        <div className='max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10'>
            <h1 className='text-center font-bold text-2xl mb-6'>Create Employee</h1>
            <form onSubmit={formHandle}>
                <input
                    className='w-full bg-gray-100 border-2 border-gray-300 rounded-lg p-3 mb-4 placeholder-gray-500'
                    placeholder='Enter Full Name'
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); }}
                />
                <input
                    className='w-full bg-gray-100 border-2 border-gray-300 rounded-lg p-3 mb-4 placeholder-gray-500'
                    placeholder='Enter Email'
                    type="text"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); }}
                />
                <input
                    className='w-full bg-gray-100 border-2 border-gray-300 rounded-lg p-3 mb-4 placeholder-gray-500'
                    placeholder='Enter Phone Number'
                    type="text"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); }}
                />

                {/* Designation Dropdown */}
                <label className='block text-gray-700 mb-1'>Designation</label>
                <select
                    onChange={(e) => { setDesignation(e.target.value); }}
                    required
                    className="block w-full bg-gray-100 border-2 border-gray-300 rounded-lg p-3 mb-4"
                >
                    <option value="">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>

                {/* Gender Radio Button */}
                <label className='block text-gray-700 mb-1'>Gender:</label>
                <div className='flex mb-4'>
                    <label className='mr-4'>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={() => { setGender("Male"); }}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={() => { setGender("Female"); }}
                        />
                        Female
                    </label>
                </div>

                {/* Courses Checkboxes */}
                <label className='block text-gray-700 mb-1'>Course:</label>
                <div className='flex flex-col mb-4'>
                    {['MCA', 'BCA', 'BSC'].map((courseItem) => (
                        <label key={courseItem} className='flex items-center'>
                            <input
                                type="checkbox"
                                value={courseItem}
                                checked={course.includes(courseItem)}
                                onChange={handleCourseChange}
                                className='mr-2'
                            />
                            {courseItem}
                        </label>
                    ))}
                </div>

                {/* File Upload */}
                <label className='block text-gray-700 mb-1'>Upload your photo</label>
                <input
                    accept="image/jpeg, image/png"
                    type="file"
                    onChange={(e) => { setImage(e.target.files[0]); }}
                    className='w-full border-2 border-gray-300 rounded-lg p-2 mb-4'
                />

                <button
                    type='submit'
                    className='w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-500 transition duration-200'
                >
                    Register Me
                </button>
            </form>
        </div>
    );
}

export default CreateEmployee;
