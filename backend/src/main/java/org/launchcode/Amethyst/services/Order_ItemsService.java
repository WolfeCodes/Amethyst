package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.Order_ItemsDto;

import java.util.List;

public interface Order_ItemsService {

    Order_ItemsDto createOrder_Items(Order_ItemsDto order_ItemsDto);

    Order_ItemsDto getOrder_ItemsById(int id);

    List<Order_ItemsDto> getAllOrder_Items();

}
