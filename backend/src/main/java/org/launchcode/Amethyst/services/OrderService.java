package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.dto.OrderDto;

import java.util.List;

public interface OrderService {

    OrderDto createOrder(CartDto cartDto);

    List<OrderDto> getAllOrders();

    OrderDto getOrderById(int id);
    double getPriceOfOrder(OrderDto orderDto);
}
