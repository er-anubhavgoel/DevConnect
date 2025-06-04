package com.devconnect.bean;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "post_likes")
public class Like {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer likeId;

	@ManyToOne
	@JsonBackReference
	private Post post;

	@ManyToOne
	private User user;

	private LocalDateTime createdAt;

}