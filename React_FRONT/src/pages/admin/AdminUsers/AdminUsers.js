import { useContext, useEffect, useState } from "react";
import AxiosApi from "../../../api/AxiosApi3";
import { UserSearchContext } from "../../../api/provider/UserSearchContextProvider";
import { PageNavigate } from "../../../api/Pagination/PageNavigate";

const AdminUsers = () => {
  const { searchKeyword } = useContext(UserSearchContext);
  const [userList, setUserList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState("");
  useEffect(() => {
    console.log("전역변수 확인 ", searchKeyword);
    UserList();
  }, [searchKeyword]);

  // 유저 리스트 출력
  const UserList = async (cpage) => {
    console.log("Page changed:", cpage); // 페이지 변경 시 로그 출력
    cpage = cpage || 1;
    const params = {
      ...searchKeyword,
      currentPage: cpage,
      pageSize: 5,
    };

    const rsp = await AxiosApi.userList(params);
    setUserList(rsp.data.userList);
    setCurrentPage(cpage);
    setTotalCnt(rsp.data.totalCount);
  };

  return (
    <>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>유저 번호</th>
            <th>이름</th>
            <th>ID</th>
            <th>PASSWORD</th>
            <th>권한</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.length > 0 ? (
            userList.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-primary">주문 목록 조회</button>
                  <button className="btn btn-warning ml-2">삭제 </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-warning">
                <strong>데이터가 없습니다.</strong>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <PageNavigate
        totalItemsCount={totalCnt}
        onChange={UserList}
        itemsCountPerPage={5}
        activePage={currentPage}
      ></PageNavigate>
    </>
  );
};

export default AdminUsers;
