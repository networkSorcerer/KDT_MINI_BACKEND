import axios from "axios";
const KH_DOMAIN = "http://localhost:8112";

const AxiosApi = {
  // 로그인
  login: async (email, pw) => {
    console.log("이메일 : ", email);
    console.log("패스워드 : ", pw);
    const login = {
      email: email,
      password: pw,
    };
    return await axios.post(KH_DOMAIN + "/auth/login", login);
  },
  // 이메일 중복 검사
  regCheck: async (email) => {
    return await axios.get(KH_DOMAIN + `/auth/exists/${email}`);
  },
  // 회원 가입
  signup: async (email, pwd, name, address, ph) => {
    const member = {
      email: email,
      password: pwd,
      username: name,
      address: address,
      phone_number: ph,
    };
    return await axios.post(KH_DOMAIN + `/auth/signup`, member);
  },
  // 권한 확인 (회원 등급 확인)
  roleCheck: async (email, password) => {
    console.log("이메일 : ", email);
    console.log("패스워드 : ", password);

    const params = {
      email: email,
      password: password,
    };

    return await axios.get(KH_DOMAIN + "/auth/roleCheck", { params });
  },
  // 카테고리 리스트 출력
  categoryList: async () => {
    return await axios.get(KH_DOMAIN + "/products/category");
  },
  // 상품 등록
  productSave: async (params) => {
    return await axios.post(KH_DOMAIN + "/products/save", params);
  },
};

export default AxiosApi;
