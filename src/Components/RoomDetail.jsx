import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_PATH}room/${id}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            api_key: import.meta.env.VITE_API_KEY,
          },
        });
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoom();
  }, [id]);

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "600px",
      margin: "20px auto",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      backgroundColor: "#fff",
    },
    header: {
      marginBottom: "20px",
    },
    title: {
      color: "#333",
      fontWeight: "bold",
    },
    status: {
      fontStyle: "italic",
      color: room?.isBooked ? "#3221c8" : "#2ed573",
    },
    list: {
      listStyleType: "none",
      padding: 0,
    },
    listItem: {
      marginBottom: "10px",
      fontSize: "16px",
      color: "#576574",
    },
  };

  if (!room) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{room.name}</h2>
        <p style={styles.status}>{room.isBooked ? `The room is booked by:` : "The room is Available"}</p>
      </div>
      <ul style={styles.list}>
        {room.relation.map((obj) => (
          <li key={obj.person._id} style={styles.listItem}>
            {obj.person.firstName} {obj.person.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomDetail;
