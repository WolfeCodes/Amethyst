package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.OrderItemsDto;
import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.entity.OrderItems;

import java.util.List;

public interface OrderItemsService {

    OrderItemsDto createOrderItems(OrderItemsDto orderItemsDto);

    OrderItemsDto getOrderItemsById(int id);

    List<OrderItemsDto> getAllOrderItems();

    List<OrderItems> convertToOrderItems(List<CartItem> cartItems);

    OrderItems cartItemToOrderItems(CartItem cartItem);

    double getTotal(OrderItemsDto orderItemsDto);
}
