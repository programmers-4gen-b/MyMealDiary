import "../css/common.css"
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const SignUp = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert ("비밀번호가 일치하지 않습니다.")
            return;
        }
        console.log('회원가입',{email,password});
    }

    return (
        <div className = "app-container">
            <h2>Sign-Up</h2>
            <form onSubmit={handleSignup}>
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
                <button type="submit" className="sign-up-button">회원가입</button>
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