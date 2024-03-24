package org.launchcode.Amethyst.dto;

import org.launchcode.Amethyst.entity.User;

import java.util.List;

public class CartDto {

    private int id;

    private int userId;
    private double total;
    private List<Integer> donutIds;


    public CartDto() {
    }


    public CartDto(int id, int userId, double total, List<Integer> donutIds) {
        this.id = id;
        this.userId = userId;
        this.total = total;
        this.donutIds = donutIds;
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

    public List<Integer> getDonutIds() {
        return donutIds;
    }

    public void setDonutIds(List<Integer> donutIds) {
        this.donutIds = donutIds;

    }
}
