package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.entity.Cart;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.entity.User;
import org.launchcode.Amethyst.mapper.DonutMapper;
import org.launchcode.Amethyst.mapper.UserMapper;
import org.launchcode.Amethyst.services.CartService;
import org.launchcode.Amethyst.services.DonutService;
import org.launchcode.Amethyst.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    public ResponseEntity<CartDto> addCart(@RequestBody CartDto cartDto){

    }
}
