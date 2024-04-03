package org.launchcode.Amethyst.dto;

import org.launchcode.Amethyst.entity.User;

import java.util.ArrayList;
import java.util.List;

public class CartDto {

    private int id;
    private int userId;
    private double total; //might not need this in the future
    private List<Integer> cartItemIds = new ArrayList<>();


    public CartDto() {
    }

    public CartDto(int id, int userId, double total, List<Integer> cartItemIds) {
        this.id = id;
        this.userId = userId;
        this.total = total;
        this.cartItemIds = cartItemIds;
    }

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;

    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }


    public List<Integer> getCartItemIds() {
        return cartItemIds;
    }

    public void setCartItemIds(List<Integer> cartItemIds) {
        this.cartItemIds = cartItemIds;
    }
}
