import "../css/common.css";
import React, { useState, useEffect } from "react";
import "../css/Modal.css";

function FoodRecordModal({ isOpen, onClose, logId, userId }) {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("g");
  const [mealType, setMealType] = useState("");
  const [serving, setServing] = useState(quantity);
  const [nutrients, setNutrients] = useState({});
  const [mealLog, setMealLog] = useState(null);
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
    if (isOpen && logId) {
      fetch(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/processedFood/getFood/${logId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMealLog(data);
          setMealType(data.meal_type);
          setQuantity(data.serving_size);
        })
        .catch((err) => console.error(err));
    }
  }, [isOpen, logId]);

  useEffect(() => {
    if (mealLog && mealLog.food_category == "음식") {
      fetch(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/food/list/detail?foodNm=${mealLog.food_name}&foodcd=${mealLog.foodcd}`
      )
        .then((response) => response.json())
        .then((data) => {
          setFoodDetail(data.food[0]);
        })
        .catch((err) => console.error(err));
    } else if (mealLog && mealLog.food_category == "가공식품") {
      fetch(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/processedFood/list/detail?foodNm=${mealLog.food_name}&foodcd=${mealLog.foodcd}`
      )
        .then((response) => response.json())
        .then((data) => {
          setFoodDetail(data.processedfood[0]);
        })
        .catch((err) => console.error(err));
    }
  }, [mealLog]);

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
        ).toFixed(3);
      }
    });

    setNutrients(calculatedNutrients);
  };

  useEffect(() => {
    calculateNutrients();
  }, [serving, foodDetail]);

  const handleSave = () => {
    const dataToSend = {
      user_id: userId,
      meal_date: mealLog.meal_date,
      meal_type: mealType,
      food_name: foodDetail.foodnm,
      food_category: foodDetail.typenm,
      serving_size: serving,
      calories: parseFloat(nutrients.enerc) || 0,
      protein: parseFloat(nutrients.prot) || 0,
      fat: parseFloat(nutrients.fatce) || 0,
      carbohydrates: parseFloat(nutrients.chocdf) || 0,
      sugar: parseFloat(nutrients.sugar) || 0,
      sodium: parseFloat(nutrients.nat) || 0,
      fiber: parseFloat(nutrients.fibtg) || 0,
      foodcd: foodDetail.foodcd,
    };

    fetch(
      `http://localhost:${process.env.REACT_APP_SERVER_PORT}/processedFood/update/${logId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Data successfully sent!");
          alert("저장되었습니다");
          window.location.reload();
        } else {
          console.error("Failed to send data");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleDelete = () => {
    const dataToSend = {
      user_id: userId,
      id: logId,
    };
    fetch(
      `http://localhost:${process.env.REACT_APP_SERVER_PORT}/processedFood/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Data successfully sent!");
          alert("삭제되었습니다");
          window.location.reload();
        } else {
          console.error("Failed to send data");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleClose = () => {
    setQuantity(1);
    setUnit("g");
    setServing(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="app-container">
      <div className="modal">
        {foodDetail && (
          <div className="modal-content">
            <button onClick={handleClose} className="modal-close-button">
              닫기
            </button>
            <h3>{foodDetail.foodnm}</h3>
            <div className="input-group">
              <label>+/-</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>단위</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="serv">
                  인분({foodDetail.foodsize ? foodDetail.foodsize : "정보없음"})
                </option>
                <option value="g">g</option>
              </select>
            </div>

            <div className="input-group">
              <label>일정</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="morning">아침식사</option>
                <option value="lunch">점심식사</option>
                <option value="dinner">저녁식사</option>
                <option value="snack">간식</option>
              </select>
            </div>
            <div className="botton-container">
              <button onClick={handleSave} className="modal-button">
                저장
              </button>
              <button
                onClick={handleDelete}
                className="modal-button delete-button"
              >
                삭제
              </button>
            </div>
            <h4>영양정보</h4>
            <div className="nutrition-info">
              <p>서빙 사이즈: {serving}g</p>
              {Object.entries(nutrients).map(([key, value]) => (
                <p key={key}>
                  {nutrientLabels[key]}: {value}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodRecordModal;
