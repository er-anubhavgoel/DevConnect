package com.devconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devconnect.bean.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {

	@Query("select p from Post p where p.user.id=:userId")
	List<Post> findPostByUserId(Integer userId);

}