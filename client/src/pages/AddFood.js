import "../css/common.css";
import React from "react";
import { useState, useEffect } from "react";
import FoodModal from "./FoodModal.js";
import { useNavigate } from "react-router-dom";

//mealType, isFoodExist 필요
function AddFood() {
  const defaultMealType = 1; //임시
  const isFoodExist = false;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleSearchProcessed = () => {
    if (query) {
      fetch(`http://localhost:4545/processedFood/list?foodNm=${query}`)
        .then((response) => response.json())
        .then((data) => setResults(data.processedfood))
        .catch((err) => console.error(err));
    } else {
      setResults([]);
    }
  };

  const handleSerchFood = () => {
    if (query) {
      fetch(`http://localhost:4545/food/List?foodNm=${query}`)
        .then((response) => response.json())
        .then((data) => setResults(data.food))
        .catch((err) => console.error(err));
    } else {
      setResults([]);
    }
  };

  const handleItemClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  return (
    <div className="app-container">
      <button onClick={handleClose}>Close</button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="음식을 입력하세요"
      />
      {defaultMealType === 4 ? (
        <button onClick={handleSearchProcessed}>검색</button>
      ) : (
        <button onClick={handleSerchFood}>검색</button>
      )}
      <ul>
        {results && results.length > 0 && (
          <ul>
            {results.slice(0, 20).map((food) => (
              <li key={food.foodcd} onClick={() => handleItemClick(food)}>
                {food.foodnm}
              </li>
            ))}
          </ul>
        )}
      </ul>

      <FoodModal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={selectedFood}
        defaultMealType={defaultMealType}
        isFoodExist={isFoodExist}
      />
    </div>
  );
}

export default AddFood;
