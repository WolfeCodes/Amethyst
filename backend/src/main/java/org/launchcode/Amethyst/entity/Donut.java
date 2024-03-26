package org.launchcode.Amethyst.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
public class Donut {

    @Id
    @GeneratedValue
    private int id;
    private String name;
    private double price;
    private String description;
    private String imageUrl;
    private double rating;
    @ManyToMany(mappedBy = "donuts")
    @JsonIgnore
    private List<Cart> carts;
    public Donut(int id, String name, double price, String description, String imageUrl, double rating) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.rating = rating;
    }

    private Donut() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
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
        return getId() == donut.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
