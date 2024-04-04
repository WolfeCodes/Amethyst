package org.launchcode.Amethyst.dto;

import java.util.ArrayList;
import java.util.List;

public class OrderDto {

    private int id;
    private int userId;
    private List<Integer> orderItemIds = new ArrayList<>();

    public OrderDto() {
    }

    public OrderDto(int id, int userId, List<Integer> orderItemIds) {
        this.id = id;
        this.userId = userId;
        this.orderItemIds = orderItemIds;
    }

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public List<Integer> getOrderItemIds() {
        return orderItemIds;
    }

    public void setOrderItemIds(List<Integer> orderItemIds) {
        this.orderItemIds = orderItemIds;
    }
}
