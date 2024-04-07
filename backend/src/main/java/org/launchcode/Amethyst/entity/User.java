package org.launchcode.Amethyst.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class User {
    @Id
    @GeneratedValue
    private int id;
    private String username;

    private String email;
//    private String telephone;
    private String pwHash;
    private String role;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    //variables for created_at & modified_at
    @OneToMany
    @JoinColumn(name = "user_id")
    private List<Orders> orders;


    public User(int id, String username, String password, String role,String email) {
        this.id = id;
        this.username = username;
        this.email=email;
//        this.telephone=telephone;
        this.pwHash = encoder.encode(password);
        this.role = role;
    }

    public User() {
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return pwHash;
    }

    public void setPassword(String password) {
        this.pwHash = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

//    public String getTelephone() {
//        return telephone;
//    }
//
//    public void setTelephone(String telephone) {
//        this.telephone = telephone;
//    }
}
