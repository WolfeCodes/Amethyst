package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.models.LoginRequest;
import org.launchcode.Amethyst.models.LoginResponse;
import org.launchcode.Amethyst.security.JwtIssuer;
import org.launchcode.Amethyst.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtIssuer jwtIssuer;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request){
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var principal = (UserPrincipal) authentication.getPrincipal();

        var roles = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        var token = jwtIssuer.issue(principal.getUserId(), principal.getEmail(), roles);
        return new LoginResponse(token);
    }

    @GetMapping("/test")
    public String testingSecurity(@AuthenticationPrincipal UserPrincipal userPrincipal){
        return "You made it. User Id: " + userPrincipal.getUserId() + "email: " + userPrincipal.getEmail() + " " + userPrincipal.getAuthorities();
    }
}
