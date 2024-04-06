package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.models.LoginRequest;
import org.launchcode.Amethyst.models.LoginResponse;
import org.launchcode.Amethyst.security.JwtIssuer;
import org.launchcode.Amethyst.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    JwtIssuer jwtIssuer;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request){
        var token = jwtIssuer.issue(1, request.getEmail(), List.of("USER"));
        return new LoginResponse(token);
    }

    @GetMapping("/test")
    public String testingSecurity(@AuthenticationPrincipal UserPrincipal userPrincipal){
        return "You made it. User Id: " + userPrincipal.getUserId() + "email: " + userPrincipal.getEmail() + " " + userPrincipal.getAuthorities();
    }
}
