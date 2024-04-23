package org.launchcode.Amethyst.controllers;
import org.launchcode.Amethyst.dto.EmailCheckResponse;
import org.launchcode.Amethyst.models.LoginRequest;
import org.launchcode.Amethyst.models.LoginResponse;
import org.launchcode.Amethyst.security.JwtIssuer;
import org.launchcode.Amethyst.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.Arrays;
import java.util.Collections;
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

//    @GetMapping("/emailCheck")
//    public List<Object> emailCheck(@RequestParam String email) {
//        String url = "https://api.eva.pingutil.com/email";
//        RestTemplate restTemplate = new RestTemplate();
//        UriComponents uriComponents = UriComponentsBuilder.newInstance()
//                .scheme("https")
//                .host("api.eva.pingutil.com")
//                .path("/email")
//                .queryParam("email", email)
//                .build();
//
//        Object [] emailResponse = restTemplate.getForObject(uriComponents.toUri(), Object[].class);
//        return Arrays.asList(emailResponse);
//    }

    @GetMapping("/emailCheck")
    public ResponseEntity<EmailCheckResponse> emailCheck(@RequestParam String email) throws Exception {
        String apiUrl = "https://api.eva.pingutil.com/email?email=" + email;

        // Disable SSL certificate validation
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, new TrustManager[]{new X509TrustManager() {
            public void checkClientTrusted(X509Certificate[] x509Certificates, String s) {}
            public void checkServerTrusted(X509Certificate[] x509Certificates, String s) {}
            public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
        }}, new SecureRandom());

        HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());

        RestTemplate restTemplate = new RestTemplate();
        EmailCheckResponse response = restTemplate.getForObject(apiUrl, EmailCheckResponse.class);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/test")
    public String testingSecurity(@AuthenticationPrincipal UserPrincipal userPrincipal){
        return "You made it. User Id: " + userPrincipal.getUserId() + "email: " + userPrincipal.getEmail() + " " + userPrincipal.getAuthorities();
    }
}
