import "../css/common.css"
import "../css/Login&Signup.css"
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            if (password !== confirmPassword) {
                alert ("비밀번호가 일치하지 않습니다.")
                return;
            }

            const response = await axios.post('http://localhost:3000/user/register',{
                user_name : email,
                password : password
            });
            
            alert(response.data.message);
            navigate('/login');
        } catch(err){
            const errorMessage = err.response.data.message;
            alert(errorMessage);
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className = "app-container">
            <h2>Sign-Up</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor = "email">이메일</label>
                    <input
                        type = "email"
                        id = "email"
                        value = {email}
                        onChange = {(e)=> setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor = "password">비밀번호</label>
                    <input
                        type = "password"
                        id = "password"
                        value = {password}
                        onChange = {(e)=> setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor = "password">비밀번호 확인</label>
                    <input
                        type = "password"
                        id = "confirm-password"
                        value = {confirmPassword}
                        onChange = {(e)=> setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit" className="sign-up-button" disabled={loading}>회원가입</button>
            </form>

            <div className="button-container">
                <button className="bottom-button" onClick={navigateToDiary}>다이어리</button>
                <button className="bottom-button" onClick={navigateToReport}>리포트</button>
                <button className="bottom-button" onClick={navigateToGoal}>목표</button>
                <button className="bottom-button" onClick={navigateToLogin}>로그인</button>
            </div>
        </div>
    );
}

export default SignUp