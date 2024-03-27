package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity<CartDto> addCart(@RequestBody CartDto cartDto){
        return new ResponseEntity<>(cartService.createCart(cartDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartDto> getCartById(@PathVariable int id){
        CartDto cartDto = cartService.getCartById(id);
        return ResponseEntity.ok(cartDto);
    }

    @PutMapping("/{cartId}/donut/{donutId}")
    public ResponseEntity<CartDto> addDonutToCart(@PathVariable int cartId, @PathVariable Integer donutId){
        CartDto cartDto = cartService.getCartById(cartId);
        List<Integer> donutIds = new ArrayList<>(cartDto.getDonutIds());
        donutIds.add(donutId);
        cartDto.setDonutIds(donutIds);
        return new ResponseEntity<>(cartService.createCart(cartDto), HttpStatus.CREATED);
    }
}
