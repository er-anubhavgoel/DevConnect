package com.devconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devconnect.bean.Reels;

public interface ReelsRepository extends JpaRepository<Reels, Integer> {

	public List<Reels> findByUserUserId(Integer userId);

}
