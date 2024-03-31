package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.entity.CartItem;

import java.util.List;

public interface CartItemService {

    List<CartItem> findByIds(List<Integer> cartItemIds);
}
