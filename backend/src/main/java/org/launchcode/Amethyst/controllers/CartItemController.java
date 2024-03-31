package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.CartItemDto;
import org.launchcode.Amethyst.services.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cartItem/")
public class CartItemController {

    @Autowired
    CartItemService cartItemService;

    @GetMapping("{id}")
    public ResponseEntity<CartItemDto> getCartItemById(@PathVariable int id){
        CartItemDto cartItemDto = cartItemService.getCartItemById(id);
        return ResponseEntity.ok(cartItemDto);
    }

}
