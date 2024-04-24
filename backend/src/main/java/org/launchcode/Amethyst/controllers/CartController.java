package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.dto.DonutDto;
import org.launchcode.Amethyst.dto.UserDto;
import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.entity.User;
import org.launchcode.Amethyst.mapper.DonutMapper;
import org.launchcode.Amethyst.mapper.UserMapper;
import org.launchcode.Amethyst.security.UserPrincipal;
import org.launchcode.Amethyst.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;

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
        CartDto cartDto = cartService.getCartById(cartId); //grabs the cartDto from cartId
        List<CartItem> cartItems= new ArrayList<>(); //initializes an empty ArrayList of cartItems
        cartItemService.findByIds(cartDto.getCartItemIds()).forEach(cartItems::add); //populates cartItems ArrayList
        if (cartItemService.isDuplicateDonut(cartItems, donutId)) {
            //isDuplicateDonut searches each cart item for a matching donutId
            //if matching donutId to cartItem, increase cartItem quantity by 1
            //isDuplicateDonut returns true
            return new ResponseEntity<>(cartService.createCart(cartDto), HttpStatus.CREATED);
        } else {
            //isDuplicateDonut returns false and the cartItem is created and added to the cart
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
    }

    @GetMapping("/{cartId}/total")
    public ResponseEntity<Double> getCartTotal(@PathVariable int cartId){
        //Grab a cart by id
        CartDto cartDto = cartService.getCartById(cartId);
        //Call a CartService method to calculate the total given a cartDto
        return new ResponseEntity<>(cartService.getTotal(cartDto), HttpStatus.CREATED);
    }

    @GetMapping("/{cartId}/totalQuantity")
    public ResponseEntity<Integer> getTotalQuantity(@PathVariable int cartId){
        //Grab a cart by id
        CartDto cartDto = cartService.getCartById(cartId);
        // Call a CartItemService method to calculate the total quantity given a cartDto
        int totalQuantity = cartService.getTotalQuantity(cartDto);
        // Return the total quantity in the response entity
        return new ResponseEntity<>(totalQuantity, HttpStatus.OK);
    }

    @GetMapping("/{cartId}/checkout")
    public ResponseEntity<CartDto> checkoutCart(@PathVariable int cartId){
        //grab a cart by id
        CartDto cartDto = cartService.getCartById(cartId);
        //call an OrderService method to save the order
        orderService.createOrder(cartDto);
        //Call cartService method to set List<CartItem> to empty
        cartService.emptyCart(cartDto);
        return new ResponseEntity<>(cartService.emptyCart(cartDto), HttpStatus.CREATED);
    }

    @GetMapping("/cartId")
    public ResponseEntity<Integer> getCartIdByUserId(@AuthenticationPrincipal UserPrincipal userPrincipal){
        //takes in the User Information encoded in JWT
        UserDto userDto = userService.getUserById(userPrincipal.getUserId()); //uses userId from JWT to find user by id
        return new ResponseEntity<>(cartService.getCartIdByUserId(userDto.getId()), HttpStatus.CREATED); //returns cartId
    }
}
