package org.launchcode.Amethyst.models.data;

import org.launchcode.Amethyst.entity.Cart;
import org.springframework.data.repository.CrudRepository;

public interface CartRepository extends CrudRepository<Cart, Integer> {
}
