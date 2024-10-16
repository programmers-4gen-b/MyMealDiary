import "../css/common.css"
import React from "react";
import { useLocation } from 'react-router-dom';

function FoodModal({ isOpen, onClose, content }) {
  const location = useLocation();
  const { id } = location.state || {};

  if (!isOpen) return null;

  return (
    <div className="app-container">
      <div>
        <p>id : {id}</p>
      </div>
      <div>
        <button onClick={onClose}>Close</button>
        <h3>{content.foodNm}</h3>
      </div>
    </div>
  );
}

export default FoodModal;
