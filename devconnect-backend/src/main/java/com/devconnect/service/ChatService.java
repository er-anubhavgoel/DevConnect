package com.devconnect.service;

import java.util.List;

import com.devconnect.bean.Chat;
import com.devconnect.bean.User;
import com.devconnect.exceptions.ChatException;

public interface ChatService {

	public Chat createChat(User reqUser, User user);

	public Chat findChatById(Integer chatId) throws ChatException;

	public List<Chat> findUsersChat(Integer userId) throws ChatException;
}
