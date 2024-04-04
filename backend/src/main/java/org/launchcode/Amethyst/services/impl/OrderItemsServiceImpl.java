package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.OrderItemsDto;
import org.launchcode.Amethyst.entity.OrderItems;
import org.launchcode.Amethyst.mapper.OrderItemsMapper;
import org.launchcode.Amethyst.models.data.Order_ItemsRepository;
import org.launchcode.Amethyst.services.OrderItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderItemsServiceImpl implements OrderItemsService {

    @Autowired
    private Order_ItemsRepository order_ItemsRepository;

    @Override
    public OrderItemsDto createOrder_Items(OrderItemsDto orderItemsDto){
        OrderItems orderItems = OrderItemsMapper.mapToOrder_Items(orderItemsDto);
        OrderItems savedOrderItems = order_ItemsRepository.save(orderItems);
        return OrderItemsMapper.mapToOrder_ItemsDTO(savedOrderItems);
    }
    @Override
    public OrderItemsDto getOrder_ItemsById(int id) {
        OrderItems orderItems = order_ItemsRepository.findById(id).orElseThrow(()
                                -> new RuntimeException("Order does not exist"));
        return OrderItemsMapper.mapToOrder_ItemsDTO(orderItems);
    }

    @Override
    public List<OrderItemsDto> getAllOrder_Items() {
        List<OrderItems> order_Items = new ArrayList<>();
        order_ItemsRepository.findAll().forEach(order_Items::add);
        return order_Items.stream().map(OrderItemsMapper::mapToOrder_ItemsDTO)
                .collect(Collectors.toList());
    }

}
