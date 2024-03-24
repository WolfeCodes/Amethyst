package org.launchcode.Amethyst.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Cart {

    @GeneratedValue
    @Id
    private int id;
    @OneToOne
    private User user;
    private double total;
    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "cart_id")
    private List<Donut> donuts = new ArrayList<>();

    public Cart() {
    }

    public Cart(int id, User user, double total, List<Donut> donuts) {
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

    public List<Donut> getDonuts() {
        return donuts;
    }
}
