import React, { useState } from "react";
import axios from "axios";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSendCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/send-code",
        { email }
      );
      setSentCode(response.data);
      setMessage("이메일로 인증 코드가 전송되었습니다.");
    } catch (error) {
      setMessage("이메일 전송 실패");
    }
  };

  const handleVerifyCode = () => {
    if (code === sentCode) {
      setMessage("인증 성공");
    } else {
      setMessage("인증 코드가 잘못되었습니다.");
    }
  };

  return (
    <div>
      <h2>이메일 인증</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력하세요"
      />
      <button onClick={handleSendCode}>인증 코드 보내기</button>

      {sentCode && (
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증 코드를 입력하세요"
          />
          <button onClick={handleVerifyCode}>인증 코드 확인</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailVerification;
