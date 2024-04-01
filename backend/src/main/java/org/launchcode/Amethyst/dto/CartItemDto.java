package org.launchcode.Amethyst.dto;

import org.launchcode.Amethyst.entity.Cart;
import org.launchcode.Amethyst.entity.Donut;
//TODO Refactor to send DonutIds and Quantity
public class CartItemDto {

    private int id;
    private int donutId;
    private int quantity;


    public CartItemDto() {
    }

    public CartItemDto(int id, int donutId, int quantity) {
        this.id = id;
        this.donutId = donutId;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public int getDonutId() {
        return donutId;
    }

    public void setDonutId(int donutId) {
        this.donutId = donutId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
