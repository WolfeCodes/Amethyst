package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.entity.CartItem;

import java.util.List;

public interface CartService {

    CartDto createCart(CartDto cartDto);
    CartDto getCartById(int id);
    double getTotal(CartDto cartDto);
    CartDto emptyCart(CartDto cartDto);
    List<CartItem> getCartItems(CartDto cartDto);
    int getCartIdByUserId(int userId);
}
