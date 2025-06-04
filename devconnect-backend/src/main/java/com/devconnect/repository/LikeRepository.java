package com.devconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devconnect.bean.Like;
import com.devconnect.bean.Post;
import com.devconnect.bean.User;

public interface LikeRepository extends JpaRepository<Like, Integer> {

	Optional<Like> findByPostAndUser(Post post, User user);

	long countByPost(Post post);

	boolean existsByPostAndUser(Post post, User user);

	List<Like> findByPost(Post post);
}
