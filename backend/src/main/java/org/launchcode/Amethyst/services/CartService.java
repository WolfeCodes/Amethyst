package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.CartDto;

public interface CartService {

    CartDto createCart(CartDto cartDto);
    CartDto getCartById(int id);
    double getTotal(CartDto cartDto);
    CartDto emptyCart(CartDto cartDto);
}
