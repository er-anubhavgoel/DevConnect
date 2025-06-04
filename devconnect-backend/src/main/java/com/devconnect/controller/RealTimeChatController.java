package com.devconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.devconnect.bean.Message;

@Controller
public class RealTimeChatController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/chat/{groupId}")
	public Message sendToUser(@Payload Message message, @DestinationVariable String groupId) {
		simpMessagingTemplate.convertAndSendToUser(groupId, "/private", message);
		return message;
	}
}