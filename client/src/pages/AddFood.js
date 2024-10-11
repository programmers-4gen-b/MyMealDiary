import "../css/common.css";
import React from "react";
import { useState, useEffect } from "react";
import _ from "lodash";
import FoodModal from "./FoodModal.js";

function AddFood() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const handleSearch = () => {
    if (query) {
      fetch(`http://localhost:4545/processedFood?foodNm=${query}`)
        .then((response) => response.json())
        .then((data) => setResults(data))
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
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="음식을 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>
      <ul>
        {results.processedfood && results.processedfood.length > 0 && (
          <ul>
            {results.processedfood.slice(0, 20).map((food) => (
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
      />
    </div>
  );
}

export default AddFood;
