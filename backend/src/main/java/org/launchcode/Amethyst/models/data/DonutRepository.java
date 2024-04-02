package org.launchcode.Amethyst.models.data;

import org.launchcode.Amethyst.entity.Donut;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonutRepository extends CrudRepository<Donut, Integer> {

    @Query("SELECT d FROM Donut d WHERE d.name like %:name%")
    List<Donut> findByName(@Param("name") String name);
}
