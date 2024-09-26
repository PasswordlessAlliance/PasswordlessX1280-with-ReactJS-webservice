 import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

function Common() {
    // 다국어
    const { i18n } = useTranslation();
    const changeLanguage = (language) => {
        console.log(language);
        sessionStorage.setItem("language", language);
        i18n.changeLanguage(language);
    };
    // 다국어
    // API
    // const apiDomain = "http://182.162.89.42";
    const apiDomain = "http://61.97.143.208";
    // const apiDomain = "";
    const apiRequest = async (method, url, data, config) => {
        let response = "";
        try {
            if (method === "get") {
                if (data === null) response = await axios.get(url, config);
                else response = await axios.get(url, data, config);
            }
            if (method === "post") response = await axios.post(url, data, config);
            if (method === "patch") response = await axios.patch(url, data, config);
            if (method === "put") {
                if (data === null) response = await axios.put(url, config);
                else response = await axios.put(url, data, config);
            }
            if (method === "delete") response = await axios.delete(url, config);
            if (response !== "") response = response.data;
        } catch (error) {
            console.log(error);
        }
        return response;
    };
    // API
    // ACCOUNT
    const handlePasswordCheck = (password) => {
        const passwordRegex = /^(?=.*[~!@#$%^*\/\-_=])[\w~!@#$%^*\/\-_=]{8,30}$/;
        const isValid = passwordRegex.test(password);
        let errorMessage = "";
        if (!isValid) errorMessage = "패스워드는 지정된 특수문자를 최소한 한 번 포함하여 8자 이상 30자 미만으로 설정해주세요.";
        return errorMessage;
    };

    const handleUserNameCheck = (userName) => {
        const regex = /^[\p{L}\p{N}]{3,10}$/u;
        const isValid = regex.test(userName);
        let errorMessage = "";
        if (!isValid) errorMessage = "error";
        return errorMessage;
    };

    const handleIdCheck = (id) => {
        const regex = /^[a-z0-9]{3,10}$/;
        const isValid = regex.test(id);
        let errorMessage = "";
        if (!isValid) errorMessage = "error";
        return errorMessage;
    };

    const handleLicenseCheck = (license) => {
        const regex = /^[a-zA-Z0-9-]{3,50}$/;
        const isValid = regex.test(license);
        let errorMessage = "";
        if (!isValid) errorMessage = "error";
        return errorMessage;
    };

    const twoFwCheck = (twoFw) => {
        const regex = /^[a-zA-Z0-9-]{3,50}$/;
        const isValid = regex.test(twoFw);
        let errorMessage = "";
        if (!isValid) errorMessage = "error";
        return errorMessage;
    };
    // ACCOUNT
    // LOGIN
    const execLogout = async () => {
        sessionStorage.removeItem("tempAccess");
        sessionStorage.removeItem("tempRefresh");
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userID");
        sessionStorage.removeItem("activeTab");
        sessionStorage.removeItem("needResetPwd");
        sessionStorage.removeItem("svcMode");
        window.location.href = "/";
    };
    // LOGIN
   

    

    

    return {
        apiDomain,
        changeLanguage,
        apiRequest,
        execLogout,
        handlePasswordCheck,
        handleUserNameCheck,
        handleLicenseCheck,
        handleIdCheck,
        twoFwCheck,
    };
}

export { Common };
