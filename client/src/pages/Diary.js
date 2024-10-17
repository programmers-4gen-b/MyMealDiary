import "../css/common.css";
import "../css/Diary.css";
import "../css/CalendarPage.css";
import "react-calendar/dist/Calendar.css";
import { useNavigate , useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import FoodRecordModal from "./FoodRecordModal";

const Diary = ({userId}) => {
  const navigate = useNavigate();

  const navigateToDiary = () => {
    navigate("/");
  };

  const navigateToReport = () => {
    navigate("/report");
  };

  const navigateToGoal = () => {
    navigate("/goal");
  };

  const navigateToAddFood = (user_id, meal_date, meal_type) => {
    navigate("/addFood", {
      state: { user_id: user_id, meal_date: meal_date, meal_type: meal_type },
    });
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const [data, setData] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [remainingCalories, setRemainingCalories] = useState();
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logId, setLogId] = useState(null);
  const mealTypes = ["morning", "lunch", "dinner", "snack"];
  const weekDays = [
    { day: "monday", label: "월" },
    { day: "tuesday", label: "화" },
    { day: "wednesday", label: "수" },
    { day: "thursday", label: "목" },
    { day: "friday", label: "금" },
    { day: "saturday", label: "토" },
    { day: "sunday", label: "일" },
  ];

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateClick = (value) => {
    setDate(value);
    setShowCalendar(false);
  };

  const formatDate = (date, option) => {
    if (option) {
      const options = { weekday: "long" };
      return date.toLocaleDateString("en", options).toLowerCase();
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  };

  const getMonday = (d) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const handleWeekdayClick = (dayIndex) => {
    const monday = getMonday(date);
    const newDate = new Date(monday);
    newDate.setDate(monday.getDate() + dayIndex);
    setDate(newDate);
  };

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    navigate('/login');
  };

  useEffect(() => {
    const url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/processedFood/getFood/all`;
    axios
      .get(url, {
        params: {
          user_id: userId,
          meal_date: formatDate(date),
        },
      })
      .then((response) => {
        const filteredData = response.data.map((item) => ({
          id: item.id,
          food_name: item.food_name,
          meal_type: item.meal_type,
          calories: item.calories,
        }));
        const totalConsumedCalories = filteredData.reduce(
          (pVal, cVal) => pVal + Number(cVal.calories),
          0
        );
        setData(filteredData);
        setConsumedCalories(totalConsumedCalories);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [date]);

  useEffect(() => {
    const url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/user/calorie`;
    axios
      .get(url, {
        params: {
          user_id: userId,
        },
      })
      .then((response) => {
        const averageCalorie = Number(response.data.average_calorie);
        setRemainingCalories(averageCalorie - consumedCalories);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [consumedCalories, date]);

  const handleItemClick = (id) => {
    setLogId(id);
  };
  useEffect(() => {
    if (logId) {
      setIsModalOpen(true);
    }
  }, [logId]);

  useEffect(() => {
    //모달창 뜨면 스크롤방지
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    setLogId(null);
  };

  return (
    <div className="app-container">
      <button onClick={toggleCalendar} className="calendar-button">
        {showCalendar ? "달력 숨기기" : "달력 보기"}
      </button>

      {showCalendar && (
        <div className="calendar-modal">
          <div className="calendar-content">
            <Calendar onChange={handleDateClick} value={date} />
          </div>
        </div>
      )}

      {!showCalendar && (
        <div className="week-container">
          {weekDays.map((weekDayObj, index) => (
            <div
              key={weekDayObj.day}
              className="week-slot"
              onClick={() => handleWeekdayClick(index)}
            >
              <div
                className={
                  formatDate(date, 1) === weekDayObj.day
                    ? "week-circle-changed"
                    : "week-circle"
                }
              ></div>
              <div className="week-text">{weekDayObj.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="meal-calorie">
        <p>
          {formatDate(date)} / {formatDate(date, 1)}
        </p>
        <p>남은 칼로리: {remainingCalories}</p>
        <p>섭취한 칼로리: {consumedCalories}</p>
      </div>

      <div className="meal-selection">
        {mealTypes.map((mealType, typeIndex) => {
          const filteredMeals = data
            ? data.filter((item) => item.meal_type === mealType)
            : [];

          return (
            <div className="meal-option-container" key={typeIndex}>
              <div className="meal-option">
                <span>
                  {mealType === "morning" && "아침식사"}
                  {mealType === "lunch" && "점심식사"}
                  {mealType === "dinner" && "저녁식사"}
                  {mealType === "snack" && "간식/기타"}
                </span>
                <button onClick={() => navigateToAddFood(7, date, mealType)}>
                  +
                </button>
              </div>
              {filteredMeals.length > 0 && (
                <>
                  <div className="divider"></div>
                  {filteredMeals.map((meal, index) => (
                    <div className="meal-option-details" key={index}>
                      <span>{meal.food_name}</span>
                      <button onClick={() => handleItemClick(meal.id)}>
                        &gt;
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <FoodRecordModal
          isOpen={isModalOpen}
          onClose={closeModal}
          logId={logId}
          userId={userId}
        />
      </div>

      <div className="button-container">
        <button className="bottom-button" onClick={navigateToDiary}>
          다이어리
        </button>
        <button className="bottom-button" onClick={navigateToReport}>
          리포트
        </button>
        <button className="bottom-button" onClick={navigateToGoal}>
          목표
        </button>
        <button className="bottom-button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Diary;
