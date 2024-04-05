package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.CartItemDto;
import org.launchcode.Amethyst.dto.OrderItemsDto;
import org.launchcode.Amethyst.services.OrderItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/orderItems") //changed endpoint because it originally mapped to donuts
public class OrderItemsController {

    @Autowired
    private OrderItemsService orderItemsServices;

    @PostMapping
    public ResponseEntity<OrderItemsDto> addUser(@RequestBody OrderItemsDto orderItemsDto){
        return new ResponseEntity<>(orderItemsServices.createOrderItems(orderItemsDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItemsDto> getOrder_ItemsById(@PathVariable int id){
        OrderItemsDto order_ItemsDto = orderItemsServices.getOrderItemsById(id);
        return ResponseEntity.ok(order_ItemsDto);
    }
    @GetMapping("/")
    public ResponseEntity<List<OrderItemsDto>> getAllOrderItems(){
        List<OrderItemsDto> order_Items = orderItemsServices.getAllOrderItems();
        return ResponseEntity.ok(order_Items);
    }

    @GetMapping("/price/{orderItemsId}")
    public ResponseEntity<Double> getTotal(@PathVariable int orderItemsId){
        OrderItemsDto orderItemsDto = orderItemsServices.getOrderItemsById(orderItemsId);
        return new ResponseEntity<>(orderItemsServices.getTotal(orderItemsDto), HttpStatus.CREATED);
    }

}
