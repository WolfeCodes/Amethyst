package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.OrderItemsDto;

import java.util.List;

public interface OrderItemsService {

    OrderItemsDto createOrder_Items(OrderItemsDto order_ItemsDto);

    OrderItemsDto getOrder_ItemsById(int id);

    List<OrderItemsDto> getAllOrder_Items();

}
