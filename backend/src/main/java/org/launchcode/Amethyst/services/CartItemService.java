package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.CartItemDto;
import org.launchcode.Amethyst.entity.CartItem;

import java.util.List;

public interface CartItemService {

    List<CartItem> findByIds(List<Integer> cartItemIds);

    CartItem createCartItem(CartItem cartItem);

    CartItemDto findById(int id);
}
