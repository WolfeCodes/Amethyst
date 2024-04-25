package org.launchcode.Amethyst.controllers;

import org.launchcode.Amethyst.dto.IsTempMailResponse; // New import statement
import org.launchcode.Amethyst.models.LoginRequest;
import org.launchcode.Amethyst.models.LoginResponse;
import org.launchcode.Amethyst.security.ApiProperties;
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
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.Collections;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtIssuer jwtIssuer;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ApiProperties apiProperties;

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

    @GetMapping("/emailCheck")
    public IsTempMailResponse emailCheck(@RequestParam String email) {
        // Replace API_TOKEN with your actual API token
        String apiToken = apiProperties.getApiKey();
        String apiUrl = "https://istempmail.com/api/check/" + apiToken + "/";
        String fullUrl = apiUrl + email; // Construct the full URL with email address
        RestTemplate restTemplate = new RestTemplate();

        // Set headers to accept JSON response
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        // Check if the email is valid and not from a temporary domain
        IsTempMailResponse response = restTemplate.getForObject(fullUrl, IsTempMailResponse.class);

        // If IsTempMail API considers unresolvable as blocked, use the existing logic:
        if (response != null && response.isBlocked()) {
            // Email is blocked (or potentially unresolvable), handle it
        }

        return response;
    }


    @GetMapping("/test")
    public String testingSecurity(@AuthenticationPrincipal UserPrincipal userPrincipal){
        return "You made it. User Id: " + userPrincipal.getUserId() + "email: " + userPrincipal.getEmail() + " " + userPrincipal.getAuthorities();
    }
}
