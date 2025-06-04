package com.devconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devconnect.bean.Chat;
import com.devconnect.bean.User;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

	public List<Chat> findByUsers_UserId(Integer userId);

	@Query("select c from Chat c where :user member of c.users and :reqUser member of c.users")
	public Chat findChatByUsersId(@Param("user") User user, @Param("reqUser") User reqUser);
}
