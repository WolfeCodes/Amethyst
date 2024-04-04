package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.dto.OrderDto;

public interface OrderService {

    OrderDto createOrder(CartDto cartDto);
}
