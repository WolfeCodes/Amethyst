package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.entity.Cart;
import org.launchcode.Amethyst.entity.CartItem;

import java.util.List;

public interface CartService {

    CartDto createCart(CartDto cartDto);
    CartDto getCartById(int id);
    List<Cart> getAllCarts();
    double getTotal(CartDto cartDto);
    CartDto emptyCart(CartDto cartDto);
    List<CartItem> getCartItems(CartDto cartDto);
    List<CartItem> lookForDonut(int donutId);
    void removeFromCart(List<CartItem> cartItemsToRemove);
    int getCartIdByUserId(int userId);
}
