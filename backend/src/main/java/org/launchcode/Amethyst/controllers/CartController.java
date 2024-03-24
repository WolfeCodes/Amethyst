package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.entity.Cart;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.entity.User;
import org.launchcode.Amethyst.mapper.DonutMapper;
import org.launchcode.Amethyst.mapper.UserMapper;
import org.launchcode.Amethyst.services.DonutService;
import org.launchcode.Amethyst.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private DonutService donutService;
    @Autowired
    private UserService userService;

    CartDto toDto(Cart cart) {
        List<Integer> donutIds = cart.getDonuts().stream().map(Donut::getId).toList();
        return new CartDto(cart.getId(), cart.getUser().getId(), cart.getTotal(), donutIds);
    }

    Cart toCart(CartDto cartDto) {
        User user = UserMapper.mapToUser(userService.getUserById(cartDto.getId()));
        List<Donut> donuts = donutService.findByIds(cartDto.getDonutIds());
        return new Cart(cartDto.getId(), user, cartDto.getTotal(), donuts);
    }
}
