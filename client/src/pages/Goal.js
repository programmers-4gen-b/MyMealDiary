import "../css/common.css"
import "../css/Goal.css";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import GenderSelection from '../component/GenderSelection'
import BmrCalculator from '../component/BmrCalculator';

const Goal = ({userId}) => {
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

    const navigateToLogin = () => {
        navigate('/login');
    }

    const [formData, setFormData] = useState({
        weight: "",
        height: "",
        age: "",
        gender: "",
        result: "",
        activityGrade: "",
        exerciseGrade: "",
        purpose: ""
    });

    const [showOptions, setShowOptions] = useState({
        activityGrade: false,
        exerciseGrade: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOptionSelect = (field, option) => {
        setFormData((prevData) => ({
            ...prevData, [field]: option
        }));
        setShowOptions(
            (prevOptions) => ({
                ...prevOptions, [field]: false
            }));
    };

    const toggleOptions = (field) => {
        setShowOptions((prevOptions) => ({
            ...prevOptions, [field]: !prevOptions[field]
        }));
    };

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    navigate('/login');
  };

    const getExerciseGradeText = (value) => {
        switch (value) {
            case 0:
                return "주에 운동 0회";
            case 0.1:
                return "주에 운동 1~3회";
            case 0.2:
                return "주에 운동 4~6회";
            case 0.3:
                return "주에 운동 7회 이상";
            default:
                return "선택해주세요"; // 초기 상태
        }
    };

    const getActivityGradeText = (value) => {
        switch (value) {
            case 1.2:
                return "낮음 (1.2)";
            case 1.4:
                return "보통 (1.4)";
            case 1.6:
                return "높음 (1.6)";
            default:
                return "선택해주세요"; // 초기 상태
        }
    };

    const getPurposeText = (value) => {
        switch (value) {
            case 0.85:
                return "체중 감량 ";
            case 1.0:
                return "체중 유지";
            case 1.15:
                return "체중 증량";
            default:
                return "선택해주세요"; 
        }
    };

    return (
        <div className="app-container">
            <h1>Goal Page</h1>

            <div className="input-body">
                <span>나이 : </span>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                />
                <span>세</span>
            </div>

            <div className="input-body">
                <span>키:</span>
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                />
                <span>cm</span>
            </div>

            <div className="input-body">
                <span>체중:</span>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                />
                <span>kg</span>
            </div>

            <div className="input-body">
                <span>활동 수준:</span>

                <button type="button" onClick={() => toggleOptions('activityGrade')}>
                    {getActivityGradeText(formData.activityGrade)}
                </button>

                <div className={`options ${showOptions.activityGrade ? "show" : ""}`}>
                    <button onClick={() => handleOptionSelect('activityGrade', 1.2)}> 낮음 (1.2)</button>
                    <button onClick={() => handleOptionSelect('activityGrade', 1.4)}> 보통 (1.4)</button>
                    <button onClick={() => handleOptionSelect('activityGrade', 1.6)}> 높음 (1.6)</button>
                </div>

            </div>

            <div className="input-body">
                <span>운동 빈도:</span>

                <button type="button" onClick={() => toggleOptions('exerciseGrade')}>
                    {getExerciseGradeText(formData.exerciseGrade)}
                </button>

                <div className={`options ${showOptions.exerciseGrade ? "show" : ""}`}>
                    <button onClick={() => handleOptionSelect('exerciseGrade', 0)}> 주에 운동 0회 </button>
                    <button onClick={() => handleOptionSelect('exerciseGrade', 0.1)}> 주에 운동 1~3회</button>
                    <button onClick={() => handleOptionSelect('exerciseGrade', 0.2)}> 주에 운동 4~6회</button>
                    <button onClick={() => handleOptionSelect('exerciseGrade', 0.3)}> 주에 운동 7회 이상</button>
                </div>

            </div>

            <div className="input-body">
                <span>운동 목적:</span>

                <button type="button" onClick={() => toggleOptions('purpose')}>
                    {getPurposeText(formData.purpose)}
                </button>

                <div className={`options ${showOptions.purpose ? "show" : ""}`}>
                    <button onClick={() => handleOptionSelect('purpose', 0.85)}> 체중 감량</button>
                    <button onClick={() => handleOptionSelect('purpose', 1.0)}> 체중 유지</button>
                    <button onClick={() => handleOptionSelect('purpose', 1.15)}> 체중 증량</button>
                </div>
            </div>

            <GenderSelection gender={formData.gender}
                setGender={(value) => setFormData({ ...formData, gender: value })}
            />

            <BmrCalculator formData={formData} />
            <div className="button-container">
                <button className="bottom-button" onClick={navigateToDiary}>다이어리</button>
                <button className="bottom-button" onClick={navigateToReport}>리포트</button>
                <button className="bottom-button" onClick={navigateToGoal}>목표</button>
                <button className="bottom-button" onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
}

export default Goal;