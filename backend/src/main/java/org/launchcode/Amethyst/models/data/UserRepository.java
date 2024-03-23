package org.launchcode.Amethyst.models.data;

import org.launchcode.Amethyst.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
}
