package com.devconnect.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devconnect.bean.User;
import com.devconnect.config.JwtProvider;
import com.devconnect.repository.UserRepository;
import com.devconnect.request.LoginRequest;
import com.devconnect.response.AuthResponse;
import com.devconnect.service.CustomUserDetailsService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	CustomUserDetailsService customUserDetails;

	@PostMapping("/signup")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		try {
			System.out.println("=== SIGNUP DEBUG START ===");
			System.out.println("Received user data:");
			System.out.println("Email: " + user.getEmail());
			System.out.println("First Name: " + user.getFirstName());
			System.out.println("Last Name: " + user.getLastName());
			System.out.println("Gender: " + user.getGender());
			System.out.println("Password: " + (user.getPassword() != null ? "[PROVIDED]" : "[NULL]"));

			// Check if user already exists
			User isExist = userRepository.findByEmail(user.getEmail());
			if (isExist != null) {
				System.out.println("User already exists with email: " + user.getEmail());
				return ResponseEntity.badRequest().body(Map.of("error", "Email already registered!"));
			}

			System.out.println("Creating new user...");
			User newUser = new User();
			newUser.setEmail(user.getEmail());
			newUser.setFirstName(user.getFirstName());
			newUser.setLastName(user.getLastName());
			newUser.setGender(user.getGender());
			newUser.setPassword(passwordEncoder.encode(user.getPassword()));

			System.out.println("Saving user to database...");
			User savedUser = userRepository.save(newUser);
			System.out.println("User saved with ID: " + savedUser.getUserId());

			System.out.println("Loading user details for authentication...");
			UserDetails userDetails = customUserDetails.loadUserByUsername(savedUser.getEmail());
			System.out.println("UserDetails loaded successfully");

			Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
					userDetails.getAuthorities());

			System.out.println("Generating JWT token...");
			String token = JwtProvider.generateToken(authentication);
			System.out.println("Token generated successfully");

			AuthResponse authResponse = new AuthResponse(token, "Registered successfully...");
			System.out.println("=== SIGNUP DEBUG END - SUCCESS ===");

			return ResponseEntity.ok(authResponse);

		} catch (Exception e) {
			System.out.println("=== SIGNUP ERROR ===");
			System.out.println("Error type: " + e.getClass().getSimpleName());
			System.out.println("Error message: " + e.getMessage());
			e.printStackTrace();
			System.out.println("=== SIGNUP ERROR END ===");

			return ResponseEntity.badRequest().body(Map.of("error", "Registration failed: " + e.getMessage()));
		}
	}

	@PostMapping("/signin")
	public AuthResponse signin(@RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());

		String token = JwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse(token, "Login successfully...");

		return authResponse;
	}

	private Authentication authenticate(String email, String password) {
		UserDetails userDetails = customUserDetails.loadUserByUsername(email);

		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Wrong Password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
}