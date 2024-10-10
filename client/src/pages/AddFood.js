import "../css/common.css"
import React from "react";
import { useState, useEffect } from "react";
import _ from "lodash";
import FoodModal from "./FoodModal.js";

//테스트용 임시 더미리스트
const dummyFoodList = [
  { foodCd: 1, foodNm: "사과" },
  { foodCd: 2, foodNm: "바나나" },
  { foodCd: 3, foodNm: "오렌지" },
  { foodCd: 4, foodNm: "오렌지주스" },
  { foodCd: 5, foodNm: "포도주스" },
  { foodCd: 6, foodNm: "망고" },
];

function AddFood() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  //디바운싱하여 api 호출
  const debouncedSearch = _.debounce((searchTerm) => {
    fetch(`http://localhost:4545/findFood?foodNm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((err) => console.error(err));
  }, 300);

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
  }, [query]);

  //더미리스트 사용 임시코드
  // useEffect(() => {
  //   if (query) {
  //     const filteredResults = dummyFoodList.filter((food) =>
  //       food.foodNm.includes(query)
  //     );
  //     setResults(filteredResults);
  //   } else {
  //     setResults([]);
  //   }
  // }, [query]);

  const handleItemClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  console.log(results);

  return (
    <div className="app-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="음식을 입력하세요"
      />
      {/* <ul>
        {results.map((food) => (
          <li key={food.foodCd} onClick={() => handleItemClick(food)}>
            {food.foodNm}
          </li>
        ))}
      </ul> */}

      <FoodModal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={selectedFood}
      />
    </div>
  );
}

export default AddFood;
