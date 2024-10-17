import "../css/common.css"
import "../css/Login&Signup.css"
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/user/login', {
                user_name: email,
                password: password
            }, { withCredentials: true });

            alert(response.data.message);
            navigate('/');
        } catch (err) {
            const errorMessage = err.response.data.message;
            alert(errorMessage);
        } finally{
            setLoading(false);
        }
    };
    return (
        <div>
            <div className="app-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <br></br>
                    <button type="submit" className="login-button" disabled={loading}>로그인</button>
                    <button type="button" className="sign-up-button"
                        onClick={() => navigate('/signup')}>회원가입</button>
                </form>

                <div className="button-container">
                    <button className="bottom-button" onClick={navigateToDiary}>다이어리</button>
                    <button className="bottom-button" onClick={navigateToReport}>리포트</button>
                    <button className="bottom-button" onClick={navigateToGoal}>목표</button>
                    <button className="bottom-button" onClick={navigateToLogin}>로그인</button>
                </div>
            </div>
        </div>
    )
}

export default Login;