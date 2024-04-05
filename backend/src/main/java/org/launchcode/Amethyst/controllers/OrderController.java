package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.OrderDto;
import org.launchcode.Amethyst.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    //Endpoint for all orders
    @GetMapping("/")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    //Endpoint for Price of an Order
    @GetMapping("/price/{orderId}")
    public ResponseEntity<Double> getOrderTotal(@PathVariable int orderId){
        OrderDto orderDto = orderService.getOrderById(orderId);
        return new ResponseEntity<>(orderService.getPriceOfOrder(orderDto), HttpStatus.CREATED);
    }
}
