package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.UserDto;

import java.util.List;

public interface UserService {

    UserDto createUser(UserDto userDto);
    UserDto getUserById(int id);
    List<UserDto> getAllUsers();
}
