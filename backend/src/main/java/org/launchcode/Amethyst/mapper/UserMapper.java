package org.launchcode.Amethyst.mapper;

import org.launchcode.Amethyst.dto.UserDto;
import org.launchcode.Amethyst.entity.User;

public class UserMapper {

    public static User mapToUser(UserDto userDto){
        User user = new User(
                userDto.getId(),
                userDto.getUsername(),
                userDto.getPassword(),
                userDto.getRole()
        );

        return user;
    }

    public static UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getRole()
        );

        return userDto;
    }
}
