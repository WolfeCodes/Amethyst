package org.launchcode.Amethyst.security;


import org.launchcode.Amethyst.dto.UserDto;
import org.launchcode.Amethyst.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<UserDto> users = userService.getAllUsers(username);
        UserDto userDto = users.get(0);
        return new UserPrincipal(userDto.getId(), userDto.getUsername(), List.of(new SimpleGrantedAuthority(userDto.getRole())), userDto.getPassword());
    }
}
