package com.kh.MINI.admin3.dao3;

import com.kh.MINI.admin3.vo3.UserVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
@Slf4j
public class UsersDAO3 {
    
    private final JdbcTemplate jdbcTemplate;

    // 유저 권한 조회
    private static final String ALL_ROLES = "SELECT DISTINCT ROLE FROM USERS";
    // 유저 총 수 조회
    private static final String ALL_USERS_COUNT="SELECT COUNT(*) FROM USERS";
    private static final String ALL_USERS =
            "SELECT user_id, username, password, email, role, address, phone_number " +
                    "FROM ( " +
                    "  SELECT user_id, username, password, email, role, address, phone_number, " +
                    "         ROW_NUMBER() OVER (ORDER BY user_id DESC) AS rn " +
                    "  FROM USERS " +
                    ") " +
                    "WHERE rn > ? AND rn <= ?";  // pageIndex와 pageSize로 동적으로 값 설정

    public List<UserVO3> userList(Map<String, Object> paramMap) {
        try {
            // pageIndex와 pageSize를 추출
            int pageIndex = (int) paramMap.get("pageIndex");
            int pageSize = (int) paramMap.get("pageSize");

            // pageIndex와 pageSize 계산
            int startRow = pageIndex;
            int endRow = pageIndex + pageSize;

            // JdbcTemplate을 사용하여 쿼리 실행
            return jdbcTemplate.query(
                    ALL_USERS,
                    new Object[] { startRow, endRow },  // startRow와 endRow를 쿼리에 전달
                    new UserRowMapper()  // 결과를 매핑할 RowMapper
            );
        } catch (DataAccessException e) {
            log.error("유저 리스트 조회 중 오류 발생: ", e);
            throw e;
        }
    }





    // 유저 권한 조회
    public List<UserVO3> roleList() {
        try{
            return jdbcTemplate.query(ALL_ROLES, new UserRoleRowMapper());
        }catch (DataAccessException e){
            log.error("권한 조회중 에러 발생 : ", e);
            throw e;
        }
    }

    public int totalCount(Map<String, Object> paramMap) {
        try{
            return jdbcTemplate.queryForObject(ALL_USERS_COUNT, Integer.class);
        }catch (DataAccessException e) {
            log.error("총 회원수 조회중 에러 : ", e);
            throw e;
        }
    }

    private static class UserRowMapper implements RowMapper<UserVO3>{
        @Override
        public UserVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new UserVO3(
                    rs.getString("user_id"),
                    rs.getString("username"),
                    rs.getString("password"),
                    rs.getString("email"),
                    rs.getInt("role"),
                    rs.getString("address"),
                    rs.getString("phone_number")
            );
        }
    }
    private static class UserRoleRowMapper implements RowMapper<UserVO3>{
        @Override
        public UserVO3 mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new UserVO3(
                    rs.getInt("role")
            );
        }
    }
}
