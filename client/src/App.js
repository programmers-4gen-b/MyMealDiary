import React, { useState } from 'react';
import './index.css';
import GenderSelection from './component/GenderSelection';
import BmrCalculator from './component/BmrCalculator';

function App() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    result: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setFormData({...formData, [name]: value});
  };

  return (
    <div>
      <h2>목표</h2>

      <div className="input-body">
        <span>나이:</span>
        <input
          type="number"
          name="age" 
          value={formData.age}
          onChange={handleInputChange} 
        />
      </div>

      <div className="input-body">
        <span>  키:</span>
        <input
          type="number"
          name="height" 
          value={formData.height}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-body">
        <span>체중:</span>
        <input
          type="number"
          name="weight" 
          value={formData.weight}
          onChange={handleInputChange}
        />
      </div>

      <GenderSelection gender={formData.gender}
      setGender={(value) => setFormData({...formData, gender: value})} 
      />

      <BmrCalculator formData={formData} />  
    </div>
  );
}

export default App;
