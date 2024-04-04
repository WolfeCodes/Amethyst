package org.launchcode.Amethyst.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Orders {
    @GeneratedValue
    @Id
    private int id;
    @ManyToOne
    private User user;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "order_list", joinColumns = @JoinColumn(name = "order_id"), inverseJoinColumns = @JoinColumn(name = "orderItem_id"))
    private List<OrderItems> orderItems;

    public Orders() {
    }

    public Orders(int id, User user, List<OrderItems> orderItems) {
        this.id = id;
        this.user = user;
        this.orderItems = orderItems;
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

    public List<OrderItems> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItems> orderItems) {
        this.orderItems = orderItems;
    }
}

