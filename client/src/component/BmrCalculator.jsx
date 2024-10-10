import React, {useState} from "react";

function BmrCalculator( {formData} ) {
    const [result, setResult] = useState("")
    const [result2,setResult2] = useState("")
    
    const calculateBmr = () => {
        const {weight, height, age,
              gender, activityGrade, exerciseGrade} = formData;    
    
        if (!weight || !height || !age || !gender) {
            setResult("값을 다 입력해주세요.");
            return;
        }

        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseInt(age);
        const aG = parseFloat(activityGrade);
        const eG = parseFloat(exerciseGrade);
        let bmr;
        let amr;

        if (gender === "male") {
          bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.667 * a);
          amr = (88.362 + (13.397 * w) + (4.799 * h) - (5.667 * a))*(aG+eG);
        } else {
          bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
          amr = (447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a))*(aG+eG);
        }

        setResult(`기초대사량 : ${Math.round(bmr)} kcal`) 
        setResult2(`활동대사량 : ${Math.round(amr)} kcal`)
    }; return (
        <div>
    <button onClick={calculateBmr}>계산하기</button>
    {result && result2 && (
        <div>
          <p>{result}</p>
          <p>{result2}</p>
        </div>
      )}
    </div>
    )
}
export default BmrCalculator;
