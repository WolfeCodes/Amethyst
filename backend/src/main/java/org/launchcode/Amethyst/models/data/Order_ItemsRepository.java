package org.launchcode.Amethyst.models.data;

import org.launchcode.Amethyst.entity.Order_Items;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Order_ItemsRepository extends CrudRepository<Order_Items, Integer> {
}
