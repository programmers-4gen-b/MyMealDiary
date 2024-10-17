import "../css/common.css";
import React from "react";
import { useState, useEffect } from "react";
import FoodModal from "./FoodModal.js";
import { useNavigate, useLocation} from "react-router-dom";

//mealType 필요
function AddFood() {
  const defaultMealType = "lunch";
  const mealDate = "2024-10-15";
  const userId = 11; //임시데이터
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleRecentSearchClick = (keyword) => {
    setQuery(keyword);
  };

  const handleClearRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  const handleSearchProcessed = () => {
    if (query) {
      fetch(`http://localhost:4545/processedFood/list?foodNm=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data.processedfood);
          const recentSearches =
            JSON.parse(localStorage.getItem("recentSearches")) || [];
          if (!recentSearches.includes(query)) {
            recentSearches.push(query);
            localStorage.setItem(
              "recentSearches",
              JSON.stringify(recentSearches)
            );
          }
        })
        .catch((err) => console.error(err));
    } else {
      setResults([]);
    }
  };

  const handleSerchFood = () => {
    if (query) {
      fetch(`http://localhost:4545/food/list?foodNm=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data.food);
          const recentSearches =
            JSON.parse(localStorage.getItem("recentSearches")) || [];
          if (!recentSearches.includes(query)) {
            recentSearches.push(query);
            localStorage.setItem(
              "recentSearches",
              JSON.stringify(recentSearches)
            );
          }
        })
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

  const location = useLocation();
  const { user_id, meal_date, meal_type } = location.state || {};

  return (
    <div className="app-container">
      <button onClick={handleClose}>Close</button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="음식을 입력하세요"
      />
      {defaultMealType === "snack" ? (
        <button onClick={handleSearchProcessed}>검색</button>
      ) : (
        <button onClick={handleSerchFood}>검색</button>
      )}
      <ul>
        {results && results.length > 0
          ? results.slice(0, 20).map((food) => (
              <li key={food.foodcd} onClick={() => handleItemClick(food)}>
                {food.foodnm}
              </li>
            ))
          : recentSearches.length > 0 && (
              <div>
                <h4>최근 검색어</h4>
                <ul>
                  {recentSearches.map((search, index) => (
                    <li
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                    >
                      {search}
                    </li>
                  ))}
                </ul>
                <button onClick={handleClearRecentSearches}>
                  최근 검색어 삭제
                </button>
              </div>
            )}
      </ul>

      <FoodModal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={selectedFood}
        defaultMealType={defaultMealType}
        mealDate={mealDate}
        userId={userId}
      />
    </div>
  );
}

export default AddFood;
