package com.mini.project.admin3.dao3;

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
    private static final String LOGIN_QUERY = "SELECT COUNT(*) FROM mini_member WHERE email = ? AND password =?";
    public boolean login(String userId, String password) {
        try{
            int count = jdbcTemplate.queryForObject(LOGIN_QUERY, new Object[]{userId, password},Integer.class);
            return count > 0;
        } catch(DataAccessException e) {
            log.error("로그인 조회 실패");
            return false;
        }
    }
}
