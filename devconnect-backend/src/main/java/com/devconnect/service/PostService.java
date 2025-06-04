package com.devconnect.service;

import java.util.List;

import com.devconnect.bean.Post;
import com.devconnect.exceptions.PostException;

public interface PostService {
	public Post createPost(Post post, Integer userId) throws Exception;

	public String deletePost(Integer postId, Integer userId) throws Exception;

	public List<Post> findPostByUserId(Integer userId) throws PostException;

	public Post findPostById(Integer postId) throws PostException;

	public List<Post> findAllPost() throws PostException;

	public Post savedPost(Integer postId, Integer userId) throws Exception;

	public Post likePost(Integer postId, Integer userId) throws Exception;
}