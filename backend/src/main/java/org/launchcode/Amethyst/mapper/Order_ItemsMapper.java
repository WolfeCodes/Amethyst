package org.launchcode.Amethyst.mapper;

import org.launchcode.Amethyst.dto.Order_ItemsDto;
import org.launchcode.Amethyst.entity.Order_Items;

public class Order_ItemsMapper {

    public static Order_Items mapToOrder_Items(Order_ItemsDto orderItemsDTO){
        return new Order_Items(
                orderItemsDTO.getId(),
                orderItemsDTO.getOrder_id(),
                orderItemsDTO.getDonut_id(),
                orderItemsDTO.getCreated_at(),
                orderItemsDTO.getModified_at()
        );
    }

    public static Order_ItemsDto mapToOrder_ItemsDTO(Order_Items orderItems){
        return new Order_ItemsDto(
                orderItems.getId(),
                orderItems.getOrder_id(),
                orderItems.getDonut_id(),
                orderItems.getCreated_at(),
                orderItems.getModified_at()
        );
    }
}
