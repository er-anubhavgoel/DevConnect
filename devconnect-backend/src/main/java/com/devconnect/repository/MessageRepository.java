package com.devconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devconnect.bean.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

	public List<Message> findByChatId(Integer chatId);

}
