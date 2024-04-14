package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.dto.CartItemDto;
import org.launchcode.Amethyst.dto.OrderDto;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.entity.OrderItems;
import org.launchcode.Amethyst.entity.Orders;
import org.launchcode.Amethyst.mapper.UserMapper;
import org.launchcode.Amethyst.models.data.OrderRepository;
import org.launchcode.Amethyst.services.CartService;
import org.launchcode.Amethyst.services.OrderItemsService;
import org.launchcode.Amethyst.services.OrderService;
import org.launchcode.Amethyst.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderItemsService orderItemsService;


    @Override
    public OrderDto createOrder(CartDto cartDto) {
        Orders orders = new Orders();
        orders.setUser(UserMapper.mapToUser(userService.getUserById(cartDto.getUserId())));
        orders.setOrderItems(orderItemsService.convertToOrderItems(cartService.getCartItems(cartDto)));
        orders.setCreateTime(LocalDateTime.now());
        orderRepository.save(orders);
        return null;
    }

    @Override
    public List<OrderDto> getAllOrders() {
        List<Orders> orders = new ArrayList<>();
        orderRepository.findAll().forEach(orders::add);
        List<OrderDto> orderDtos = new ArrayList<>();
        for(Orders order: orders){
            orderDtos.add(toDto(order));
        }
        return orderDtos;
    }

    @Override
    public OrderDto getOrderById(int id) {
        Orders orders = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order does not exist"));
        return toDto(orders);
    }

    @Override
    public double getPriceOfOrder(OrderDto orderDto) {
        double total = 0;
        List<Integer> orderItemIds = orderDto.getOrderItemIds();
        for(Integer orderItemId: orderItemIds){
            total += (orderItemsService.getTotal(orderItemsService.getOrderItemsById(orderItemId)));
        }
        return total;
    }

    OrderDto toDto(Orders orders){
        List<Integer> orderItemIds = orders.getOrderItems().stream().map(OrderItems::getId).toList();
        return new OrderDto(orders.getId(), orders.getUser().getId(), orderItemIds,orders.getCreateTime());
    }
}
