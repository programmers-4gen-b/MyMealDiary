import "../css/common.css"
import "../css/Diary.css";
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="app-container">
      <div className="week-container">
        <div className="week-slot">
          <div className="week-workday-circle"></div>
          <div className="week-text">월</div>
        </div>
        <div className="week-slot">
          <div className="week-workday-circle"></div>
          <div className="week-text">화</div>
        </div>
        <div className="week-slot">
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
        <p>남은 칼로리: 2000</p>
        <p>섭취한 칼로리: 0</p>
      </div>

      <div className="meal-selection">
        <div className="meal-option-container">
          <div className="meal-option">
            <span>아침식사</span>
            <button>+</button>
          </div>
        </div>
        <div className="meal-option-container">
          <div className="meal-option">
            <span>점심식사</span>
            <button>+</button>
          </div>
        </div>
        <div className="meal-option-container">
          <div className="meal-option">
            <span>저녁식사</span>
            <button>+</button>
          </div>
          <div className="divider"></div>
          <div className="dinner-details">
            <span>햇반</span>
            <span>불고기</span>
          </div>
        </div>
        <div className="meal-option-container">
          <div className="meal-option">
            <span>간식/기타</span>
            <button>+</button>
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