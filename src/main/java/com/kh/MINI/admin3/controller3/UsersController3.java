package com.kh.MINI.admin3.controller3;

import com.kh.MINI.admin3.dao3.UsersDAO3;
import com.kh.MINI.admin3.vo3.UserVO3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController3 {
    private final UsersDAO3 usersDAO3;

    // 유저 리스트 조회
    @GetMapping("/list")
    public Map<String, Object> userList (@RequestParam Map<String, Object> paramMap ) {
        Map<String, Object> resultMap = new HashMap<>();


        int currentPage = Integer.parseInt((String)paramMap.get("currentPage"));	// 현재 페이지 번호
        int pageSize = Integer.parseInt((String)paramMap.get("pageSize"));			// 페이지 사이즈
        int pageIndex = (currentPage-1)*pageSize;												// 페이지 시작 row 번호

        paramMap.put("pageIndex", pageIndex);
        paramMap.put("pageSize", pageSize);

        int totalCount = usersDAO3.totalCount(paramMap);
        List<UserVO3> userList = usersDAO3.userList(paramMap);
        System.out.println(paramMap);
        System.out.printf("커런트 페이지 : %d ", currentPage);
        System.out.printf("페이지 사이즈 : %d ", pageSize);
        System.out.printf("총 회원 수 : %d ", totalCount);
        System.out.println(paramMap);
        resultMap.put("userList", userList);
        resultMap.put("cpage", currentPage);
        resultMap.put("pageSize", pageSize);
        resultMap.put("totalCount", totalCount);

        return resultMap;
    }

    // 유저 권한 조회
    @GetMapping("/role")
    public Map<String, Object> roleList() {
        Map<String, Object> resultMap = new HashMap<>();
        List<UserVO3> roleList = usersDAO3.roleList();
        resultMap.put("roleList",roleList);
        return resultMap;
    }

}
