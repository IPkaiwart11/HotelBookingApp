// EditUser.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editUser.scss";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    img:null
  });

  useEffect(() => {
    axios.get(`/users/${userId}`)
      .then((response) => {
        setFormData({
          username: response.data.username,
          email: response.data.email,
          phone: response.data.phone,
          city: response.data.city,
          country: response.data.country,
          img: response.data.img
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${userId}`, formData);
      navigate(`/users/${userId}`);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User Details</h2>
      <form onSubmit={handleSubmit}>
      {formData.img && (
          <div>
            <img src={formData.img} alt="Hotel photos" style={{ maxWidth: "100%", height: "auto" }} />
          </div>
        )}
         <div>
               <input type="file" name="img"  onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
