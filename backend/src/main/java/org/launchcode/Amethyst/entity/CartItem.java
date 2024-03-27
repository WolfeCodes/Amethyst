package org.launchcode.Amethyst.entity;

import jakarta.persistence.*;

import java.sql.Time;

//@Entity
public class CartItem {

    @GeneratedValue
    @Id
    private int id;
    @ManyToOne
    private Cart cart;
    @OneToOne
    private Donut donut;
    private int quantity;

    public CartItem() {
    }

    public CartItem(int id, Cart cart, Donut donut, int quantity) {
        this.id = id;
        this.cart = cart;
        this.donut = donut;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Donut getDonut() {
        return donut;
    }

    public void setDonut(Donut donut) {
        this.donut = donut;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
