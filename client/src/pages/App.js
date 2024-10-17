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
import { UserProvider } from "../component/UserContext";
import ProtectedRoute from '../component/ProtectedRoute';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Diary />
            </ProtectedRoute>
          } />
          <Route path="/goal" element={
            <ProtectedRoute>
              <Goal />
            </ProtectedRoute>
          } />
          <Route path="/report" element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          } />
          <Route path="/addFood" element={
            <ProtectedRoute>
              <AddFood />
            </ProtectedRoute>
          } />
          <Route path="/foodDetail" element={
            <ProtectedRoute>
              <FoodDetail />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
