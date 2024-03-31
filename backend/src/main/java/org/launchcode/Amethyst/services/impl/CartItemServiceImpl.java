package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.models.data.CartItemRepository;
import org.launchcode.Amethyst.services.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public List<CartItem> findByIds(List<Integer> cartItemIds) {
        List<CartItem> cartItems = new ArrayList<>();
        cartItemRepository.findAllById(cartItemIds).forEach(cartItems::add);
        return cartItems;
    }
}
