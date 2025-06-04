package com.devconnect.service;

import java.util.List;

import com.devconnect.bean.Message;
import com.devconnect.bean.User;
import com.devconnect.exceptions.MessageException;

public interface MessageService {

	public Message createMessage(User user, Integer chatId, Message message) throws Exception;

	public List<Message> findChatsMessages(Integer chatId) throws MessageException;
}
