package org.launchcode.Amethyst.services;

import org.launchcode.Amethyst.dto.DonutDto;
import org.launchcode.Amethyst.dto.UserDto;

import java.util.List;

public interface UserService {

    UserDto createUser(UserDto userDto);
    UserDto getUserById(int id);
    List<UserDto> getAllUsers(String name);
    UserDto updateUser(int id, UserDto updatedUser);
    void deleteUserById(int id);
}
