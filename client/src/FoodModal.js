import React from "react";

function FoodModal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <button onClick={onClose}>Close</button>
        <h3>{content.foodNm}</h3>
      </div>
    </div>
  );
}

export default FoodModal;
