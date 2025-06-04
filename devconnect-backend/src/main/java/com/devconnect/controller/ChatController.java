package com.devconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.devconnect.bean.Chat;
import com.devconnect.bean.User;
import com.devconnect.exceptions.ChatException;
import com.devconnect.request.CreateChatRequest;
import com.devconnect.service.ChatService;
import com.devconnect.service.UserService;

@RestController
public class ChatController {

	@Autowired
	private ChatService chatService;

	@Autowired
	private UserService userService;

	@PostMapping("/api/chats")
	public Chat createChat(@RequestHeader("Authorization") String jwt, @RequestBody CreateChatRequest chatRequest)
			throws Exception {
		User reqUser = userService.findUserByJwt(jwt);
		User user2 = userService.findUserById(chatRequest.getUserId());
		Chat chat = chatService.createChat(reqUser, user2);
		return chat;
	}

	@GetMapping("/api/chats")
	public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt) throws ChatException {
		User user = userService.findUserByJwt(jwt);
		List<Chat> chats = chatService.findUsersChat(user.getUserId());
		return chats;
	}
}
