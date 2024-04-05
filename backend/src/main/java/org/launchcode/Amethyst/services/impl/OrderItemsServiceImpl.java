package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.OrderItemsDto;
import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.entity.OrderItems;
import org.launchcode.Amethyst.mapper.OrderItemsMapper;
import org.launchcode.Amethyst.models.data.OrderItemsRepository;
import org.launchcode.Amethyst.services.DonutService;
import org.launchcode.Amethyst.services.OrderItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderItemsServiceImpl implements OrderItemsService {

    @Autowired
    private OrderItemsRepository orderItemsRepository;
    @Autowired
    private DonutService donutService;

    @Override
    public OrderItemsDto createOrderItems(OrderItemsDto orderItemsDto){
        OrderItems orderItems = OrderItemsMapper.mapToOrder_Items(orderItemsDto);
        OrderItems savedOrderItems = orderItemsRepository.save(orderItems);
        return OrderItemsMapper.mapToOrder_ItemsDTO(savedOrderItems);
    }
    @Override
    public OrderItemsDto getOrderItemsById(int id) {
        OrderItems orderItems = orderItemsRepository.findById(id).orElseThrow(()
                                -> new RuntimeException("Order does not exist"));
        return OrderItemsMapper.mapToOrder_ItemsDTO(orderItems);
    }

    @Override
    public List<OrderItemsDto> getAllOrderItems() {
        List<OrderItems> order_Items = new ArrayList<>();
        orderItemsRepository.findAll().forEach(order_Items::add);
        return order_Items.stream().map(OrderItemsMapper::mapToOrder_ItemsDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderItems> convertToOrderItems(List<CartItem> cartItems) {
        List<OrderItems> orderItems = new ArrayList<>();
        for(CartItem cartItem: cartItems){
            orderItems.add(cartItemToOrderItems(cartItem));
        }
        return orderItems;
    }

    @Override
    public OrderItems cartItemToOrderItems(CartItem cartItem) {
        OrderItems orderItems = new OrderItems();
        orderItems.setDonutId(cartItem.getDonut().getId());
        orderItems.setQuantity(cartItem.getQuantity());
        orderItemsRepository.save(orderItems);
        return orderItems;
    }

    @Override
    public double getTotal(OrderItemsDto orderItemsDto) {
        double total = 0;
        total = (donutService.getDonutById(orderItemsDto.getDonutId()).getPrice() * orderItemsDto.getQuantity());
        return total;
    }

}
