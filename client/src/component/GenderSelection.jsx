import React from "react";

function GenderSelection({gender,setGender}) {

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div>
      <div className="input-body">성별 :
      <label>
        <input
          type="radio"
          value="male"
          checked={gender === "male"}
          onChange={handleGenderChange}
        />
        남자
      </label>
      <label>
        <input
          type="radio"
          value="female"
          checked={gender === "female"}
          onChange={handleGenderChange}
        />
        여자
      </label>
      </div>
    </div>
  );
}

export default GenderSelection;