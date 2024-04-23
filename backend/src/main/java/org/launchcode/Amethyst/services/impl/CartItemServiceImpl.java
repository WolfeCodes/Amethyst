package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.CartItemDto;
import org.launchcode.Amethyst.entity.CartItem;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.mapper.DonutMapper;
import org.launchcode.Amethyst.models.data.CartItemRepository;
import org.launchcode.Amethyst.services.CartItemService;
import org.launchcode.Amethyst.services.DonutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private DonutService donutService;


    @Override
    public List<CartItem> findByIds(List<Integer> cartItemIds) {
        List<CartItem> cartItems = new ArrayList<>(); //initialize empty list of CartItems
        cartItemRepository.findAllById(cartItemIds).forEach(cartItems::add); //CrudRepo method to find all CartItem entities and add to cartItems
        return cartItems;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItemDto getCartItemById(int id) {
        CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("CartItem does not exist"));
        return toDto(cartItem);
    }

    //Converts a CartItem entity to CartItemDto
    CartItemDto toDto(CartItem cartItem) {
        return new CartItemDto(cartItem.getId(), cartItem.getDonut().getId(), cartItem.getQuantity());
    }

    //Coverts a CartItemDto to CartItem entity
    @Override
    public CartItem toCartItem(CartItemDto cartItemDto) {
        Donut donut = DonutMapper.mapToDonut(donutService.getDonutById(cartItemDto.getDonutId()));
        return new CartItem(cartItemDto.getId(), donut, cartItemDto.getQuantity());
    }

    @Override
    public Boolean isDuplicateDonut(List<CartItem> cartItems, int donutId) {
        Boolean isDuplicate = false; //initializing Boolean to false
        for(CartItem cartItem : cartItems){ //loop over cartItems input
            if(cartItem.getDonut().getId() == donutId) { //checking for an existing donut in cartItems
                cartItem.setQuantity(cartItem.getQuantity() + 1); //if matching increase quantity by 1
                isDuplicate = true; //set isDuplicate to true
            }
        }
        return isDuplicate;
    }

    @Override
    public void deleteCartItem(int id) {
        cartItemRepository.deleteById(id);
    }
}
