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
        console.log(data);
        setRoom(data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoom();
  }, [id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>{room.name}</h2>
        <p>{room.isBooked ? `The room is booked by:` : "The room is Available"}</p>
      </div>
      <ul>
        {room.relation.map((obj) => (
          <li key={obj.person._id}>
            {obj.person.firstName} {obj.person.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomDetail;
