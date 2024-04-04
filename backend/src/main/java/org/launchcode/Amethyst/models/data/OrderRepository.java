package org.launchcode.Amethyst.models.data;

import org.launchcode.Amethyst.entity.Orders;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Orders, Integer> {
}
