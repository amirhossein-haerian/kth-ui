import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_PATH}rooms`, {
        method: "GET",
        headers: {
          accept: "application/json",
          api_key: import.meta.env.VITE_API_KEY,
        },
      });
      const data = await response.json();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h2>All the Rooms</h2>
      {rooms.map((room) => (
        <div key={room._id}>
          <Link to={`/room/${room._id}`}>
            <span>{room.name}</span>
            <span>{room.isBooked ? "Booked" : "Available"}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RoomList;