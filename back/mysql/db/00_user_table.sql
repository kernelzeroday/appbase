CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) NOT NULL,
  `password_hash` char(60) NOT NULL,
  `user_timezone` varchar(256) NOT NULL,
  `clock_in_times` json DEFAULT NULL,
  `clock_out_times` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);
