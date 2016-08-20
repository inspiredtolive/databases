DROP DATABASE IF EXISTS `chat`;
CREATE DATABASE chat;

USE chat;

-- CREATE TABLE messages (
--    Describe your table here.
-- );

/* Create other tables and define schemas for them here! */
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;
-- ---
-- Table 'Users'
-- 
-- ---

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `Friends`;
		
CREATE TABLE `Friends` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `friend_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES `Users` (`id`),
  FOREIGN KEY (friend_id) REFERENCES `Users` (`id`)
);

DROP TABLE IF EXISTS `Messages`;
		
CREATE TABLE `Messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `text` MEDIUMTEXT NOT NULL,
  `room_id` INTEGER NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES `Users` (`id`),
  FOREIGN KEY (room_id) REFERENCES `Rooms` (`id`)
);


DROP TABLE IF EXISTS `Rooms`;

		
CREATE TABLE `Rooms` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`id`)
);
-- ---
-- Table 'Rooms'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
		
CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(16) NOT NULL DEFAULT 'anonymous',
  PRIMARY KEY (`id`)
);


-- ---
-- Table 'Messages'
-- 
-- ---





-- ---
-- Table 'Friends (optional)'
-- 
-- ---


-- ---
-- Foreign Keys 
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Friends (optional)` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Messages` (`id`,`user_id`,`text`,`room_id`,`createdAt`) VALUES
-- ('','','','','');
-- INSERT INTO `Rooms` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `Users` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `Friends (optional)` (`id`,`user_id`,`friend_id`) VALUES
-- ('','','');



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

