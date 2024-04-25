package org.launchcode.Amethyst.services.impl;

import org.launchcode.Amethyst.dto.UserDto;
import org.launchcode.Amethyst.entity.Donut;
import org.launchcode.Amethyst.entity.User;
import org.launchcode.Amethyst.mapper.DonutMapper;
import org.launchcode.Amethyst.mapper.UserMapper;
import org.launchcode.Amethyst.models.data.UserRepository;
import org.launchcode.Amethyst.services.CartService;
import org.launchcode.Amethyst.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        // Set email as username if no username provided
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            user.setUsername(user.getEmail());
        }else{
            user.setUsername(user.getUsername());
        }

        user.setEmail(user.getEmail());

        // Set user as role if no role provided
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("user");
        }else{
            user.setRole(user.getRole());
        }

        // Set default password if none provided
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            user.setPassword("password"); // Set default password
        }
        else{
            user.setPassword(user.getPassword());
        }

        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto getUserById(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User does not exist"));
        return UserMapper.mapToUserDto(user);
    }


    @Override
    public List<UserDto> getAllUsers(String username) {
        List<User> users = new ArrayList<>();
        if (username != null && !username.isEmpty()) {
            userRepository.findByName(username).forEach(users::add);
        } else {
            userRepository.findAll().forEach(users::add);
        }
        return users.stream().map(UserMapper::mapToUserDto).collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(int id, UserDto updatedUser) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Donut does not exist"));
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setRole(updatedUser.getRole());
        user.setPassword(updatedUser.getPassword());
        User updatedUserObj = userRepository.save(user);
        return UserMapper.mapToUserDto(updatedUserObj);
    }

    @Override
    public void deleteUserById(int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User does not exist"));
        userRepository.deleteById(userId);
    }
}
