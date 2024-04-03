package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.dto.CartItemDto;
import org.launchcode.Amethyst.entity.Cart;
import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.entity.User;
import org.launchcode.Amethyst.mapper.UserMapper;
import org.launchcode.Amethyst.models.data.CartRepository;
import org.launchcode.Amethyst.services.CartItemService;
import org.launchcode.Amethyst.services.CartService;
import org.launchcode.Amethyst.services.DonutService;
import org.launchcode.Amethyst.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private DonutService donutService;
    @Autowired
    private UserService userService;
    @Autowired
    private CartItemService cartItemService;

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

    @Override
    public double getTotal(CartDto cartDto) {
        double total = 0;
        Cart cart = toCart(cartDto);
        List<CartItem> cartItems = cart.getCartItems();
        for(CartItem cartItem: cartItems) {
            total += (cartItem.getDonut().getPrice() * cartItem.getQuantity());
        }
        return total;
    }

    @Override
    public CartDto emptyCart(CartDto cartDto) {
        Cart cart = toCart(cartDto);
//        List<CartItem> cartItems = cart.getCartItems();
//        for(CartItem cartItem: cartItems) {
//            cartItemService.deleteCartItem(cartItem.getId());
//        }
        List<CartItem> emptyCart = new ArrayList<>();
        cart.setCartItems(emptyCart);
        cartRepository.save(cart);
        return null;
    }


    CartDto toDto(Cart cart) {
        List<Integer> cartItemIds = cart.getCartItems().stream().map(CartItem::getId).toList();
        return new CartDto(cart.getId(), cart.getUser().getId(), cart.getTotal(), cartItemIds);
    }

    Cart toCart(CartDto cartDto) {
        User user = UserMapper.mapToUser(userService.getUserById(cartDto.getUserId()));
        List<CartItem> cartItems = cartItemService.findByIds(cartDto.getCartItemIds());
        return new Cart(cartDto.getId(), user, cartDto.getTotal(), cartItems);
    }


}
