package com.devconnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devconnect.bean.User;
import com.devconnect.config.JwtProvider;
import com.devconnect.exceptions.UserException;
import com.devconnect.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Override
	public User registerUser(User user) {
		User newUser = new User();
		newUser.setUserId(user.getUserId());
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setPassword(user.getPassword());

		User savedUser = userRepository.save(newUser);
		return savedUser;
	}

	@Override
	public User findUserById(Integer userId) throws UserException {
		Optional<User> user = userRepository.findById(userId);
		if (user.isPresent())
			return user.get();
		throw new UserException("User does not exist with userId= " + userId);
	}

	@Override
	public User findUserByEmail(String email) throws UserException {
		User user = userRepository.findByEmail(email);
		return user;
	}

	@Override
	public User followUser(Integer reqUserId, Integer userId2) throws UserException {
		User reqUser = findUserById(reqUserId);
		User user2 = findUserById(userId2);

		if (reqUser.getFollowings().contains(user2.getUserId())) {
			reqUser.getFollowings().remove(user2.getUserId());
			user2.getFollowers().remove(reqUser.getUserId());
		} else {
			reqUser.getFollowings().add(user2.getUserId());
			user2.getFollowers().add(reqUser.getUserId());
		}
		userRepository.save(reqUser);
		userRepository.save(user2);
		return reqUser;
	}

	@Override
	public List<User> searchUser(String query) throws UserException {
		return userRepository.searchUser(query);
	}

	@Override
	public User updateUserDetails(User user, Integer userId) throws UserException {
		Optional<User> user1 = userRepository.findById(userId);
		if (user1.isEmpty()) {
			throw new UserException("User does not exist with userId= " + userId);
		}
		User oldUser = user1.get();
		if (user.getFirstName() != null)
			oldUser.setFirstName(user.getFirstName());
		if (user.getLastName() != null)
			oldUser.setLastName(user.getLastName());
		if (user.getEmail() != null)
			oldUser.setEmail(user.getEmail());
		if (user.getGender() != null)
			oldUser.setGender(user.getGender());
		User updatedUser = userRepository.save(oldUser);
		return updatedUser;
	}

	@Override
	public User findUserByJwt(String jwt) {
		String email = JwtProvider.getEmailFromJwtToken(jwt);

		User user = userRepository.findByEmail(email);
		return user;
	}

}
