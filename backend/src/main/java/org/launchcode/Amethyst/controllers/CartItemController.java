package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.CartItemDto;
import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.services.CartItemService;
import org.launchcode.Amethyst.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cartItem/")
public class CartItemController {
    @Autowired
    CartItemService cartItemService;
    @Autowired
    CartService cartService;

    @GetMapping("{id}")
    public ResponseEntity<CartItemDto> getCartItemById(@PathVariable int id){
        CartItemDto cartItemDto = cartItemService.getCartItemById(id);
        return ResponseEntity.ok(cartItemDto);
    }

    @PutMapping("{cartItemId}/quantity/{quantity}")
    public ResponseEntity<CartItemDto> updateQuantity(@PathVariable int cartItemId, @PathVariable int quantity) {
        CartItemDto cartItemDto = cartItemService.getCartItemById(cartItemId); //initializes a CartItemDto from cartItemId
        cartItemDto.setQuantity(quantity); //sets the quantity of the CartItemDto
        CartItem savedCartItem = cartItemService.toCartItem(cartItemDto); //Create CartItem entity from CartItemDto
        cartItemService.createCartItem(savedCartItem); //Save CartItem entity record
        return new ResponseEntity<>(cartItemDto, HttpStatus.CREATED); //return updated
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable("id") int cartItemId) {
        //CartItem must be removed from its associated Cart before deletion
        cartService.removeSingleItemFromCart(cartItemId); //removes the CartItem from Cart
        cartItemService.deleteCartItem(cartItemId); //deletes the CartItem record
        return ResponseEntity.ok("Cart Item Deleted");
    }

}
