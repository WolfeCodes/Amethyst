package org.launchcode.Amethyst.dto;

import org.launchcode.Amethyst.entity.Cart;
import org.launchcode.Amethyst.entity.Donut;

public class CartItemDto {

    private int id;
    private Cart cart;
    private Donut donut;
    private int quantity;

    public CartItemDto() {
    }

    public CartItemDto(int id, Cart cart, Donut donut, int quantity) {
        this.id = id;
        this.cart = cart;
        this.donut = donut;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
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

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}
