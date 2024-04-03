package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.dto.DonutDto;
import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.mapper.DonutMapper;
import org.launchcode.Amethyst.services.CartItemService;
import org.launchcode.Amethyst.services.CartService;
import org.launchcode.Amethyst.services.DonutService;
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

    @Autowired
    private DonutService donutService;

    @Autowired
    private CartItemService cartItemService;

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
        //get donut object
        DonutDto donutDto = donutService.getDonutById(donutId);
        //initialize CartItem(donut, 1)
        CartItem cartItem = new CartItem();
        cartItem.setDonut(DonutMapper.mapToDonut(donutDto));
        cartItem.setQuantity(1);
        cartItemService.createCartItem(cartItem);
        List<Integer> cartItemIds = new ArrayList<>(cartDto.getCartItemIds());
        cartItemIds.add(cartItem.getId());
        cartDto.setCartItemIds(cartItemIds);
        return new ResponseEntity<>(cartService.createCart(cartDto), HttpStatus.CREATED);
    }

    @GetMapping("/{cartId}/total")
    public ResponseEntity<Double> getCartTotal(@PathVariable int cartId){
        //Grab a cart by id
        CartDto cartDto = cartService.getCartById(cartId);
        //Call a CartService method to calculate the total given a cartDto
        return new ResponseEntity<>(cartService.getTotal(cartDto), HttpStatus.CREATED);
    }

    @GetMapping("/{cartId}/checkout")
    public ResponseEntity<CartDto> checkoutCart(@PathVariable int cartId){
        //grab a cart by id
        CartDto cartDto = cartService.getCartById(cartId);
        //Call cartService
        cartService.emptyCart(cartDto);
        return new ResponseEntity<>(cartService.emptyCart(cartDto), HttpStatus.CREATED);
    }
}
