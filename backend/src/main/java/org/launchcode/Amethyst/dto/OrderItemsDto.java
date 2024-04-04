package org.launchcode.Amethyst.dto;

public class OrderItemsDto {

    private  int id;
    private int donutId;
    private int quantity;

//    @CreationTimestamp
//    private Timestamp created_at;
//
//    @UpdateTimestamp
//    private Timestamp modified_at;


    public OrderItemsDto(int id, int donutId, int quantity){
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
}
