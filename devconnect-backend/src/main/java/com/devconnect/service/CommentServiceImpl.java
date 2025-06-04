package com.devconnect.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devconnect.bean.Comment;
import com.devconnect.bean.Post;
import com.devconnect.bean.User;
import com.devconnect.exceptions.CommentException;
import com.devconnect.repository.CommentRepository;
import com.devconnect.repository.PostRepository;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private PostService postService;

	@Autowired
	private UserService userService;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private PostRepository postRepository;

	@Override
	public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception {

		User user = userService.findUserById(userId);
		Post post = postService.findPostById(postId);

		comment.setUser(user);
		comment.setContent(comment.getContent());
		comment.setCreatedAt(LocalDateTime.now());

		Comment savedComment = commentRepository.save(comment);
		post.getComments().add(savedComment);
		postRepository.save(post);

		return savedComment;
	}

	@Override
	public Comment findCommentById(Integer commentId) throws CommentException {
		Optional<Comment> optional = commentRepository.findById(commentId);

		if (optional.isEmpty()) {
			throw new CommentException("Comment does not exist...");
		}

		return optional.get();
	}

	@Override
	public Comment likeComment(Integer commentId, Integer userId) throws Exception {

		Comment comment = findCommentById(commentId);
		User user = userService.findUserById(userId);

		if (comment.getLiked().contains(user)) {
			comment.getLiked().remove(user);
		} else {
			comment.getLiked().add(user);
		}
		return commentRepository.save(comment);
	}

}
