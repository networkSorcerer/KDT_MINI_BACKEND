package com.mini.project.admin3.controller3;

import com.mini.project.admin3.dao3.AdminDAO3;
import com.mini.project.admin3.vo3.UserDAO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController3 {
    private final AdminDAO3 adminDAO3;
    //로그인
    @PostMapping("/login")
    public ResponseEntity<Boolean> logiin(@RequestBody UserDAO3 vo) {

        log.info("ID {}", vo.getUser_id());
        log.info("패스워드 {}", vo.getPassword());
        boolean isSuccess = adminDAO3.login(vo.getUser_id(),vo.getPassword());
        return ResponseEntity.ok(isSuccess);
    }
    // 관리자, 회원 관리, 리뷰, 상품 관리
}
