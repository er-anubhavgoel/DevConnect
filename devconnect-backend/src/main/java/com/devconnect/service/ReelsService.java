package com.devconnect.service;

import java.util.List;

import com.devconnect.bean.Reels;
import com.devconnect.bean.User;

public interface ReelsService {

	public Reels createReel(Reels reel, User user);

	public List<Reels> allReels();

	public List<Reels> userReels(Integer userId) throws Exception;
}
