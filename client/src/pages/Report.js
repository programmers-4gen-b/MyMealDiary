import "../css/common.css"
import "../css/Report.css";
import { useNavigate } from 'react-router-dom';

const Report = () => {
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

    return (
        <div className="app-container">Report page
            <div className="button-container">
                <button className="bottom-button" onClick={navigateToDiary}>다이어리</button>
                <button className="bottom-button" onClick={navigateToReport}>리포트</button>
                <button className="bottom-button" onClick={navigateToGoal}>목표</button>
            </div>
        </div>
    );
}

export default Report;