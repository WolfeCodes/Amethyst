package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.CartItemDto;
import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.mapper.DonutMapper;
import org.launchcode.Amethyst.models.data.CartItemRepository;
import org.launchcode.Amethyst.models.data.DonutRepository;
import org.launchcode.Amethyst.services.CartItemService;
import org.launchcode.Amethyst.services.DonutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private DonutService donutService;

    @Override
    public List<CartItem> findByIds(List<Integer> cartItemIds) {
        List<CartItem> cartItems = new ArrayList<>();
        cartItemRepository.findAllById(cartItemIds).forEach(cartItems::add);
        return cartItems;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItemDto getCartItemById(int id) {
        CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("CartItem does not exist"));
        return toDto(cartItem);
    }

    CartItemDto toDto(CartItem cartItem) {
        return new CartItemDto(cartItem.getId(), cartItem.getDonut().getId(), cartItem.getQuantity());
    }

    @Override
    public CartItem toCartItem(CartItemDto cartItemDto) {
        Donut donut = DonutMapper.mapToDonut(donutService.getDonutById(cartItemDto.getDonutId()));
        return new CartItem(cartItemDto.getId(), donut, cartItemDto.getQuantity());
    }
}
