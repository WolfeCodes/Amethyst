package org.launchcode.Amethyst.models.data;

import org.launchcode.Amethyst.entity.CartItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends CrudRepository<CartItem, Integer> {
}
