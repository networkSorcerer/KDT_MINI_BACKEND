package com.mini.project.admin3.controller3;

import com.mini.project.admin3.dao3.AdminDAO3;
import com.mini.project.admin3.vo3.AdminVO3;
import com.mini.project.admin3.vo3.UserVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/auth")
@RequiredArgsConstructor
// 회원 사진? 그리고 회원 주소, 전화 번호
public class AuthController3 {
    private final AdminDAO3 adminDAO3;
    //로그인
    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody UserVO3 vo) {

        log.info("ID {}", vo.getUser_id());
        log.info("패스워드 {}", vo.getPassword());
        boolean isSuccess = adminDAO3.login(vo.getUser_id(),vo.getPassword());
        return ResponseEntity.ok(isSuccess);
    }
    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<Boolean> signup(@RequestBody UserVO3 vo){
        log.info("가입 {}",vo);
        boolean isSuccess = adminDAO3.signup(vo);
        return ResponseEntity.ok(isSuccess);
    }

}
