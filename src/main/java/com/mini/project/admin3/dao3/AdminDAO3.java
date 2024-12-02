package com.mini.project.admin3.dao3;

import com.mini.project.admin3.vo3.UserVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Slf4j
public class AdminDAO3 {
    private final JdbcTemplate jdbcTemplate;
    private static final String LOGIN_QUERY = "SELECT COUNT(*) FROM users WHERE user_id = ? AND password =?";
    private static final String SIGNUP_QUERY =
            "INSERT INTO users (user_id, email, password, username, phone_number, address, role) " +
                    "VALUES (USER_SEQ.nextval, ?, ?, ?, ?, ?, 0)";
    private static final String CHECK_EMAIL = "SELECT COUNT(*) FROM USERS WHERE email = ?";

    // 로그인
    public boolean login(String userId, String password) {
        try{
            int count = jdbcTemplate.queryForObject(LOGIN_QUERY, new Object[]{userId, password},Integer.class);
            return count > 0;
        } catch(DataAccessException e) {
            log.error("로그인 조회 실패");
            return false;
        }
    }

    // 회원 가입
    public boolean signup(UserVO3 vo) {
        try {
            int result = jdbcTemplate.update(SIGNUP_QUERY, vo.getEmail(), vo.getPassword(), vo.getUsername(), vo.getPhone_number(), vo.getAddress());
            return result > 0;
        } catch (DataAccessException e) {
            log.error("회원 가입 중 예외 발생", e);
            return false;
        }
    }

    // 회원 가입 여부 확인
    public boolean isEmailExist(String email) {
        try{
            int count = jdbcTemplate.queryForObject(CHECK_EMAIL, new Object[]{email}, Integer.class );
            return count >0;
        } catch (DataAccessException e) {
            log.error("이메일 존재 여부 확인중 에러", e);
            return false;
        }
    }
}
