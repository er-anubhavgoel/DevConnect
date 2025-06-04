package com.devconnect.bean;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer Id;

	private String content;

	private String image;

	@ManyToOne
	private User user;

	@ManyToOne
	@JsonIgnore
	private Chat chat;

	private LocalDateTime timestamp;
}
