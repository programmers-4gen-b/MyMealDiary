import "../css/common.css"
import "../css/Diary.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const meal_log = [
  {
    meal_date: 'monday',
    meal_time: 'morning',
    food_name: '김치찌개'
  },
  {
    meal_date: 'monday',
    meal_time: 'morning',
    food_name: '밥'
  },
  {
    meal_date: 'monday',
    meal_time: 'morning',
    food_name: '멸치볶음'
  },
  {
    meal_date: 'monday',
    meal_time: 'lunch',
    food_name: '제육볶음'
  },
  {
    meal_date: 'monday',
    meal_time: 'dinner',
    food_name: '치킨'
  },
  {
    meal_date: 'monday',
    meal_time: 'snack',
    food_name: '마카롱'
  },
  {
    meal_date: 'tuesday',
    meal_time: 'morning',
    food_name: '미역국'
  },
  {
    meal_date: 'tuesday',
    meal_time: 'lunch',
    food_name: '우동'
  },
  {
    meal_date: 'tuesday',
    meal_time: 'lunch',
    food_name: '돈까스'
  },
  {
    meal_date: 'tuesday',
    meal_time: 'dinner',
    food_name: '피자'
  },
  {
    meal_date: 'tuesday',
    meal_time: 'snack',
    food_name: '꽈배기'
  }
];

const Diary = () => {
  const navigate = useNavigate();

  const navigateToDiary = () => {
    navigate('/');
  }

  const navigateToReport = () => {
    navigate('/report');
  }

  const navigateToGoal = () => {
    navigate('/goal');
  }

  const navigateToAddFood = () => {
    navigate('/addFood');
  }

  const [remainingCalories, setRemainingCalories] = useState(10000);
  const [consumedCalories, setConsumedCalories] = useState(0);

  const [weekday, setWeekDay] = useState('');
  const [morningMeals, setMorningMeals] = useState([]);
  const [lunchMeals, setlunchMeals] = useState([]);
  const [dinnerMeals, setdinnerMeals] = useState([]);
  const [snackMeals, setsnackMeals] = useState([]);

  useEffect(
    () => {
      setMorningMeals(meal_log.filter(meal => meal.meal_time === 'morning' && meal.meal_date === weekday));
      setlunchMeals(meal_log.filter(meal => meal.meal_time === 'lunch' && meal.meal_date === weekday));
      setdinnerMeals(meal_log.filter(meal => meal.meal_time === 'dinner' && meal.meal_date === weekday));
      setsnackMeals(meal_log.filter(meal => meal.meal_time === 'snack' && meal.meal_date === weekday));
    }, [weekday]
  );

  return (
    <div className="app-container">
      <div className="week-container">
        <div className="week-slot" onClick={() => setWeekDay('monday')}>
          <div className="week-workday-circle"></div>
          <div className="week-text">월</div>
        </div>
        <div className="week-slot" onClick={() => setWeekDay('tuesday')}>
          <div className="week-workday-circle"></div>
          <div className="week-text">화</div>
        </div>
        <div className="week-slot" onClick={() => setWeekDay('wednesday')}>
          <div className="week-workday-circle"></div>
          <div className="week-text">수</div>
        </div>
        <div className="week-slot">
          <div className="week-workday-circle"></div>
          <div className="week-text">목</div>
        </div>
        <div className="week-slot">
          <div className="week-workday-circle"></div>
          <div className="week-text">금</div>
        </div>
        <div className="week-slot">
          <div className="week-workday-circle"></div>
          <div className="week-text">토</div>
        </div>
        <div className="week-slot">
          <div className="week-holiday-circle"></div>
          <div className="week-text">일</div>
        </div>
      </div>

      <div className="meal-calorie">
        <p>{weekday}</p>
        <p>남은 칼로리: {remainingCalories}</p>
        <p onClick={() => { setRemainingCalories(remainingCalories - 1000); setConsumedCalories(consumedCalories + 1000); }}>섭취한 칼로리: {consumedCalories}</p>
      </div>

      <div className="meal-selection">
        <div className="meal-option-container">
          <div className="meal-option">
            <span>아침식사</span>
            <button onClick={navigateToAddFood}>+</button>
          </div>
          <div className="divider"></div>

          <div className="meal-option-details">
            {
              (() => {
                if (morningMeals.length > 0) {
                  return morningMeals.map((meal, index) => (
                    <span key={index}>{meal.food_name}</span>
                  ));
                } else {
                  return <span>아침식사가 없습니다.</span>;
                }
              })()
            }
          </div>

        </div>
        <div className="meal-option-container">
          <div className="meal-option">
            <span>점심식사</span>
            <button onClick={navigateToAddFood}>+</button>
          </div>
          <div className="divider"></div>
          
          <div className="meal-option-details">
            {
              (() => {
                if (lunchMeals.length > 0) {
                  return lunchMeals.map((meal, index) => (
                    <span key={index}>{meal.food_name}</span>
                  ));
                } else {
                  return <span>점심식사가 없습니다.</span>;
                }
              })()
            }
          </div>

        </div>
        <div className="meal-option-container">
          <div className="meal-option">
            <span>저녁식사</span>
            <button onClick={navigateToAddFood}>+</button>
          </div>
          <div className="divider"></div>
          
          <div className="meal-option-details">
            {
              (() => {
                if (dinnerMeals.length > 0) {
                  return dinnerMeals.map((meal, index) => (
                    <span key={index}>{meal.food_name}</span>
                  ));
                } else {
                  return <span>저녁식사가 없습니다.</span>;
                }
              })()
            }
          </div>
        </div>
        <div className="meal-option-container">
          <div className="meal-option">
            <span>간식/기타</span>
            <button onClick={navigateToAddFood}>+</button>
          </div>
          <div className="divider"></div>
          
          <div className="meal-option-details">
            {
              (() => {
                if (snackMeals.length > 0) {
                  return snackMeals.map((meal, index) => (
                    <span key={index}>{meal.food_name}</span>
                  ));
                } else {
                  return <span>간식/기타가 없습니다.</span>;
                }
              })()
            }
          </div>
        </div>
      </div>

      <div className="button-container">
        <button className="bottom-button" onClick={navigateToDiary}>다이어리</button>
        <button className="bottom-button" onClick={navigateToReport}>리포트</button>
        <button className="bottom-button" onClick={navigateToGoal}>목표</button>
      </div>
    </div>
  );
};

export default Diary;