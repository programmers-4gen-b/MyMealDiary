import "../css/common.css"
import React from "react";

function FoodModal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div className="app-container">
      <div>
        <button onClick={onClose}>Close</button>
        <h3>{content.foodNm}</h3>
      </div>
    </div>
  );
}

export default FoodModal;
