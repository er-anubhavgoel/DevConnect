package com.devconnect.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devconnect.bean.Chat;
import com.devconnect.bean.User;
import com.devconnect.exceptions.ChatException;
import com.devconnect.repository.ChatRepository;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatRepository chatRepository;

	@Override
	public Chat createChat(User reqUser, User user) {
		Chat isExist = chatRepository.findChatByUsersId(user, reqUser);

		if (isExist != null) {
			return isExist;
		}
		Chat chat = new Chat();
		chat.getUsers().add(user);
		chat.getUsers().add(reqUser);
		chat.setTimeStamp(LocalDateTime.now());
		return chatRepository.save(chat);
	}

	@Override
	public Chat findChatById(Integer chatId) throws ChatException {
		Optional<Chat> optional = chatRepository.findById(chatId);
		if (optional.isEmpty()) {
			throw new ChatException("Chat not found with id= " + chatId);
		}
		return optional.get();
	}

	@Override
	public List<Chat> findUsersChat(Integer userId) throws ChatException {
		return chatRepository.findByUsers_UserId(userId);
	}

}