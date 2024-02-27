import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./edithotel.scss"

const EditHotel = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    title: "",
    desc: "",
    photos: null
  });

  useEffect(() => {
    // Fetch the current hotel details and populate the form
    axios.get(`/hotels/find/${hotelId}`)
      .then((response) => {
        setFormData({
          name: response.data.name,
          city: response.data.city,
          address: response.data.address,
          title: response.data.title,
          desc: response.data.desc,
          photos: response.data.photos
        });
      })
      .catch((error) => {
        console.error("Error fetching hotel data:", error);
      });
  }, [hotelId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/hotels/${hotelId}`, formData);
      // Redirect to the hotel details page after successful update
      navigate(`/hotels/${hotelId}`);
    } catch (error) {
      console.error("Error updating hotel data:", error);
    }
  };

  return (
    <div className="edit-hotel-container">
      <h2>Edit Hotel Details</h2>
      <form onSubmit={handleSubmit}>
      {formData.photos && (
          <div>
            <img src={formData.photos} alt="Hotel photos" style={{ maxWidth: "100%", height: "auto" }} />
          </div>
        )}
        <div>
               <input type="file" name="photos"  onChange={handleChange}/>
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditHotel;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./edithotel.scss";

// const EditHotel = () => {
//   const { hotelId } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     city: "",
//     address: "",
//     title: "",
//     desc: "",
//     photos: null
//   });

//   useEffect(() => {
//     axios.get(`/hotels/find/${hotelId}`)
//       .then((response) => {
//         setFormData({
//           name: response.data.name,
//           city: response.data.city,
//           address: response.data.address,
//           title: response.data.title,
//           desc: response.data.desc,
//           photos: response.data.photos
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching hotel data:", error);
//       });
//   }, [hotelId]);

//   const handleChange = (e) => {
//                if (e.target.name === "photos") {
//                  const file = e.target.files[0];
//                  if (file) {
//                    setFormData({ ...formData, photos: file });
//                  }
//                } else {
//                  setFormData({ ...formData, [e.target.name]: e.target.value });
//                }
//              };
             
             

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("city", formData.city);
//       formDataToSend.append("address", formData.address);
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("desc", formData.desc);
//       formDataToSend.append("photos", formData.photos);

//       await axios.put(`/hotels/${hotelId}`, formDataToSend);
//       navigate(`/hotels/${hotelId}`);
//     } catch (error) {
//       console.error("Error updating hotel data:", error);
//     }
//   };

//   return (
//     <div className="edit-hotel-container">
//       <h2>Edit Hotel Details</h2>
//       <form onSubmit={handleSubmit}>
//       <div>
//   {formData.photos instanceof File && (
//     <div>
//       <img
//         src={URL.createObjectURL(formData.photos)}
//         alt="Hotel photos"
//         style={{ maxWidth: "100%", height: "200px" }}
//       />
//     </div>
//   )}
//   <input
//     type="file"
//     name="photos"
//     onChange={handleChange}
//   />
// </div>

//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>City:</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Address:</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             name="desc"
//             value={formData.desc}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default EditHotel;
