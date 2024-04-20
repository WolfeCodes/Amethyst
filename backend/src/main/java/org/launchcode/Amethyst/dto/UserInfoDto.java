package org.launchcode.Amethyst.dto;

public class UserInfoDto {

    private int userId;
    private int cartId;
    private String role;

    public UserInfoDto() {
    }

    public UserInfoDto(int userId, int cartId, String role) {
        this.userId = userId;
        this.cartId = cartId;
        this.role = role;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCartId() {
        return cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
