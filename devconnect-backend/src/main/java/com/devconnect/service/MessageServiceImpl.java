package com.devconnect.service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devconnect.bean.Chat;
import com.devconnect.bean.Message;
import com.devconnect.bean.User;
import com.devconnect.exceptions.MessageException;
import com.devconnect.repository.ChatRepository;
import com.devconnect.repository.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	public MessageRepository messageRepository;

	@Autowired
	public ChatService chatService;

	@Autowired
	public ChatRepository chatRepository;

	@Override
	public Message createMessage(User user, Integer chatId, Message req) throws Exception {
		Message message = new Message();
		Chat chat = chatService.findChatById(chatId);

		message.setChat(chat);
		message.setContent(req.getContent());
		message.setImage(req.getImage());
		message.setUser(user);
		message.setTimestamp(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")));

		Message savedMessage = messageRepository.save(message);
		chat.getMessages().add(savedMessage);
		chatRepository.save(chat);

		return savedMessage;
	}

	@Override
	public List<Message> findChatsMessages(Integer chatId) throws MessageException {
		return messageRepository.findByChatId(chatId);
	}

}
