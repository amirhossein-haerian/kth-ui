import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomList from "./Components/RoomList";
import RoomDetail from './Components/RoomDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<RoomList />} />
        <Route path="/room/:id" element={<RoomDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
