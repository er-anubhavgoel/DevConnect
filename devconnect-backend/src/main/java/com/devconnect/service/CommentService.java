package com.devconnect.service;

import com.devconnect.bean.Comment;
import com.devconnect.exceptions.CommentException;

public interface CommentService {

	public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception;

	public Comment findCommentById(Integer commentId) throws CommentException;

	public Comment likeComment(Integer commentId, Integer userId) throws Exception;
}
