package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.Order_ItemsDto;
import org.launchcode.Amethyst.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/donuts")
public class Order_ItemsController {

    @Autowired
    private Order_ItemsService order_ItemServices;

    @PostMapping
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto){
        return new ResponseEntity<>(order_ItemsServices.createOrder_Items(userDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable int id){
        UserDto userDto = order_ItemServices.getOrder_ItemsById(id);
        return ResponseEntity.ok(userDto);
    }
    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> order_Items = order_ItemsServices.getAllUsers();
        return ResponseEntity.ok(order_Items);
    }

}
