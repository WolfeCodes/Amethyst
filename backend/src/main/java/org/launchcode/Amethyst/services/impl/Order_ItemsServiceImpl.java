package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.Order_ItemsDto;
import org.launchcode.Amethyst.entity.Order_Items;
import org.launchcode.Amethyst.mapper.Order_ItemsMapper;
import org.launchcode.Amethyst.models.data.Order_ItemsRepository;
import org.launchcode.Amethyst.services.Order_ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class Order_ItemsServiceImpl implements Order_ItemsService {

    @Autowired
    private Order_ItemsRepository order_ItemsRepository;

    @Override
    public Order_ItemsDto createOrder_Items(Order_ItemsDto order_ItemsDto){
        Order_Items order_Items = Order_ItemsMapper.mapToOrder_Items(order_ItemsDto);
        Order_Items savedOrder_Items = order_ItemsRepository.save(order_Items);
        return Order_ItemsMapper.mapToOrder_ItemsDTO(savedOrder_Items);
    }
    @Override
    public Order_ItemsDto getOrder_ItemsById(int id) {
        Order_Items order_Items = order_ItemsRepository.findById(id).orElseThrow(()
                                -> new RuntimeException("Order does not exist"));
        return Order_ItemsMapper.mapToOrder_ItemsDTO(order_Items);
    }

    @Override
    public List<Order_ItemsDto> getAllOrder_Items() {
        List<Order_Items> order_Items = new ArrayList<>();
        order_ItemsRepository.findAll().forEach(order_Items::add);
        return order_Items.stream().map(Order_ItemsMapper::mapToOrder_ItemsDTO)
                .collect(Collectors.toList());
    }

}
