import React from 'react';

const PlaceholderInfo = ({ date }) => {
    return (
        <div className="placeholder-info" style={{ marginTop: '20px' }}>
            <p>날짜: {date}</p>
            <p>이벤트가 등록되지 않았습니다.</p>
        </div>
    );
};

export default PlaceholderInfo;
