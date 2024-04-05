package org.launchcode.Amethyst.dto;

public class UserDto {
    private int id;
    private String username;

    private String email;
    private String telephone;
    private String password;
    private String role;

    public UserDto() {
    }

    public UserDto(int id, String username, String password, String role,String email, String telephone) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email=email;
        this.telephone=telephone;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
}
