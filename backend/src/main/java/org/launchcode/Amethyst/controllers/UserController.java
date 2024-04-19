package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.CartDto;
import org.launchcode.Amethyst.dto.DonutDto;
import org.launchcode.Amethyst.dto.UserDto;
import org.launchcode.Amethyst.dto.UserInfoDto;
import org.launchcode.Amethyst.entity.User;
import org.launchcode.Amethyst.security.UserPrincipal;
import org.launchcode.Amethyst.services.CartService;
import org.launchcode.Amethyst.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    @PostMapping("/")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto){
        UserDto createdUser = userService.createUser(userDto);
        //create cart
        CartDto cartDto = new CartDto();
        cartDto.setUserId(createdUser.getId());
        cartService.createCart(cartDto);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable int id){
        UserDto userDto = userService.getUserById(id);
        return ResponseEntity.ok(userDto);
    }
    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAllUsers(@RequestParam(required = false) String username){
        List<UserDto> users = userService.getAllUsers(username);
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") int id, @RequestBody UserDto updatedUser) {
        UserDto userDto = userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/userInfo")
    public ResponseEntity<UserInfoDto> getUserInformation(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Collection<? extends GrantedAuthority> authoritieses = userPrincipal.getAuthorities();
        UserInfoDto userInfo = new UserInfoDto(userPrincipal.getUserId(), cartService.getCartIdByUserId(userPrincipal.getUserId()), authoritieses.toString());
        return new ResponseEntity<>(userInfo, HttpStatus.CREATED);
    }

    //DELETE Mapping to remove user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") int userId) {
        userService.deleteUserById(userId);
        return ResponseEntity.ok("User Deleted");
    }

}
