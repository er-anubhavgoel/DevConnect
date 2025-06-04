package com.devconnect.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devconnect.bean.Like;
import com.devconnect.bean.Post;
import com.devconnect.bean.User;
import com.devconnect.exceptions.PostException;
import com.devconnect.repository.LikeRepository;
import com.devconnect.repository.PostRepository;
import com.devconnect.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	PostRepository postRepository;

	@Autowired
	UserService userService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	LikeRepository likeRepository;

	@Override
	public Post createPost(Post post, Integer userId) throws Exception {
		User user = userService.findUserById(userId);

		Post newPost = new Post();
		newPost.setCaption(post.getCaption());
		newPost.setImage(post.getImage());
		newPost.setCreatedAt(LocalDateTime.now());
		newPost.setVideo(post.getVideo());
		newPost.setUser(user);
		return postRepository.save(newPost);
	}

	@Override
	@Transactional
	public String deletePost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);

		if (post.getUser().getUserId() != user.getUserId()) {
			throw new PostException("You cannot delete another user's post!");
		}

		userRepository.removeSavedPostRelationships(postId);

		postRepository.delete(post);
		return "Post deleted successfully!";
	}

	@Override
	public List<Post> findPostByUserId(Integer userId) throws PostException {
		return postRepository.findPostByUserId(userId);
	}

	@Override
	public Post findPostById(Integer postId) throws PostException {
		Optional<Post> optional = postRepository.findById(postId);

		if (optional.isEmpty()) {
			throw new PostException("Post not found with postId " + postId);
		}
		return optional.get();
	}

	@Override
	public List<Post> findAllPost() throws PostException {
		return postRepository.findAll();
	}

	@Override
	public Post savedPost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);

		if (user.getSavedPost().contains(post)) {
			user.getSavedPost().remove(post);
		} else {
			user.getSavedPost().add(post);
		}
		userRepository.save(user);
		return post;
	}

	@Override
	public Post likePost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);

		Optional<Like> existingLike = likeRepository.findByPostAndUser(post, user);

		if (existingLike.isPresent()) {
			likeRepository.delete(existingLike.get());
		} else {
			Like newLike = new Like();
			newLike.setPost(post);
			newLike.setUser(user);
			newLike.setCreatedAt(LocalDateTime.now());
			likeRepository.save(newLike);
		}

		return findPostById(postId);
	}

	public long getLikesCount(Integer postId) throws PostException {
		Post post = findPostById(postId);
		return likeRepository.countByPost(post);
	}

	public boolean hasUserLikedPost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		return likeRepository.existsByPostAndUser(post, user);
	}

}
