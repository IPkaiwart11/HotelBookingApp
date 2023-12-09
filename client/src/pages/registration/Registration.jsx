import React, { useState } from 'react';
import axios from "axios";
import "./Registration.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function Registration() {
  const [file, setFile] = useState("");
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country:'',
    img:'',
    city:'',
    phone:'',
    password: '',
    confirmPassword: '',
  });

  const {error,loading, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
  
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    //
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    //
    dispatch({ type: "LOGIN_START" });
    try {
 //
 const uploadRes = await axios.post(
  "https://api.cloudinary.com/v1_1/dsltriomx/image/upload",
  data
);

const { url } = uploadRes.data;
const newUser = {
  ...formData,
  img: url,
};
//

      const res = await axios.post("/auth/register",newUser);
     
      if (formData.password === formData.confirmPassword) {
        // Registration logic here (e.g., send data to a server or store in local storage)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        alert("successfull registration");
        navigate("/login");
      }else{
        alert('Password and Confirm Password do not match');
      }
     
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.log(err);
    }
   
  };

  return (
    <>
    
    <div className='registrationContainer'>
    <h2>Registration</h2>
    <div className="formcontainer">
      <form onSubmit={handleSubmit} method='POST'>
        <div className='singleform'>
          <img src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              } alt="" />
        </div>
        <div className='singleform'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className='singleform'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='singleform'>
        <label htmlFor="country">Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
           </div>
           <div className='singleform'>
  <label htmlFor="img">Image:</label>
  <input
    type="file"
    name="img"
    onChange={(e) => setFile(e.target.files[0])}
    // onChange={handleChange}
  />
</div>


           <div className='singleform'>
        <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
           </div>
           <div className='singleform'>
        <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
           </div>
        <div className='singleform'>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className='singleform'>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className='singleform'>
        <button disabled={loading} type="submit">Register</button>
        </div>
      </form>
      {error && <span>{error.message}</span>}
      </div>
    </div>
</>
  );
}


export default Registration;

