import "../css/common.css";
import React, { useState, useEffect } from "react";

function FoodModal({ isOpen, onClose, content, defaultMealType, isFoodExist }) {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("g");
  const [mealType, setMealType] = useState(defaultMealType);
  const [serving, setServing] = useState(quantity);
  const [nutrients, setNutrients] = useState({});
  const [foodDetail, setFoodDetail] = useState(null);

  const nutrientLabels = {
    enerc: "열량 (kcal)",
    water: "수분 (g)",
    prot: "단백질 (g)",
    fatce: "지방 (g)",
    chocdf: "탄수화물 (g)",
    sugar: "당류 (g)",
    fibtg: "식이섬유 (g)",
    ca: "칼슘 (mg)",
    fe: "철 (mg)",
    p: "인 (mg)",
    k: "칼륨 (mg)",
    nat: "나트륨 (mg)",
    vitaRae: "비타민 A(μg)",
    retinol: "레티놀 (μg)",
    cartb: "베타카로틴 (μg)",
    thia: "티아민 (mg)",
    ribf: "리보플라빈 (mg)",
    nia: "니아신 (mg)",
    vitc: "비타민C (mg)",
    vitd: "비타민D (μg)",
    fasat: "포화지방 (g)",
    fatrn: "트랜스지방 (g)",
    chole: "콜레스테롤 (mg)",
  };

  useEffect(() => {
    if (isOpen) {
      fetch(
        `http://localhost:4545/processedFood/list/detail?foodNm=${content.foodnm}&foodcd=${content.foodcd}`
      )
        .then((response) => response.json())
        .then((data) => {
          setFoodDetail(data.processedfood[0]);
        })
        .catch((err) => console.error(err));
    }
  }, [isOpen, content]);

  const countServing = (quantity, unit, foodSize) => {
    if (unit === "serv") {
      return parseInt(foodSize.match(/\d+/)[0], 10) * quantity;
    } else return quantity;
  };

  useEffect(() => {
    if (foodDetail && foodDetail.foodsize) {
      setServing(countServing(quantity, unit, foodDetail.foodsize));
    }
  }, [quantity, unit, foodDetail]);

  const calculateNutrients = () => {
    const calculatedNutrients = {};
    if (!foodDetail || !foodDetail.nutconsrtrqua) return;

    const baseServingSize = parseInt(
      foodDetail.nutconsrtrqua.match(/\d+/)[0],
      10
    );

    Object.keys(nutrientLabels).forEach((key) => {
      if (
        foodDetail[key] &&
        foodDetail[key] !== null &&
        foodDetail[key] !== 0
      ) {
        calculatedNutrients[key] = (
          (foodDetail[key] * serving) /
          baseServingSize
        ).toFixed(2);
      }
    });

    setNutrients(calculatedNutrients);
  };

  useEffect(() => {
    calculateNutrients();
  }, [serving, foodDetail]);

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
      {foodDetail && (
        <>
          <h3>{foodDetail.foodnm}</h3>
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
                인분({foodDetail.foodsize ? foodDetail.foodsize : "정보없음"})
              </option>
              <option value="g">g</option>
            </select>
          </div>

          <div>
            <label>일정</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="1">아침식사</option>
              <option value="2">점심식사</option>
              <option value="3">저녁식사</option>
              <option value="4">간식</option>
            </select>
          </div>
          <h4>영양정보</h4>
          <div>
            <p>서빙 사이즈: {serving}g</p>
            {Object.entries(nutrients).map(([key, value]) => (
              <p key={key}>
                {nutrientLabels[key]}: {value}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default FoodModal;
