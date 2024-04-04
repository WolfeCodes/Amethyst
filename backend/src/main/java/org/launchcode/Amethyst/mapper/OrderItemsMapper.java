package org.launchcode.Amethyst.mapper;

import org.launchcode.Amethyst.dto.OrderItemsDto;
import org.launchcode.Amethyst.entity.OrderItems;

public class OrderItemsMapper {

    public static OrderItems mapToOrder_Items(OrderItemsDto orderItemsDTO){
        return new OrderItems(
                orderItemsDTO.getId(),
                orderItemsDTO.getDonutId(),
                orderItemsDTO.getQuantity()
        );
    }

    public static OrderItemsDto mapToOrder_ItemsDTO(OrderItems orderItems){
        return new OrderItemsDto(
                orderItems.getId(),
                orderItems.getDonutId(),
                orderItems.getQuantity()
        );
    }
}
