<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%

//----------------------- 다국어 선택 -----------------------

String enLang ="";
String koLang = "";

String lang = (String) request.getParameter("lang");
if(lang == null)
	lang = "";

if(lang.equals("")) {
	
	javax.servlet.http.Cookie[] cookies = request.getCookies();
	if(cookies != null)
		for(Cookie c:cookies) {
			if(c.getName().equals("lang")) {
				String value = java.net.URLDecoder.decode(c.getValue(), "UTF-8");
				if(value != null && !value.equals(""))
					lang = value;
			}
		}
}

if(lang.toLowerCase().equals("en"))
	enLang = " selected";

if(lang.toLowerCase().equals("ko"))
	koLang = " selected";

%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/views/Common/Include/headTop.jsp" %>
</head>

<body>
<div class=" main_container">
	<div class=" main_container">
		<div class="modal">
			<div style="width:100%; text-align:right;">
				<div class="select_lang">
					<select id="lang" name="lang" onchange="javascript:selLang();">
						<option value="en"<%=enLang %>>EN</option>
						<option value="ko"<%=koLang %>>KR</option>
					</select>
				</div>
			</div>
			<div class="login_article">
				<div class="title"><em style="width:100%; text-align:center;"><spring:message code="user.password.find" /></em></div><!-- 비밀번호 찾기 -->
				<div class="content">
					<div>
						<form>
							<div class="input_group">
								<input type="text" id="id" placeholder="ID" />
							</div>
							<div class="input_group">
								<input type="password" id="pw" placeholder="PASSWORD" />
							</div>
							<div class="input_group">
								<input type="password" id="pw2" placeholder="Confirmation PASSWORD" />
							</div>
						</form>
					</div>
					<div class="btn_zone">
						<a href="javascript:changepw();" class="btn active_btn"><spring:message code="user.password.reset" /></a><!-- 비밀번호변경 -->
						&nbsp;
						<a href="/Login/login.do" class="btn active_btn"><spring:message code="user.cancel" /></a><!-- 취소 -->
					</div>           
				</div>
			</div>
		</div>
		<div class="modal_bg"></div>
	</div>
</div>
</body>

<script>
$(document).ready(function() {
	$("#id").focus();
})

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function changepw() {
	id = $("#id").val();
	pw = $("#pw").val();
	pw2 = $("#pw2").val();
	
	id = trim(id);
	pw = trim(pw);
	pw2 = trim(pw2);
	
	$("#id").val(id);
	$("#pw").val(pw);
	$("#pw2").val(pw2);
	
	if(id == "") {
		alert("<spring:message code="user.input.id" />");	// 아이디를 입력하세요.
		$("#id").focus();
		return false;
	}

	if(pw == "") {
		alert("<spring:message code="user.input.password" />");	// 비밀번호를 입력하세요.
		$("#pw").focus();
		return false;
	}

	if(pw2 == "") {
		alert("<spring:message code="user.input.passwordre" />");	// 비밀번호 확인을 입력하세요.
		$("#pw2").focus();
		return false;
	}
	
	if(pw != pw2) {
		alert("<spring:message code="user.input.password.notmatch" />");	// 비밀번호가 일치하지 않습니다.
		$("#pw2").focus();
		return false;
	}

	$.ajax({
        url : "/api/Login/changepw",
        type : "post",
        data : {
        	"id" : id,
            "pw" : pw
        },
        success : function(res) {
        	if(res.result == "OK") {
        		alert("Password changing complete.");
            	location.href = "/Login/login.do";
        	}
            else {
            	alert(res.result);
            }
        },
        error : function(res) {
            alert(res.msg);
        },
        complete : function() {
        }
    });
}
</script>

</html>
