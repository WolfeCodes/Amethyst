package org.launchcode.Amethyst.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtDecoder {
    @Autowired
    private JwtProperties jwtProperties;

    public DecodedJWT decode(String token){
        return JWT.require(Algorithm.HMAC256(jwtProperties.getSecretKey()))
                .build()
                .verify(token);
    }
}
