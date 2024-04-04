package org.launchcode.Amethyst.controllers;

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
public class Order_ItemsController {

    @Autowired
    private OrderItemsService order_ItemsServices;

    @PostMapping
    public ResponseEntity<OrderItemsDto> addUser(@RequestBody OrderItemsDto orderItemsDto){
        return new ResponseEntity<>(order_ItemsServices.createOrder_Items(orderItemsDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItemsDto> getOrder_ItemsById(@PathVariable int id){
        OrderItemsDto order_ItemsDto = order_ItemsServices.getOrder_ItemsById(id);
        return ResponseEntity.ok(order_ItemsDto);
    }
    @GetMapping("/")
    public ResponseEntity<List<OrderItemsDto>> getAllUsers(){
        List<OrderItemsDto> order_Items = order_ItemsServices.getAllOrder_Items();
        return ResponseEntity.ok(order_Items);
    }

}
