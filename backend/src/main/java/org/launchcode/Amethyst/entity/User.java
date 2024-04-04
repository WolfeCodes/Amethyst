package org.launchcode.Amethyst.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue
    private int id;
    private String username;
    private String password;
    private String role;
    //variables for created_at & modified_at
    @OneToMany
    @JoinColumn(name = "user_id")
    private List<Orders> orders;


    public User(int id, String username, String password, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
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
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }


}
