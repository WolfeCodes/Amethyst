package org.launchcode.Amethyst.dto;

import org.launchcode.Amethyst.entity.User;

import java.util.List;

public class CartDto {

    private int id;
    private User user;
    private double total;
    private List<DonutDto> donuts;

    public CartDto() {
    }

    public CartDto(int id, User user, double total, List<DonutDto> donuts) {
        this.id = id;
        this.user = user;
        this.total = total;
        this.donuts = donuts;
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public List<DonutDto> getDonuts() {
        return donuts;
    }

    public void setDonuts(List<DonutDto> donuts) {
        this.donuts = donuts;
    }
}
