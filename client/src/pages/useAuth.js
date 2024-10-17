import react, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) 
        return parts.pop().split(';').shift();
    else 
        return null;
};

const useAuth = () => {
    let [isLoggedIn, setIsLoggedIn] = useState('false');
    const navigate = useNavigate();

    useEffect(() => {
        const token = getCookie('token');

        if (token) {
            setIsLoggedIn('true');
            console.log('토큰이 존재합니다. 로그인 상태로 변경합니다.');
        } else {
            setIsLoggedIn('false');
            console.log('토큰이 존재하지 않습니다. 로그인 화면으로 이동합니다.');
            navigate('/login');
        }

        // setIsLoggedIn(!!token);

        // if (!token) {
        //     console.log('로그인 화면 콜백');
        //     navigate('/login');
        // }

        console.log('현재 쿠키:', document.cookie);
        console.log('token:', token);
        console.log('isLoggedIn:', isLoggedIn);
    }, [navigate]);

    useEffect(() => {
        console.log('isLoggedIn 상태가 변경되었습니다:', isLoggedIn);
    }, [isLoggedIn]); // isLoggedIn의 상태가 변경될 때마다 로그 출력
    
    return { isLoggedIn };
};

export default useAuth;
