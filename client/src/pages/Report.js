import "../css/common.css";
import "../css/Report.css";
import "../css/CalendarPage.css"
import 'react-calendar/dist/Calendar.css'; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import PlaceholderInfo from '../component/PlaceholderInfo';

const Report = () => {
    const navigate = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false); 
    const [date, setDate] = useState(new Date());
    

    const navigateToDiary = () => {
        navigate('/');
    }

    const navigateToReport = () => {
        navigate('/report');
    }

    const navigateToGoal = () => {
        navigate('/goal');
    }

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar); 
    }

    const handleDateClick = (value) => {
        setDate(value); 
        setShowCalendar(false); 
    }

    return (
        <div className="app-container">
            <h1>Report Page</h1>

            <button onClick={toggleCalendar} className="calendar-button">
                {showCalendar ? '달력 숨기기' : '달력 보기'}
            </button>

            {showCalendar && (
                <div className="calendar-modal">
                    <div className="calendar-content">
                        <Calendar
                            onChange={handleDateClick} 
                            value={date}
                        />
                    </div>
                </div>
            )}

            <div style={{ marginTop: '20px' }}>
                <p>선택된 날짜: {date.toDateString()}</p>
            </div>

            <PlaceholderInfo date={date.toDateString()} />

            <div className="button-container">
                <button className="bottom-button" onClick={navigateToDiary}>다이어리</button>
                <button className="bottom-button" onClick={navigateToReport}>리포트</button>
                <button className="bottom-button" onClick={navigateToGoal}>목표</button>
            </div>
        </div>
    );
}

export default Report;
