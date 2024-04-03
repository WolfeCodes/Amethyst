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
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "cart_list", joinColumns = @JoinColumn(name = "cart_id"), inverseJoinColumns = @JoinColumn(name = "cartItem_Id"))
    private List<CartItem> cartItems = new ArrayList<>();

    public Cart() {
    }

    public Cart(int id, User user, double total, List<CartItem> cartItems) {
        this.id = id;
        this.user = user;
        this.total = total;
        this.cartItems = cartItems;
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

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }
}
