import { useEffect, useState } from "react";
import Input from "../../components/InputComponent";
import Button from "../../components/ButtonComponent";
import { Container, Items } from "../../components/SignupComponent";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import { Button3, Select3,Input3, Container3 } from "../../components/style3";
const Signup = () => {
  const navigate = useNavigate();
  // 키보드 입력
  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  // 오류 메시지
  const [pwMessage, setPwMessage] = useState("");
  const [conPwMessage, setConPwMessage] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [phMessage, setPhMessage] = useState("");
  const [phMessage1, setPhMessage1] = useState("");
  //주소 입력
  const [postcode, setPostcode] = useState(""); // 우편번호
  const [address, setAddress] = useState(""); // 기본 주소
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소
  //전화 번호 입력
  const [ph, setPh] = useState("");
  const [hpFst, setHpFst] = useState("010"); // 초기값 010
  const [hpMid, setHpMid] = useState("");
  const [hpLst, setHpLst] = useState("");
  // 유효성 검사
  const [isMail, setIsMail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isConPw, setIsConPw] = useState(false);
  const [isName, setIsName] = useState(false);
  // 전번 유효성 검사
  const [isPh, setIsPh] = useState(false);
  const [isPh1, setIsPh1] = useState(false);
  const [isDaumLoaded, setIsDaumLoaded] = useState(false);
  // 주소 입력 유효성 검사
  const [isPost, setIsPost] = useState(false);
  const [isAddr, setIsAddr] = useState(false);
  const [isDAddr, setIsDAddr] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => setIsDaumLoaded(true); // Daum API가 로드되었을 때 상태 업데이트
    document.head.appendChild(script);
    setIsPost(postcode.length > 0);
    setIsAddr(address.length > 0);
    UnionFirst();
    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, [address, postcode, hpFst, hpMid, hpLst]); // 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setPostcode(data.zonecode);
    setAddress(fullAddress);
    setDetailAddress("");

    // setUserInfo(prevState => ({
    //     ...prevState,
    //     zipCode: Number(data.zonecode),
    //     addr: fullAddress,
    //     addrDetail: '' // 기본값으로 설정
    //   }));
  };

  const handleClick1 = () => {
    if (isDaumLoaded) {
      const { daum } = window;
      new daum.Postcode({
        oncomplete: handleComplete,
      }).open();
    } else {
      console.log("Daum Postcode API is not loaded yet.");
    }
  };
  // 이메일 유효성 검사
  const onChangeMail = (e) => {
    setInputEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(e.target.value)) {
      setMailMessage("이메일 형식이 올바르지 않습니다.");
      setIsMail(false);
    } else {
      setMailMessage("올바른 형식 입니다.");
      setIsMail(true);
      memberRegCheck(e.target.value);
    }
  };
  const onChangePw = (e) => {
    //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자 조합으로 8자리 이상 입력해주세요!");
      setIsPw(false);
    } else {
      setPwMessage("안전한 비밀번호에요 : )");
      setIsPw(true);
    }
  };
  const onChageMidPh = (e) => {
    const phRegex = /^\d{4}$/;
    const midPhCurrent = e.target.value;
    setHpMid(midPhCurrent);
    if (!phRegex.test(midPhCurrent)) {
      setPhMessage("4자리 숫자로 입력해 주세요.");
      setIsPh(false);
    } else {
      setPhMessage("확인되었습니다.");
      setIsPh(true);
    }
  };
  const onChageLstPh = (e) => {
    const phRegex = /^\d{4}$/;
    const lstPhCurrent = e.target.value;
    setHpLst(lstPhCurrent);
    if (!phRegex.test(lstPhCurrent)) {
      setPhMessage1("4자리 숫자로 입력해 주세요.");
      setIsPh1(false);
    } else {
      setPhMessage1("확인되었습니다.");
      setIsPh1(true);
    }
  };
  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value;
    setInputConPw(passwordCurrent);
    if (passwordCurrent !== inputPw) {
      setConPwMessage("비밀 번호가 일치하지 않습니다.");
      setIsConPw(false);
    } else {
      setConPwMessage("비밀 번호가 일치 합니다. )");
      setIsConPw(true);
    }
  };
  const onChangeName = (e) => {
    setInputName(e.target.value);
    setIsName(true);
  };

  // 회원 가입 여부 확인
  const memberRegCheck = async (email) => {
    try {
      const resp = await AxiosApi.regCheck(email);
      console.log("가입 가능 여부 확인 : ", resp.data);
      if (resp.data === true) {
        setMailMessage("사용 가능한 이메일 입니다.");
        setIsMail(true);
      } else {
        setMailMessage("중복된 이메일 입니다.");
        setIsMail(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UnionFirst = () => {
    setPh(hpFst + "-" + hpMid + "-" + hpLst);
    setInputAddress(postcode + ":" + address + ":" + detailAddress);
  };
  const onClickLogin = async () => {
    console.log(ph);
    console.log(inputAddress);
    try {
      const memberReg = await AxiosApi.signup(
        inputEmail,
        inputPw,
        inputName,
        inputAddress,
        ph
      );
      console.log(memberReg.data);
      if (memberReg.data) {
        navigate("/");
      } else {
        // setModalOpen(true);
        // setModelText("회원 가입에 실패 했습니다.");
        alert("회원 가입에 실패 했습니다.");
      }
    } catch (e) {
      alert("서버가 응답하지 않습니다.");
    }
  };
  const onChangePostCode = (e) => {
    const newPostCode = e.target.value.trim();
    setPostcode(newPostCode);

    // 빈 문자열 또는 null 체크
    setIsPost(newPostCode !== "" && newPostCode !== null);
  };

  const onChangeAddr = (e) => {
    const newAddr = e.target.value;
    setAddress(newAddr);
    setIsAddr(newAddr.length > 0);
  };

  const onChangeDAddr = (e) => {
    const newDAddr = e.target.value;
    setDetailAddress(newDAddr);
    setIsDAddr(newDAddr.length > 0);
  };

  return (
    <Container>
      <Items className="sign">
        <span>Sign Up</span>
      </Items>

      <Items variant="item2">
        <Input
          type="email"
          placeholder="이메일"
          value={inputEmail}
          onChange={onChangeMail}
          isValid={isMail}
        />
      </Items>
      <Items variant="hint">
        {inputEmail.length > 0 && (
          <span className={`message ${isMail ? "success" : "error"}`}>
            {mailMessage}
          </span>
        )}
      </Items>
      <Items variant="item2">
        <Input
          type="password"
          placeholder="패스워드"
          value={inputPw}
          onChange={onChangePw}
           isValid={isPw}
        />
      </Items>
      <Items variant="hint">
        {inputPw.length > 0 && (
          <span className={`message ${isPw ? "success" : "error"}`}>
            {pwMessage}
          </span>
        )}
      </Items>
      <Items variant="item2">
        <Input
          type="password"
          placeholder="패스워드 확인"
          value={inputConPw}
          onChange={onChangeConPw}
           isValid={isConPw}
        />
      </Items>
      <Items variant="hint">
        {inputPw.length > 0 && (
          <span className={`message ${isConPw ? "success" : "error"}`}>
            {conPwMessage}
          </span>
        )}
      </Items>
      <Items variant="item2">
        <Input
          type="text"
          placeholder="이름"
          value={inputName}
          onChange={onChangeName}
           isValid={isName}
        />
      </Items>
      <Items varient="addres">
        {isAddr &&
        isDAddr ? (
          <Button enabled onClick={handleClick1}>
            NEXT
          </Button>
        ) : (
          <Button disabled>NEXT</Button>
        )}
      </Items>
      <Items>
        <Input
          type="text"
          placeholder="우편번호"
          value={postcode}
          onChange={onChangePostCode}
          disabled
           isValid={isPost}
        />
       </Items>
       <Items>
        <Input
          type="text"
          placeholder="주소"
          value={address}
          onChange={onChangeAddr}
          disabled
           isValid={isAddr}
        />
      </Items>
      <Items>
        <Input
          type="text"
          placeholder="상세 주소"
          value={detailAddress}
          onChange={onChangeDAddr}
           isValid={isDAddr}
        />
      </Items>
      <Items variant="hint">
        {postcode.length > 0 && (
          <span className={`message ${isPost ? "success" : "error"}`}>
            <p>확인하였습니다.</p>
          </span>
        )}
      </Items>
      <Items variant="hint">
        {address.length > 0 && (
          <span className={`message ${isAddr ? "success" : "error"}`}>
            <p>확인하였습니다.</p>
          </span>
        )}
      </Items>
      <Items variant="hint">
        {detailAddress.length > 0 && (
          <span className={`message ${isDAddr ? "success" : "error"}`}>
            <p>확인하였습니다.</p>
          </span>
        )}
      </Items>
      <Items variant="phone">
        <Input
          placeholder="전화번호"
          value="010"
          onChange={(e) => setHpFst(e.target.value)}
           readOnly
        />
        <Input
          type="number"
          placeholder="전화번호"
          value={hpMid}
          onChange={onChageMidPh}
           isValid={isPh}
        />
        <Input
          type="text"
          placeholder="전화번호"
          value={hpLst}
          onChange={onChageLstPh}
           isValid={isPh1}
        />
      </Items>
      <Items variant="hint">
        {hpMid.length > 3 && (
          <span className={`message ${isPh ? "success" : "error"}`}>
            {phMessage}
          </span>
        )}
      </Items>
      <Items variant="hint">
        {hpLst.length > 3 && (
          <span className={`message ${isPh1 ? "success" : "error"}`}>
            {phMessage1}
          </span>
        )}
      </Items>
      <Items variant="item2">
        {console.log(
          isMail,
          isPw,
          isConPw,
          isName,
          isPh,
          isPh1,
          isPost,
          isAddr,
          isDAddr
        )}
        {isMail &&
        isPw &&
        isConPw &&
        isName &&
        isPh &&
        isPh1 &&
        isAddr &&
        isDAddr ? (
          <Button enabled onClick={onClickLogin}>
            NEXT
          </Button>
        ) : (
          <Button disabled>NEXT</Button>
        )}
      </Items>
    </Container>
  );
};
export default Signup;
