package org.launchcode.Amethyst.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Donut {

    @Id
    @GeneratedValue
    private int id;

    private String name;

    private double price;

    public Donut(int id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public Donut() {
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Donut donut = (Donut) o;
        return getId() == donut.getId() && Double.compare(getPrice(), donut.getPrice()) == 0 && Objects.equals(getName(), donut.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getPrice());
    }
}
