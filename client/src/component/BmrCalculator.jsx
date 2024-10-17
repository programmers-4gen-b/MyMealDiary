import React, {useState} from "react";
import axios from 'axios';
import { useUser } from './UserContext';

function BmrCalculator( {formData} ) {
  const [result, setResult] = useState("")
  const [result2,setResult2] = useState("")
  const [result3,setResult3] = useState("")
  const [errors, setErrors] = useState({});
  const { userId } = useUser();
 
  const calculateBmr = () => {
    const {weight, height, age,
      gender, activityGrade, exerciseGrade, purpose} = formData;
            
    const newErrors={};
    if (!weight) newErrors.weight = "체중을 입력해주세요!";
    if (!height) newErrors.height = "키를 입력해주세요!";
    if (!age) newErrors.age = "나이를 입력해주세요!";
    if (!gender) newErrors.gender = "성별을 선택해주세요!";
    if (!activityGrade) newErrors.activityGrade = "활동 수준을 선택해주세요.";
    if (!exerciseGrade) newErrors.exerciseGrade = "운동 빈도를 선택해주세요.";
    if (!purpose) newErrors.purpose = "운동 목적을 입력해주세요.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setResult("");
      setResult2("");
      setResult3("");
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    const aG = parseFloat(activityGrade);
    const eG = parseFloat(exerciseGrade);
    const pG = parseFloat(purpose);
    let bmr;
    let amr;

    if (gender === "male") {
        bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.667 * a);
        amr = (88.362 + (13.397 * w) + (4.799 * h) - (5.667 * a))*(aG+eG);
      } else {
        bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
        amr = (447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a))*(aG+eG);
      }
      
      setResult(Math.round(bmr)) 
      setResult2(Math.round(amr))
      setResult3(Math.round(amr*pG))
      
    }; 
    
    const saveResult = async () => {
      const dataToSave = {
        user_id : userId,
        average_calorie : result3
      };
  
      try {
        const response = await axios.put(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/user/calorie`,dataToSave);
        console.log('성공', response.data);
        alert('저장에 성공했습니다!');
      } catch (error) {
        console.error('실패', error.response ? error.response.data : error.message)
        alert('저장에 실패했습니다. 다시 시도해 주세요.');
      }
    };
  
    const handleRefresh = () => {
      window.location.reload(); 
    };
    
    return (
    <div>
      <button className ="bmr-button" onClick={calculateBmr}>계산하기</button>

      {errors.weight && <p style={{ color: 'red' }}>{errors.weight}</p>}
      {errors.height && <p style={{ color: 'red' }}>{errors.height}</p>}
      {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
      {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
      {errors.activityGrade && <p style={{ color: 'red' }}>{errors.activityGrade}</p>}
      {errors.exerciseGrade && <p style={{ color: 'red' }}>{errors.exerciseGrade}</p>}
        
      {result && result2 && (
        <div>
          <p style ={{fontWeight : 'bold'}}>{`기초대사량 : ${result} kcal`}</p>
          <p style ={{fontWeight : 'bold'}}>{`활동대사량 : ${result2} kcal`}</p>
          <p style ={{fontWeight : 'bold'}}>{`목표섭취량 : ${result3} kcal`}</p>
          <div className ="result_button">
            <button className ="bmr-button" onClick={saveResult}>저장</button>
            <button className ="bmr-button" onClick={handleRefresh}>초기화</button>
        </div> 
      </div>)}
    </div>
  )
}
export default BmrCalculator;