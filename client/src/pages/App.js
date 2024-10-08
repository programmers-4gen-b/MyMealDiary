import "../css/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Diary from "./Diary";
import Goal from "./Goal";
import Report from "./Report";
import AddFood from "./AddFood";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Diary />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/report" element={<Report />} />   
        <Route path="/addFood" element={<AddFood />} />
      </Routes>
    </Router>
  );
};

export default App;
