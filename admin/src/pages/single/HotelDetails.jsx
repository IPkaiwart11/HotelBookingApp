

import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";

const HotelDetails = () => {
  // Access the hotel's ID from the URL params
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    console.log("Hotel ID:", hotelId);
    // Fetch the hotel's details based on the user ID
    // You'll need to adjust the API endpoint to match your setup
    axios.get(`/hotels/find/${hotelId}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setHotel(response.data);

      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [hotelId]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <NavLink to={`/hotels/${hotelId}/edit`} className="editButton">Edit</NavLink>
            <h1 className="title">Information</h1>
            <div className="item">
              <img 
                style={{width:"50%"}}
                src={hotel ? hotel.photos : "Loading..."}
                alt=""
                // className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{hotel ? hotel.name : "Loading..."}</h1>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{hotel ? hotel.city : "Loading..."}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{hotel ? hotel.address : "Loading..."}</span>
                </div>
                {/* <div className="detailItem">
                  <span className="itemKey">Photos:</span>
                  <span className="itemValue">{hotel ? hotel.photos : "Loading..."}</span>
                </div> */}
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{hotel ? hotel.title : "Loading..."}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Desc:</span>
                  <span className="itemValue">{hotel ? hotel.desc : "Loading..."}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;

///////////////////
