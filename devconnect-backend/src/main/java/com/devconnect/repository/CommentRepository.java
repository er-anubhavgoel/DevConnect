package com.devconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devconnect.bean.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer>{
	
}
