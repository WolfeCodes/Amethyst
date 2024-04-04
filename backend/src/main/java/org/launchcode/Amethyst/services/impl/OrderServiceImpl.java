package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.dto.OrderDto;
import org.launchcode.Amethyst.entity.Orders;
import org.launchcode.Amethyst.mapper.UserMapper;
import org.launchcode.Amethyst.models.data.OrderRepository;
import org.launchcode.Amethyst.services.CartService;
import org.launchcode.Amethyst.services.OrderItemsService;
import org.launchcode.Amethyst.services.OrderService;
import org.launchcode.Amethyst.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        orderRepository.save(orders);
        return null;
    }
}
