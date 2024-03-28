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

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "800px",
      margin: "20px auto",
    },
    header: {
      marginBottom: "20px",
      textAlign: "center",
      color: "#333",
    },
    roomItem: {
      margin: "10px 0",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "transform 0.2s ease-in-out",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    nonBookedRoom: {
      backgroundColor: "#ccffcc", // Light green for available rooms
    },
    link: {
      padding: "15px",
      textDecoration: "none",
      color: "inherit",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    roomName: {
      fontWeight: "500",
    },
    status: {
      fontWeight: "bold",
      fontSize: "0.9rem",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{!rooms.length ? "There is no Room!" : "All the Rooms"}</h2>
      {rooms.map((room) => (
        <div key={room._id} style={{ ...styles.roomItem, ...(room.isBooked ? {} : styles.nonBookedRoom) }}>
          <Link to={`/room/${room._id}`} style={styles.link}>
            <span style={styles.roomName}>{room.name}</span>
            <span style={styles.status}>{room.isBooked ? "Booked" : "Available"}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
