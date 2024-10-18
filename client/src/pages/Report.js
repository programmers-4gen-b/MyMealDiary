import "../css/common.css";
import "../css/CalendarPage.css"
import "../css/PlaceholderInfo.css"
import 'react-calendar/dist/Calendar.css'; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import PlaceholderInfo from '../component/PlaceholderInfo';
import axios from 'axios';
import { useUser } from '../component/UserContext';

const Report = () => {
    const navigate = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false); 
    const [date, setDate] = useState(new Date());
    const [averageCalorie, setAverageCalorie] = useState(null);
    const [consumedCalorie, setConsumedCalorie] = useState(null)
    const [nutrients, setNutrients] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useUser();

    useEffect(() => {
        const savedDate = localStorage.getItem('selectedDate');
        if (savedDate) {
            setDate(new Date(savedDate));  
        }
    }, []);

    const data = {
        "average_calorie": averageCalorie,
        "consumedCalories": consumedCalorie,
        "deficitCalories": null,
        "nutrients": [
            { "name": "탄수화물", "amount": nutrients.carbohydrates || 0 },
            { "name": "단백질", "amount": nutrients.protein || 0 },
            { "name": "지방", "amount": nutrients.fat || 0 }
        ]
    };
    
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

    const handleDateClick = async (value) => {
        setDate(value); 
        setShowCalendar(false);
        localStorage.setItem('selectedDate',value);
        await fetchData(value);
        await fetchNutrients(value);
        await fetchAverageCalories();
    }

    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        navigate('/login');
    };

    const fetchData = async (selectedDate) => {
        console.log('userId:', userId);
        try {
            const formattedDate = selectedDate.toLocaleDateString('en-CA');

            const response = await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/report/dayLog`, {
                params: {
                    user_id: userId,
                    searchDate: formattedDate
                }
            });
            setConsumedCalorie(response.data.totalCalories)
        } catch (error) {
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
        }
    }    

    const fetchAverageCalories = async () => {
        try {
            const response = await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/user/calorie`, {
                params: {
                    user_id : userId
                }
            });
            console.log(response)
            setAverageCalorie(response.data.average_calorie); 
        } catch (error) {
            setError('적정 칼로리 데이터를 가져오는 중 오류가 발생했습니다.');
        }
    }
    
    const fetchNutrients = async (selectedDate)=> {
        console.log('userId:', userId);
        try {            
            const formattedDate = selectedDate.toLocaleDateString('en-CA');

            const response = await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/report/periodLogs`,{
                params : {
                    user_id : userId,
                    startDate : formattedDate,
                    endDate : formattedDate
                }
            });
            setNutrients(response.data)
         } catch (error) {
            setError('영양소 데이터를 가져오는 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        if (userId) {
            fetchData(date);  
            fetchNutrients(date); 
            fetchAverageCalories(); 
        }
    }, [userId, date]);

    return (
        <div className="app-container">
            <h1>My Daily Report</h1>

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

            <PlaceholderInfo date={date.toDateString()} data={data} />

            <div className="button-container">
                <div className="center-buttons">
                    <button className="bottom-button" onClick={navigateToDiary}>
                        다이어리
                    </button>
                    <button className="bottom-button" onClick={navigateToReport}>
                        리포트
                    </button>
                    <button className="bottom-button" onClick={navigateToGoal}>
                        목표
                    </button>
                </div>
                <button className="logout-button" onClick={handleLogout}>
                    로그아웃
                </button>
            </div>

        </div>
    );
}

export default Report;