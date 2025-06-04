package com.devconnect.bean;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer userId;
	private String firstName;
	private String lastName;
	private String email;
	private String password;

	private List<Integer> followers = new ArrayList<>();
	private List<Integer> followings = new ArrayList<>();

	@ManyToMany
	@JsonIgnore
	private List<Post> savedPost = new ArrayList<>();

	private String gender;
}
