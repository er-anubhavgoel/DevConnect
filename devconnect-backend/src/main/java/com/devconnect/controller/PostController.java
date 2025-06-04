package com.devconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.devconnect.bean.Post;
import com.devconnect.bean.User;
import com.devconnect.exceptions.PostException;
import com.devconnect.repository.PostRepository;
import com.devconnect.response.ApiResponse;
import com.devconnect.service.PostService;
import com.devconnect.service.UserService;

@RestController
public class PostController {

	@Autowired
	PostService postService;

	@Autowired
	UserService userService;

	@Autowired
	PostRepository postRepository;

	@PostMapping("/api/posts")
	public ResponseEntity<Post> createPost(@RequestHeader("Authorization") String jwt, @RequestBody Post post)
			throws Exception {
		User reqUser = userService.findUserByJwt(jwt);

		Post createdPost = postService.createPost(post, reqUser.getUserId());
		return new ResponseEntity<>(createdPost, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/api/posts/{postId}")
	public ResponseEntity<ApiResponse> deletePost(@RequestHeader("Authorization") String jwt,
			@PathVariable Integer postId) throws Exception {
		User reqUser = userService.findUserByJwt(jwt);

		String message = postService.deletePost(postId, reqUser.getUserId());
		ApiResponse res = new ApiResponse(message, true);
		return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
	}

	@GetMapping("/api/posts/{postId}")
	public ResponseEntity<Post> findPostById(@PathVariable Integer postId) throws PostException {

		Post post = postService.findPostById(postId);
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}

	@GetMapping("/api/posts/user/{userId}")
	public ResponseEntity<List<Post>> findUsersPost(@PathVariable Integer userId) throws PostException {
		List<Post> posts = postService.findPostByUserId(userId);
		return new ResponseEntity<>(posts, HttpStatus.OK);
	}

	@GetMapping("/api/posts")
	public ResponseEntity<List<Post>> findAllPost() throws PostException {
		List<Post> posts = postService.findAllPost();
		return new ResponseEntity<>(posts, HttpStatus.OK);
	}

	@PutMapping("/api/posts/save/{postId}")
	public ResponseEntity<Post> savePostByUserId(@RequestHeader("Authorization") String jwt,
			@PathVariable Integer postId) throws Exception {
		User reqUser = userService.findUserByJwt(jwt);

		Post post = postService.savedPost(postId, reqUser.getUserId());
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}

	@PutMapping("/api/posts/like/{postId}")
	public ResponseEntity<Post> likePostByUserId(@RequestHeader("Authorization") String jwt,
			@PathVariable Integer postId) throws Exception {
		User reqUser = userService.findUserByJwt(jwt);

		Post post = postService.likePost(postId, reqUser.getUserId());
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
}