import React, {useState} from "react";

function BmrCalculator( {formData} ) {
    const [result, setResult] = useState("")
    
    const calculateBmr = () => {
        const {weight, height, age, gender} = formData;    
    
        if (!weight || !height || !age || !gender) {
            setResult("값을 다 입력해주세요.");
            return;
        }

        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseInt(age);

        let bmr;

        if (gender === "male") {
          bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.667 * a);
        } else {
          bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
        }

        setResult(`기초대사량 : ${Math.round(bmr)} kcal`) 
    }; return (
        <div>
    <button onClick={calculateBmr}>계산하기</button>
    {result && (
        <div>
          <p>{result}</p>
        </div>
      )}
    </div>
    )
}
export default BmrCalculator;
