package com.devconnect.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devconnect.bean.User;
import com.devconnect.exceptions.UserException;
import com.devconnect.repository.UserRepository;
import com.devconnect.service.UserService;

@RestController
public class UserController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService userService;

	@GetMapping("/api/users")
	public List<User> getUsers() {
		List<User> users = userRepository.findAll();
		return users;
	}

	@GetMapping("/api/users/{userId}")
	public User getUserById(@PathVariable(value = "userId") Integer userId) throws UserException {
		User user = userService.findUserById(userId);
		return user;
	}

	@PutMapping("/api/users")
	public User updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User user) throws UserException {
		User reqUser = userService.findUserByJwt(jwt);

		User updatedUser = userService.updateUserDetails(user, reqUser.getUserId());
		return updatedUser;
	}

	@PutMapping("/api/users/{userId2}") // User1 follows User2
	public User followUser(@RequestHeader("Authorization") String jwt, @PathVariable Integer userId2)
			throws UserException {
		User reqUser = userService.findUserByJwt(jwt);

		User user = userService.followUser(reqUser.getUserId(), userId2);
		return user;
	}

	@GetMapping("/api/users/search")
	public List<User> searchUser(@RequestParam("query") String query) throws UserException {
		List<User> users = userService.searchUser(query);
		return users;
	}

	@DeleteMapping("/api/users/{userId}")
	public String deleteUser(@PathVariable Integer userId) throws UserException {
		Optional<User> user = userRepository.findById(userId);
		if (user.isEmpty()) {
			throw new UserException("User does not exist with userId= " + userId);
		}
		userRepository.delete(user.get());

		return "User deleted with userId=" + userId;
	}

	@GetMapping("/api/users/profile")
	public User getUserFromToken(@RequestHeader("Authorization") String jwt) {

		User user = userService.findUserByJwt(jwt);
		user.setPassword(null);
		return user;
	}
}
