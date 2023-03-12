CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) NOT NULL,
  `password_hash` char(60) NOT NULL,
  `admin_timezone` varchar(256) NOT NULL,
  `admin_role` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);


CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) NOT NULL,
  `password_hash` char(60) NOT NULL,
  `user_timezone` varchar(256) NOT NULL,
  `user_role` varchar(256) NOT NULL,
  `clock_in_times` json DEFAULT NULL,
  `clock_out_times` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE `clock_times` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `clock_in_time` datetime DEFAULT NULL,
  `clock_out_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);