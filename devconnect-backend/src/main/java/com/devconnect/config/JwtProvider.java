package com.devconnect.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {

	private static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

	@SuppressWarnings("deprecation")
	public static String generateToken(Authentication auth) {
		String jwt = Jwts.builder().setIssuer("Dev_Connect").issuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + 86400000)).claim("email", auth.getName()).signWith(key)
				.compact();

		return jwt;
	}

	@SuppressWarnings("deprecation")
	public static String getEmailFromJwtToken(String jwt) {
		// jwt = Bearer Token, we need only Token
		jwt = jwt.substring(7); // To remove first 7 characters of String jwt

		Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

		String email = String.valueOf(claims.get("email"));

		return email;
	}
}
