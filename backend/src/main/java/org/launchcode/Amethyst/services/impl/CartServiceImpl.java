package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.entity.Cart;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.entity.User;
import org.launchcode.Amethyst.mapper.UserMapper;
import org.launchcode.Amethyst.models.data.CartRepository;
import org.launchcode.Amethyst.services.CartService;
import org.launchcode.Amethyst.services.DonutService;
import org.launchcode.Amethyst.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private DonutService donutService;
    @Autowired
    private UserService userService;

    @Override
    public CartDto createCart(CartDto cartDto) {
        Cart cart= toCart(cartDto);
        Cart savedCart = cartRepository.save(cart);
        return toDto(savedCart);
    }

    @Override
    public CartDto getCartById(int id) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart does not exist"));
        return toDto(cart);
    }

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
