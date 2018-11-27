-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- CREATE TABLE "drivers" ----------------------------------
-- CREATE TABLE "drivers" --------------------------------------
CREATE TABLE `drivers` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`phone` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`address` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`created_at` DateTime NOT NULL,
	`deleted_at` DateTime NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 1;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- CREATE TABLE "request" ----------------------------------
-- CREATE TABLE "request" --------------------------------------
CREATE TABLE `request` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`username` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`driver` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`phone` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`note` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`status` Int( 255 ) NOT NULL,
	`time` DateTime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`driver_lng` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`user_lat` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`user_lng` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`lat` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 4;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- CREATE TABLE "users" ------------------------------------
-- CREATE TABLE "users" ----------------------------------------
CREATE TABLE `users` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`phone` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`address` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`created_at` DateTime NOT NULL,
	`deleted_at` DateTime NOT NULL,
	`password` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 2;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- Dump data of "drivers" ----------------------------------
INSERT INTO `drivers`(`id`,`name`,`phone`,`address`,`created_at`,`deleted_at`) VALUES ( '0', 'cba', '123456789', 'hùng vương', '0000-00-00 00:00:00', '0000-00-00 00:00:00' );
-- ---------------------------------------------------------


-- Dump data of "request" ----------------------------------
INSERT INTO `request`(`id`,`username`,`driver`,`phone`,`note`,`status`,`time`,`driver_lng`,`user_lat`,`user_lng`,`lat`) VALUES ( '0', 'abc', 'cba', '123456789', 'note', '1', '2018-11-16 00:14:05', '2.17403', '100.40338', '2.17403', '2.17403' );
INSERT INTO `request`(`id`,`username`,`driver`,`phone`,`note`,`status`,`time`,`driver_lng`,`user_lat`,`user_lng`,`lat`) VALUES ( '1', 'abc', '', '123456789', 'note', '0', '2018-11-16 15:00:00', '2.17403', '100.40338', '2.17403', '2.17403' );
INSERT INTO `request`(`id`,`username`,`driver`,`phone`,`note`,`status`,`time`,`driver_lng`,`user_lat`,`user_lng`,`lat`) VALUES ( '2', 'abc', 'cba', '123456789', 'note', '1', '2018-11-16 00:15:02', '2.17403', '100.40338', '2.17403', '2.17403' );
INSERT INTO `request`(`id`,`username`,`driver`,`phone`,`note`,`status`,`time`,`driver_lng`,`user_lat`,`user_lng`,`lat`) VALUES ( '3', 'abc', '', '123456789', 'note', '0', '2018-11-16 00:59:51', '2.17403', '100.40338', '2.17403', '2.17403' );
-- ---------------------------------------------------------


-- Dump data of "users" ------------------------------------
INSERT INTO `users`(`id`,`name`,`phone`,`address`,`created_at`,`deleted_at`,`password`) VALUES ( '1', 'abc', '012346789', 'An Dương Vương', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1' );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


