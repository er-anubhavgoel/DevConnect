package com.devconnect.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devconnect.bean.Reels;
import com.devconnect.bean.User;
import com.devconnect.repository.ReelsRepository;

@Service
public class ReelsServiceImpl implements ReelsService {

	@Autowired
	private ReelsRepository reelsRepository;

	@Autowired
	private UserService userService;

	@Override
	public Reels createReel(Reels reel, User user) {

		Reels createReels = new Reels();
		createReels.setTitle(reel.getTitle());
		createReels.setUser(user);
		createReels.setVideo(reel.getVideo());

		return reelsRepository.save(createReels);
	}

	@Override
	public List<Reels> allReels() {
		return reelsRepository.findAll();
	}

	@Override
	public List<Reels> userReels(Integer userId) throws Exception {

		userService.findUserById(userId);
		return reelsRepository.findByUserUserId(userId);
	}

}
