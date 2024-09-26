import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Info from "../Info";
import Login from "../Login/Login";
import ChangePW from "../Login/Changepw";
import Join from "../Login/Join";
import Main from "../Main";

function RootRoutes() {
    const [isLogin, setIsLogin] = useState(null);
    const location = useLocation();

    useEffect(() => {
        console.log("Page changed:", location.pathname);
        checkLogin();  // 페이지 이동 시마다 로그인 상태 확인
    }, [location]);

    const checkLogin = async () => {
        const loginCheck = window.localStorage.getItem("loginCheck");
        console.log("Login check from localStorage:", loginCheck);
        if (loginCheck !== null) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    };

    useEffect(() => {
        console.log("RootRoutes mounted");
        checkLogin();
    }, []);

    // 로딩 상태 처리
    if (isLogin === null) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route path="/" element={<Info />} />
            <Route path="/login" element={isLogin ? <Main /> : <Login />} />
            <Route path="/changepw" element={<ChangePW />} />
            <Route path="/join" element={<Join />} />
            <Route path="/main" element={isLogin ? <Main /> : <Login />} />
        </Routes>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <RootRoutes />
        </BrowserRouter>
    );
}
