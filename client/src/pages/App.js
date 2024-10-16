import "../css/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Diary from "./Diary";
import Goal from "./Goal";
import Report from "./Report";
import AddFood from "./AddFood";
import FoodDetail from "./FoodModal";
import Login from "./Login";
import SignUp from "./SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Diary />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/report" element={<Report />} />   
        <Route path="/addFood" element={<AddFood />} />
        <Route path="/foodDetail" element={<FoodDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
