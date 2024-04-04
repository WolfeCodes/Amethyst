package org.launchcode.Amethyst.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.sql.Timestamp;

@Entity
public class OrderItems {


    @GeneratedValue
    @Id
    private int id;
    private int donutId;
    private int quantity;

    @CreationTimestamp
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp modified_at;

    public OrderItems(int id, int donutId, int quantity){
        this.id = id;
        this.donutId = donutId;
        this.quantity = quantity;
    }

    public int getId() { return  id; }

    public int getDonutId() { return donutId; }

    public void setDonutId(int donutId) {
        this.donutId = donutId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Timestamp getCreated_at() { return created_at; }

    public Timestamp getModified_at() { return  modified_at; }

    public void setCreated_at(Timestamp created_at) { this.created_at = created_at; }

    public void setModified_at(Timestamp Modified_at) { this.created_at = Modified_at; }
}

