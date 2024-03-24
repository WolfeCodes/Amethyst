package org.launchcode.Amethyst.mapper;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.entity.Cart;
import org.launchcode.Amethyst.services.DonutService;
import org.launchcode.Amethyst.services.UserService;


import java.util.List;
import java.util.stream.Collectors;

public class CartMapper {

    DonutService donutService;

//    public static Cart mapToCart(CartDto cartDto){
//        //System.out.println("mapping " + cartDto + " to cart");
//        Cart cart = new Cart(
//                cartDto.getId(),
//                cartDto.getUserId(),
//                cartDto.getTotal(),
//                cartDto.getDonutIds()
//        );
//
//        return cart;
//    }



//    public static CartDto mapToCartDto(Cart cart){
//        //System.out.println("mapping " + cart + " to cartDto");
//        CartDto cartDto = new CartDto(
//                cart.getId(),
//                cart.getUser(),
//                cart.getTotal(),
//                cart.getDonuts().stream().map(DonutMapper::mapToDonutDto).collect(Collectors.toList())
//        );
//
//        return cartDto;
//    }

}
