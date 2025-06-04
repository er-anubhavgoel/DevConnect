package com.devconnect.service;

import java.util.List;

import com.devconnect.bean.User;
import com.devconnect.exceptions.UserException;

public interface UserService {
	public User registerUser(User user);

	public User findUserById(Integer userId) throws UserException;

	public User findUserByEmail(String email) throws UserException;

	public User followUser(Integer reqUserId, Integer userId2) throws UserException;

	public List<User> searchUser(String query) throws UserException;

	public User updateUserDetails(User user, Integer userId) throws UserException;

	public User findUserByJwt(String jwt);
}
