import { useEffect, useState } from "react";
import AxiosApi from "../../../api/AxiosApi3";

const AdminUsers = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    UserList();
  }, []);

  // 유저 리스트 출력
  const UserList = () => {
    const rsp = AxiosApi.userList();
    setUserList(rsp.data);
  };
  return (
    <>
      <p>이제야 유저야 ...... </p>
      <table></table>
    </>
  );
};
export default AdminUsers;
