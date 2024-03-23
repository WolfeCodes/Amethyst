package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.UserDto;
import org.launchcode.Amethyst.entity.User;
import org.launchcode.Amethyst.mapper.UserMapper;
import org.launchcode.Amethyst.models.data.UserRepository;
import org.launchcode.Amethyst.services.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto getUserById(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User does not exist"));
        return UserMapper.mapToUserDto(user);
    }


    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users.stream().map(UserMapper::mapToUserDto).collect(Collectors.toList());
    }
}
