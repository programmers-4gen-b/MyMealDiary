import react, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) 
        return parts.pop().split(';').shift();
    return null;
};

function parseJWT(token) {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = decodeURIComponent(escape(window.atob(base64))); 
    return JSON.parse(jsonPayload); 
}

const useAuth = () => {
    const { setUserId } = useUser();
    let [isLoggedIn, setIsLoggedIn] = useState('false');
    const navigate = useNavigate();

    useEffect(() => {
        const token = getCookie('token');

        if (token) {
            setIsLoggedIn('true');
            const decodedToken = parseJWT(token);
            setUserId(decodedToken.id);
            
        } else {
            setIsLoggedIn('false');
            navigate('/login');
        }

        // console.log('현재 쿠키:', document.cookie);
        // console.log('token:', token);
        // console.log('isLoggedIn:', isLoggedIn);
    }, [navigate, setUserId]);

    useEffect(() => {
        console.log('isLoggedIn 상태가 변경되었습니다:', isLoggedIn);
    }, [isLoggedIn]);
    
    return { isLoggedIn };
};

export default useAuth;
