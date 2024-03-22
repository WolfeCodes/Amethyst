package org.launchcode.Amethyst.models.data;

import org.launchcode.Amethyst.entity.Donut;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonutRepository extends CrudRepository<Donut, Integer> {
}
