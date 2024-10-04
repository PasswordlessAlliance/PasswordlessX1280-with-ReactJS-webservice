/** @format */

import "../../css/style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Common } from "../Common";
import qs from 'qs';
function Changepw(props) {
    const common = Common();
    const { t } = useTranslation(); // 다국어
    const navigate = useNavigate();
    const userID = sessionStorage.getItem("userID");
    const [formData, setFormData] = useState({});
    const movePage = (url) => {
        navigate(url);
    };


    const changeInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
   
    const changePw = async () => {
         
    var id = formData.id === undefined ? "" : formData.id;
    var pw = formData.pw === undefined ? "" : formData.pw;
    var pw2 = formData.pw2 === undefined ? "" : formData.pw2;
  //	email = trim(email);
  
  
    if(id === "") {
      alert(t("Main.013"));	// 아이디를 입력하세요.
      return false;
    }
  
    if(pw === "") {
        alert(t("Main.014"));	// 비밀번호를 입력하세요.
      return false;
    }
  
    if(pw2 === "") {
        alert(t("Main.015"));	// 비밀번호 확인을 입력하세요.
      return false;
    }
    
    if(pw !== pw2) {
        alert(t("Main.016"));	// 비밀번호가 일치하지 않습니다.
        const newFormData = { ...formData };  // 기존 객체를 복사하여 새 객체 생성
        delete newFormData["pw_re"];  // 해당 키 삭제
        setFormData(newFormData);
      return false;
    }
    const method = "post";
    const url = "http://localhost:80/api/Login/changepw";
    var reqeustData = {
      id: formData.id,
      pw: formData.pw
    }
    var data = qs.stringify(reqeustData);
    const config = "";
    const response = await common.apiRequest(method, url, data, config);
    if(response.result === "OK"){
        alert("Password changing complete.");
        movePage("/login");
    }
    else{
        alert(response.result);
    }
    };
    return (
        <div className="main_container">
        <div className="main_container">
          <div className="modal">
            <div style={{ width: '100%', textAlign: 'right' }}>
              <div className="select_lang">
                <select id="lang" name="lang" onChange={(e) => common.changeLanguage(e.target.value)}>
                  <option value="en">EN</option>
                  <option value="ko">KR</option>
                </select>
              </div>
            </div>
            <div className="login_article">
              <div className="title">
                <em style={{ width: '100%', textAlign: 'center' }}>{t("Main.008")}</em> 
              </div>
              <div className="content">
                <div>
                  <form>
                    <div className="input_group">
                      <input
                        type="text"
                        id="id"
                        name="id"
                        placeholder="ID"
                        value={formData.id || ""}
                        onChange={changeInput}
                      />
                    </div>
                    <div className="input_group">
                      <input
                        type="password"
                        id="pw"
                        name="pw"
                        placeholder="PASSWORD"
                        value={formData.pw || ""}
                        onChange={changeInput}
                      />
                    </div>
                    <div className="input_group">
                      <input
                        type="password"
                        id="pw2"
                        name="pw2"
                        placeholder="Confirmation PASSWORD"
                        value={formData.pw2 || ""}
                        onChange={changeInput}
                      />
                    </div>
                  </form>
                </div>
                <div className="btn_zone">
                  <button onClick={changePw} className="btn active_btn">
                    {t("Main.009")}
                  </button>
                  &nbsp;
                  <a href="/login" className="btn active_btn">
                  {t("Main.007")}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="modal_bg"></div>
        </div>
      </div>
    );
}

export default Changepw;
