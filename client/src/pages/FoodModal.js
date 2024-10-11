import "../css/common.css";
import React from "react";
import { useState, useEffect } from "react";

function FoodModal({ isOpen, onClose, content, defaultMealType, isFoodExist }) {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("g");
  const [mealType, setMealType] = useState(defaultMealType);
  const [serving, setServing] = useState(quantity);

  const countServing = (quantity, unit, foodSize) => {
    if (unit === "serv") {
      return parseInt(foodSize.match(/\d+/)[0], 10) * quantity;
    } else return quantity;
  };

  useEffect(() => {
    if (content && content.foodsize) {
      setServing(countServing(quantity, unit, content.foodsize));
    }
  }, [quantity, unit]);

  const handleClose = () => {
    setQuantity(1);
    setUnit("g");
    setMealType(defaultMealType);
    setServing(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="app-container">
      <button onClick={handleClose}>Close</button>
      <h3>{content.foodnm}</h3>
      <div>
        <label>+/-</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div>
        <label>단위</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="serv">
            인분({content.foodsize ? content.foodsize : "정보없음"})
          </option>
          <option value="g">g</option>
        </select>
      </div>

      <div>
        <label>일정</label>
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="1">아침식사</option>
          <option value="2">점심식사</option>
          <option value="3">저녁식사</option>
          <option value="4">간식</option>
        </select>
      </div>
      <h4>영양정보</h4>
      <div>
        <p>서빙 사이즈: {serving}g</p>
      </div>
    </div>
  );
}

export default FoodModal;
