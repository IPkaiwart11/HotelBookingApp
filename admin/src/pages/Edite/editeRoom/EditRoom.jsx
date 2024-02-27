// EditRoom.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editeRoom.scss";

const EditRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    maxPeople: "",
    desc: ""
  });

  useEffect(() => {
    axios.get(`/rooms/${roomId}`)
      .then((response) => {
        setFormData({
          title: response.data.title,
          price: response.data.price,
          maxPeople: response.data.maxPeople,
          desc: response.data.desc
        });
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, [roomId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/rooms/${roomId}`, formData);
      navigate(`/rooms/${roomId}`);
    } catch (error) {
      console.error("Error updating room data:", error);
    }
  };

  return (
    <div className="edit-room-container">
      <h2>Edit Room Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxPeople">Max People</label>
          <input
            type="text"
            name="maxPeople"
            id="maxPeople"
            value={formData.maxPeople}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            id="desc"
            value={formData.desc}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditRoom;
