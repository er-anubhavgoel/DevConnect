package com.devconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.devconnect.bean.Story;

@Service
public interface StoryRepository extends JpaRepository<Story, Integer> {

	public List<Story> findByUserUserId(Integer userId);
}
