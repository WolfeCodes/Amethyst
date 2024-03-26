package org.launchcode.Amethyst.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
public class Order_Items {

    @Id
    @GeneratedValue
    private int id;
    private int order_id;
    private int donut_id;

    @CreationTimestamp
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp modified_at;

    public Order_Items(int id, int order_id, int donut_id, Timestamp created_at, Timestamp modified_at){
        this.id = id;
        this.order_id = order_id;
        this.donut_id = donut_id;
        this.created_at = created_at;
        this.modified_at = modified_at;
    }

    public int getId() { return  id; }

    public int getOrder_id() { return order_id; }

    public int getDonut_id() { return donut_id; }

    public Timestamp getCreated_at() { return created_at; }

    public Timestamp getModified_at() { return  modified_at; }

    public void setOrder_id(int order_id) { this.order_id = order_id; }

    public void setDonut_id(int donut_id) { this.order_id = donut_id; }

    public void setCreated_at(Timestamp created_at) { this.created_at = created_at; }

    public void setModified_at(Timestamp Modified_at) { this.created_at = Modified_at; }
}

