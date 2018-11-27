-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 27, 2018 at 05:22 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grab_bike`
--

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` int(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `deleted_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `name`, `phone`, `address`, `status`, `created_at`, `deleted_at`) VALUES
(0, 'cba', '123456789', 'hùng vương', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 'xyz', '01655925039', '359/2y, Le van sy, phuong 12, quan 3', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `driver` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `status` int(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `driver_lng` varchar(255) NOT NULL,
  `user_lat` varchar(255) NOT NULL,
  `user_lng` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `username`, `driver`, `phone`, `note`, `status`, `time`, `driver_lng`, `user_lat`, `user_lng`, `address`) VALUES
(17, 'VAT', '', '123456789', 'xxxx', 1, '2018-11-27 22:26:38', '', '10.788119', '106.67609889999994', '359/2y Lê văn sỹ Phường 12'),
(18, 'Vũ Anh Tài', '', 'xxxxxxx', 'xxx', 1, '2018-11-27 22:43:45', '', '38.8866441', '-77.01440689999998', 'Lê văn sỹ'),
(19, 'xxxxx', '', 'xxx', 'xxxxxx', 1, '2018-11-27 22:45:09', '', '10.788119', '106.67609889999994', 'Nguyễn đình chiều'),
(20, 'xxxxx', '', 'xxxx', 'xxxx', 1, '2018-11-27 22:48:05', '', '38.8866441', '-77.01440689999998', 'Lê văn sỹ	'),
(21, 'xxxxx', '', 'xxxx', 'xxxx', 1, '2018-11-27 23:10:55', '', '10.7925362', '106.67064349999998', '359/2y Lê văn sỹ Phường 12	'),
(22, 'xxxxx', '', 'xxxx', 'xxxx', 1, '2018-11-27 23:11:45', '', '10.788119', '106.67609889999994', '359/2y Lê văn sỹ Phường 12	'),
(23, 'xxxxx', '', 'xxxx', 'xxxx', 1, '2018-11-27 23:11:56', '', '38.8866441', '-77.01440689999998', '359/2y Lê văn sỹ Phường 12	');

-- --------------------------------------------------------

--
-- Table structure for table `userRefreshTokenExt`
--

CREATE TABLE `userRefreshTokenExt` (
  `id` int(255) NOT NULL,
  `token` varchar(256) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userRefreshTokenExt`
--

INSERT INTO `userRefreshTokenExt` (`id`, `token`, `time`) VALUES
(1, 'ruytXTokRx4v9RNgHbaK47kAYPrTdH6OtiEKLemrf2fyBFPE0Ci8g0ddkBVDiBHrkR4TSXzTIkDYqXct', '2018-11-27 23:16:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `deleted_at` datetime NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `address`, `created_at`, `deleted_at`, `password`) VALUES
(1, 'abc', '012346789', 'An Dương Vương', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'c4ca4238a0b923820dcc509a6f75849b');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
