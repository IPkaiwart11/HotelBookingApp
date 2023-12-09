

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";

const RoomDetails = () => {
  // Access the hotel's ID from the URL params
  const { roomId } = useParams();
  const [room, setroom] = useState(null);

  useEffect(() => {
    console.log("room ID:", roomId);
    
    axios.get(`/rooms/${roomId}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setroom(response.data);

      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [roomId]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              {/* <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              /> */}
              <div className="details">
                <h1 className="itemTitle">{room ? room.title : "Loading..."}</h1>
                <div className="detailItem">
                  <span className="itemKey">price:</span>
                  <span className="itemValue">{room ? room.price : "Loading..."}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">maxPeople:</span>
                  <span className="itemValue">{room ? room.maxPeople : "Loading..."}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Decripsion:</span>
                  <span className="itemValue">{room ? room.desc : "Loading..."}</span>
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

export default RoomDetails;

///////////////////
