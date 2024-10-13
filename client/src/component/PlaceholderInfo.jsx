import React from 'react';

const PlaceholderInfo = ({ date, data }) => {
    return (
        <div className="placeholder-info">
            <p> 날짜 : {date}</p>
            {data ? (
                <>
                    <p>식단 정보 : </p>
                    <table className = "table">
                        <thead>
                            <tr>
                                <th>총 칼로리</th>
                                <th>섭취한 칼로리</th>
                                <th>부족한 칼로리</th>
                                <th>영양 성분</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.totalCalories} kcal</td>
                                <td>{data.consumedCalories} kcal</td>
                                <td>{data.deficitCalories} kcal</td>
                                <td>
                                    <ul>
                                        {data.nutrients.map((nutrient,index) =>(
                                            <li key = {index}>{nutrient.name}: {nutrient.amount} g </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            ) : (
                <p>식단이 등록되지 않았습니다.</p>
            )}
        </div>
    );
};

export default PlaceholderInfo;