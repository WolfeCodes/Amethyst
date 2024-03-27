package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.Order_ItemsDto;
import org.launchcode.Amethyst.services.Order_ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

;

@CrossOrigin("*")
@RestController
//@RequestMapping("/api/donuts")
public class Order_ItemsController {

    @Autowired
    private Order_ItemsService order_ItemsServices;

    @PostMapping
    public ResponseEntity<Order_ItemsDto> addUser(@RequestBody Order_ItemsDto order_ItemsDto){
        return new ResponseEntity<>(order_ItemsServices.createOrder_Items(order_ItemsDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order_ItemsDto> getOrder_ItemsById(@PathVariable int id){
        Order_ItemsDto order_ItemsDto = order_ItemsServices.getOrder_ItemsById(id);
        return ResponseEntity.ok(order_ItemsDto);
    }
    @GetMapping("/")
    public ResponseEntity<List<Order_ItemsDto>> getAllUsers(){
        List<Order_ItemsDto> order_Items = order_ItemsServices.getAllOrder_Items();
        return ResponseEntity.ok(order_Items);
    }

}
