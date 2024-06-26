package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.CartItemDto;
import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.entity.OrderItems;

import java.util.List;

public interface CartItemService {

    List<CartItem> findByIds(List<Integer> cartItemIds);

    CartItem createCartItem(CartItem cartItem);

    CartItemDto getCartItemById(int id);

    CartItem toCartItem(CartItemDto cartItemDto);
    Boolean isDuplicateDonut(List<CartItem> cartItems, int donutId);

    void deleteCartItem(int id);
}
