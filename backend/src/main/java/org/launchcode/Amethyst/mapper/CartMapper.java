package org.launchcode.Amethyst.mapper;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.entity.Cart;


import java.util.List;
import java.util.stream.Collectors;

public class CartMapper {


    public static Cart mapToCart(CartDto cartDto){
        System.out.println("mapping " + cartDto + " to cart");
        Cart cart = new Cart(
                cartDto.getId(),
                cartDto.getUser(),
                cartDto.getTotal(),
                cartDto.getDonuts().stream().map(DonutMapper::mapToDonut).collect(Collectors.toList())
        );

        return cart;
    }



    public static CartDto mapToCartDto(Cart cart){
        System.out.println("mapping " + cart + " to cartDto");
        CartDto cartDto = new CartDto(
                cart.getId(),
                cart.getUser(),
                cart.getTotal(),
                cart.getDonuts().stream().map(DonutMapper::mapToDonutDto).collect(Collectors.toList())
        );

        return cartDto;
    }

}
