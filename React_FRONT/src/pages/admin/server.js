const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let verificationCode = null;

const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail 사용
  auth: {
    user: "your-email@gmail.com", // 이메일 계정
    pass: "your-email-password", // 앱 비밀번호 (2단계 인증 활성화 시 생성)
  },
});

// 난수 생성 함수
const generateRandomCode = () => Math.floor(100000 + Math.random() * 900000); // 6자리 난수

// 이메일 전송 엔드포인트
app.post("/send-email", (req, res) => {
  const { email } = req.body;

  // 난수 생성
  verificationCode = generateRandomCode();
  console.log("Generated Code:", verificationCode);

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Failed to send email.");
    }
    console.log("Email sent: " + info.response);
    res.status(200).send("Email sent successfully.");
  });
});

// 인증 엔드포인트
app.post("/verify-code", (req, res) => {
  const { code } = req.body;

  if (parseInt(code, 10) === verificationCode) {
    res.status(200).send("Verification successful.");
  } else {
    res.status(400).send("Invalid verification code.");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
