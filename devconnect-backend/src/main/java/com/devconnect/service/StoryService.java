package com.devconnect.service;

import java.util.List;

import com.devconnect.bean.Story;
import com.devconnect.bean.User;
import com.devconnect.exceptions.StoryException;

public interface StoryService {

	public Story createStory(Story story, User user);

	public List<Story> findStoryByUserId(Integer userId) throws StoryException;
}