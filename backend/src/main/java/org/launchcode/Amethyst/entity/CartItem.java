package org.launchcode.Amethyst.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.sql.Time;
import java.util.List;


@Entity
public class CartItem{

    @GeneratedValue
    @Id
    private int id;
    @ManyToOne
    private Donut donut;
    private int quantity;

    @ManyToMany(mappedBy = "cartItems")
    @JsonIgnore
    private List<Cart> carts;


    public CartItem() {
        super();
    }

    public CartItem(int id, Donut donut, int quantity) {
        this.id = id;
        this.donut = donut;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Donut getDonut() {
        return donut;
    }

    public void setDonut(Donut donut) {
        this.donut = donut;
    }
}
