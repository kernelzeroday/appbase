CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_email` varchar(256) NOT NULL,
  `admin_first_name` varchar(256) NOT NULL,
  `admin_last_name` varchar(256) NOT NULL,
  `admin_password_hash` char(60) NOT NULL,
  `admin_timezone` varchar(256) NOT NULL,
  `admin_role` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_email` (`admin_email`)
);


CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(256) NOT NULL,
  `user_first_name` varchar(256) NOT NULL,
  `user_last_name` varchar(256) NOT NULL,
  `user_password_hash` char(60) NOT NULL,
  `user_timezone` varchar(256) NOT NULL,
  `user_role` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email` (`user_email`)
);

CREATE TABLE `clock_times` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `clock_in_time` datetime DEFAULT NULL,
  `clock_out_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);