import React, { useState } from "react";
import "./home.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    isbn: 0,
    category: "",
    desc: "",
  });

  // Fetch data from API
  const getdata = async () => {
    const res = await fetch("http://127.0.0.1:8000", { method: "GET" });
    return res.json();
  };

  async function fetchdata() {
    const newdata = await getdata();
    setData(newdata);
  }

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure `isbn` is converted to an integer
      const dataToSend = {
        ...formData,
        isbn: parseInt(formData.isbn, 10), // Convert ISBN to integer
      };

      // Send POST request
      const res = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Send the updated object
      });

      // Check if the request was successful
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Server Response:", result);

      // Optionally, clear the form after successful submission
      setFormData({
        name: "",
        isbn: 0, // Reset as integer
        category: "",
        desc: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    fetchdata();
  };

  const deleteItem = async(isbn)=>{
    // console.log(isbn);
    const res = await fetch(`http://127.0.0.1:8000/`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({isbn:isbn})
    });
    fetchdata();
  }

  return (
    <>
      <button
        onClick={() => {
          fetchdata();
        }}
      >
        GetData
      </button>
      <div className="card-holder">
        {data ? (
          data.map((item, index) => (
            <div className="card" key={index}>
              <h3>{item.name}</h3>
              <label>{item.category}</label>
              <label>{item.isbn}</label>
              <p>{item.desc}</p>
              <button className="deletebtn" onClick={()=>deleteItem(item.isbn)}>Delete</button>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="formbox">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter book name"
          />

          <label htmlFor="isbn">ISBN:</label>
          <input
            type="number"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
            placeholder="Enter ISBN number"
          />

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              --
            </option>
            {["fantasy", "biography"].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            placeholder="Enter description"
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
