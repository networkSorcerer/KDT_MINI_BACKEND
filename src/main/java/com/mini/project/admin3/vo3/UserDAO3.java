package com.mini.project.admin3.vo3;


import lombok.*;

import java.sql.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDAO3 {
    private String user_id;
    private String username;
    private String password;
    private String email;
    private int role;
    private Date create_at;
}
