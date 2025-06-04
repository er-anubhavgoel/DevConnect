package com.devconnect.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devconnect.bean.Story;
import com.devconnect.bean.User;
import com.devconnect.exceptions.StoryException;
import com.devconnect.repository.StoryRepository;

@Service
public class StoryServiceImpl implements StoryService {

	@Autowired
	private StoryRepository storyRepository;

	@Override
	public Story createStory(Story story, User user) {

		Story createdStory = new Story();
		createdStory.setImage(story.getImage());
		createdStory.setCaption(story.getCaption());
		createdStory.setUser(user);
		createdStory.setTimeStamp(LocalDateTime.now());

		return storyRepository.save(createdStory);
	}

	@Override
	public List<Story> findStoryByUserId(Integer userId) throws StoryException {
		return storyRepository.findByUserUserId(userId);
	}

}
