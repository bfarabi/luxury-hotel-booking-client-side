import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { UserContext } from "./../../App";

const Bookings = () => {
  const [booking, setBooking] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/booking?email=" + loggedInUser.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, [loggedInUser.email]);
  return (
    <div>
      <h3>You have {booking.length} bookings</h3>
      {booking.map((book) => (
        <div
          key={book._id}
          style={{
            border: "1px solid gray",
            margin: "10px 150px",
            padding: "10px",
          }}
        >
          <h4>Name: {book.name} </h4>
          <br /> From: {new Date(book.checkIn).toDateString("dd/MM/yyyy")}
          <br />
          to: {new Date(book.checkOut).toDateString("dd/MM/yyyy")}
        </div>
      ))}
    </div>
  );
};

export default Bookings;
