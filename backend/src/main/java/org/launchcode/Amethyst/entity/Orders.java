package org.launchcode.Amethyst.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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

    private LocalDateTime createTime;

    public Orders() {
    }

    public Orders(int id, User user, List<OrderItems> orderItems, LocalDateTime creationTime) {
        this.id = id;
        this.user = user;
        this.orderItems = orderItems;
        this.createTime=creationTime;
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

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

}

