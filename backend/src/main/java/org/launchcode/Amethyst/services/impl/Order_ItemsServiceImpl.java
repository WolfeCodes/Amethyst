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
    private Order_ItemsRepository orderItemsRepository;

    @Override
    public Order_ItemsDto createOrder_ItemsById(Order_ItemsDto order_ItemsDto){
        Order_Items orderItems = Order_ItemsMapper.mapToOrder_Items(order_ItemsDto);
        Order_Items savedOrder_Items = Order_ItemsRepository.save(orderItems);
        return Order_ItemsMapper.mapToOrder_ItemsDTO(savedOrder_Items);
    }
    @Override
    public Order_ItemsDto getOrder_ItemsById(int id) {
        Order_Items orderItems = Order_ItemsRepository.findById(id).orElseThrow(()
                                -> new RuntimeException("Order does not exist"));
        return Order_ItemsMapper.mapToOrder_ItemsDTO(orderItems);
    }

    @Override
    public List<Order_ItemsDto> getAllDonuts() {
        List<Order_Items> donuts = new ArrayList<>();
        Order_ItemsRepository.findAll().forEach(donuts::add);
        return donuts.stream().map(Order_ItemsMapper::mapToOrder_ItemsDTO).collect(Collectors.toList());
    }

}
