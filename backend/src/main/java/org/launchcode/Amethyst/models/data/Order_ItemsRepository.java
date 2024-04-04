package org.launchcode.Amethyst.models.data;

import org.launchcode.Amethyst.entity.OrderItems;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Order_ItemsRepository extends CrudRepository<OrderItems, Integer> {
}
