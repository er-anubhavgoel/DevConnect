package com.devconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devconnect.bean.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	public User findByEmail(String email);

	@Query("select u from User u where u.firstName LIKE %:query% OR u.lastName LIKE %:query% OR u.email LIKE %:query%")
	public List<User> searchUser(@Param("query") String query);

	@Modifying
	@Query(value = "DELETE FROM users_saved_post WHERE saved_post_post_id = :postId", nativeQuery = true)
	void removeSavedPostRelationships(@Param("postId") Integer postId);
}
