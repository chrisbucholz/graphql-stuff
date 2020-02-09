-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2020 at 10:09 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chris_pcs`
--

-- --------------------------------------------------------

--
-- Table structure for table `clinician_program`
--

CREATE TABLE `clinician_program` (
  `clp_clinician_program_id` int(11) NOT NULL,
  `clp_client_program` int(11) NOT NULL,
  `clp_referral_date` bigint(20) DEFAULT NULL,
  `clp_start_date` bigint(20) DEFAULT NULL,
  `clp_discharge_date` bigint(20) DEFAULT NULL,
  `clp_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clinician_program`
--

INSERT INTO `clinician_program` (`clp_clinician_program_id`, `clp_client_program`, `clp_referral_date`, `clp_start_date`, `clp_discharge_date`, `clp_name`) VALUES
(1, 1, 1581120000, NULL, NULL, 'Borg Borgleson'),
(2, 2, 1581120000, NULL, NULL, 'Borg Borgleson'),
(3, 3, 1581120000, NULL, NULL, 'Borg Borgleson'),
(4, 4, 1581120000, NULL, NULL, 'Borg Borgleson'),
(5, 5, 1581120000, NULL, NULL, 'Borg Borgleson'),
(6, 6, 1581120000, NULL, NULL, 'Borg Borgleson'),
(7, 7, 1581120000, NULL, NULL, 'Borg Borgleson'),
(8, 8, 1581120000, NULL, NULL, 'Borg Borgleson'),
(9, 9, 1581120000, NULL, NULL, 'Borg Borgleson'),
(10, 10, 1581120000, NULL, NULL, 'Borg Borgleson'),
(11, 11, 1581120000, NULL, NULL, 'Borg Borgleson'),
(12, 12, 1581120000, NULL, NULL, 'Borg Borgleson'),
(13, 13, 1581120000, NULL, NULL, 'Borg Borgleson'),
(14, 14, 1581120000, NULL, NULL, 'Borg Borgleson'),
(15, 15, 1581120000, NULL, NULL, 'Borg Borgleson'),
(16, 16, 1581120000, NULL, NULL, 'Borg Borgleson'),
(17, 17, 1581120000, NULL, NULL, 'Borg Borgleson'),
(18, 18, 1581120000, NULL, NULL, 'Borg Borgleson'),
(19, 19, 1581120000, NULL, NULL, 'Borg Borgleson'),
(20, 20, 1581120000, NULL, NULL, 'Borg Borgleson'),
(21, 21, 1581120000, NULL, NULL, 'Borg Borgleson'),
(22, 22, 1581120000, NULL, NULL, 'Borg Borgleson'),
(23, 23, 1581120000, NULL, NULL, 'Borg Borgleson'),
(24, 24, 1581120000, NULL, NULL, 'Borg Borgleson'),
(25, 25, 1581120000, NULL, NULL, 'Borg Borgleson'),
(26, 26, 1581120000, NULL, NULL, 'Borg Borgleson'),
(27, 27, 1581120000, NULL, NULL, 'Borg Borgleson'),
(28, 28, 1581120000, NULL, NULL, 'Borg Borgleson'),
(29, 29, 1581120000, NULL, NULL, 'Borg Borgleson'),
(30, 30, 1581120000, NULL, NULL, 'Borg Borgleson'),
(31, 31, 1581120000, NULL, NULL, 'Borg Borgleson'),
(32, 32, 1581120000, NULL, NULL, 'Borg Borgleson'),
(33, 33, 1581120000, NULL, NULL, 'Borg Borgleson'),
(34, 34, 1581120000, NULL, NULL, 'Borg Borgleson'),
(35, 35, 1581120000, NULL, NULL, 'Borg Borgleson'),
(36, 36, 1581120000, NULL, NULL, 'Borg Borgleson'),
(37, 37, 1581120000, NULL, NULL, 'Borg Borgleson'),
(38, 38, 1581120000, NULL, NULL, 'Borg Borgleson'),
(39, 39, 1581120000, NULL, NULL, 'Borg Borgleson'),
(40, 40, 1581120000, NULL, NULL, 'Borg Borgleson'),
(41, 41, 1581120000, NULL, NULL, 'Borg Borgleson'),
(42, 42, 1581120000, NULL, NULL, 'Borg Borgleson'),
(43, 43, 1581120000, NULL, NULL, 'Borg Borgleson'),
(44, 44, 1581120000, NULL, NULL, 'Borg Borgleson'),
(45, 45, 1581120000, NULL, NULL, 'Borg Borgleson'),
(46, 46, 1581120000, NULL, NULL, 'Borg Borgleson'),
(47, 47, 1581120000, NULL, NULL, 'Borg Borgleson'),
(48, 48, 1581120000, NULL, NULL, 'Borg Borgleson'),
(49, 49, 1581120000, NULL, NULL, 'Borg Borgleson'),
(50, 50, 1581120000, NULL, NULL, 'Borg Borgleson'),
(51, 51, 1581120000, NULL, NULL, 'Borg Borgleson'),
(52, 52, 1581120000, NULL, NULL, 'Borg Borgleson'),
(53, 53, 1581120000, NULL, NULL, 'Borg Borgleson'),
(54, 54, 1581120000, NULL, NULL, 'Borg Borgleson'),
(55, 55, 1581120000, NULL, NULL, 'Borg Borgleson'),
(56, 56, 1581120000, NULL, NULL, 'Borg Borgleson'),
(57, 57, 1581120000, NULL, NULL, 'Borg Borgleson'),
(58, 58, 1581120000, NULL, NULL, 'Borg Borgleson'),
(59, 59, 1581120000, NULL, NULL, 'Borg Borgleson'),
(60, 60, 1581120000, NULL, NULL, 'Borg Borgleson'),
(61, 61, 1581120000, NULL, NULL, 'Borg Borgleson'),
(62, 62, 1581120000, NULL, NULL, 'Borg Borgleson'),
(63, 63, 1581120000, NULL, NULL, 'Borg Borgleson'),
(64, 64, 1581120000, NULL, NULL, 'Borg Borgleson'),
(65, 65, 1581120000, NULL, NULL, 'Borg Borgleson'),
(66, 66, 1581120000, NULL, NULL, 'Borg Borgleson'),
(67, 67, 1581120000, NULL, NULL, 'Borg Borgleson'),
(68, 68, 1581120000, NULL, NULL, 'Borg Borgleson'),
(69, 69, 1581120000, NULL, NULL, 'Borg Borgleson'),
(70, 70, 1581120000, NULL, NULL, 'Borg Borgleson'),
(71, 71, 1581120000, NULL, NULL, 'Borg Borgleson'),
(72, 72, 1581120000, NULL, NULL, 'Borg Borgleson'),
(73, 73, 1581120000, NULL, NULL, 'Borg Borgleson'),
(74, 74, 1581120000, NULL, NULL, 'Borg Borgleson'),
(75, 75, 1581120000, NULL, NULL, 'Borg Borgleson'),
(76, 76, 1581120000, NULL, NULL, 'Borg Borgleson'),
(77, 77, 1581120000, NULL, NULL, 'Borg Borgleson'),
(78, 78, 1581120000, NULL, NULL, 'Borg Borgleson'),
(79, 79, 1581120000, NULL, NULL, 'Borg Borgleson'),
(80, 80, 1581120000, NULL, NULL, 'Borg Borgleson'),
(81, 81, 1581120000, NULL, NULL, 'Borg Borgleson'),
(82, 82, 1581120000, NULL, NULL, 'Borg Borgleson'),
(83, 83, 1581120000, NULL, NULL, 'Borg Borgleson'),
(84, 84, 1581120000, NULL, NULL, 'Borg Borgleson'),
(85, 85, 1581120000, NULL, NULL, 'Borg Borgleson'),
(86, 86, 1581120000, NULL, NULL, 'Borg Borgleson'),
(87, 87, 1581120000, NULL, NULL, 'Borg Borgleson'),
(88, 88, 1581120000, NULL, NULL, 'Borg Borgleson'),
(89, 89, 1581120000, NULL, NULL, 'Borg Borgleson'),
(90, 90, 1581120000, NULL, NULL, 'Borg Borgleson'),
(91, 91, 1581120000, NULL, NULL, 'Borg Borgleson'),
(92, 92, 1581120000, NULL, NULL, 'Borg Borgleson'),
(93, 93, 1581120000, NULL, NULL, 'Borg Borgleson'),
(94, 94, 1581120000, NULL, NULL, 'Borg Borgleson'),
(95, 95, 1581120000, NULL, NULL, 'Borg Borgleson'),
(96, 96, 1581120000, NULL, NULL, 'Borg Borgleson'),
(97, 97, 1581120000, NULL, NULL, 'Borg Borgleson'),
(98, 98, 1581120000, NULL, NULL, 'Borg Borgleson'),
(99, 99, 1581120000, NULL, NULL, 'Borg Borgleson'),
(100, 100, 1581120000, NULL, NULL, 'Borg Borgleson'),
(101, 101, 1581120000, NULL, NULL, 'Borg Borgleson'),
(102, 102, 1581120000, NULL, NULL, 'Borg Borgleson'),
(103, 103, 1581120000, NULL, NULL, 'Borg Borgleson'),
(104, 104, 1581120000, NULL, NULL, 'Borg Borgleson'),
(105, 105, 1581120000, NULL, NULL, 'Borg Borgleson'),
(106, 106, 1581120000, NULL, NULL, 'Borg Borgleson'),
(107, 107, 1581120000, NULL, NULL, 'Borg Borgleson'),
(108, 108, 1581120000, NULL, NULL, 'Borg Borgleson'),
(109, 109, 1581120000, NULL, NULL, 'Borg Borgleson'),
(110, 110, 1581120000, NULL, NULL, 'Borg Borgleson'),
(111, 111, 1581120000, NULL, NULL, 'Borg Borgleson'),
(112, 112, 1581120000, NULL, NULL, 'Borg Borgleson'),
(113, 113, 1581120000, NULL, NULL, 'Borg Borgleson'),
(114, 114, 1581120000, NULL, NULL, 'Borg Borgleson'),
(115, 115, 1581120000, NULL, NULL, 'Borg Borgleson'),
(116, 116, 1581120000, NULL, NULL, 'Borg Borgleson'),
(117, 117, 1581120000, NULL, NULL, 'Borg Borgleson'),
(118, 118, 1581120000, NULL, NULL, 'Borg Borgleson'),
(119, 119, 1581120000, NULL, NULL, 'Borg Borgleson'),
(120, 120, 1581120000, NULL, NULL, 'Borg Borgleson'),
(121, 121, 1581120000, NULL, NULL, 'Borg Borgleson'),
(122, 122, 1581120000, NULL, NULL, 'Borg Borgleson'),
(123, 123, 1581120000, NULL, NULL, 'Borg Borgleson'),
(124, 124, 1581120000, NULL, NULL, 'Borg Borgleson'),
(125, 125, 1581120000, NULL, NULL, 'Borg Borgleson'),
(126, 126, 1581120000, NULL, NULL, 'Borg Borgleson'),
(127, 127, 1581120000, NULL, NULL, 'Borg Borgleson'),
(128, 128, 1581120000, NULL, NULL, 'Borg Borgleson'),
(129, 129, 1581120000, NULL, NULL, 'Borg Borgleson'),
(130, 130, 1581120000, NULL, NULL, 'Borg Borgleson'),
(131, 131, 1581120000, NULL, NULL, 'Borg Borgleson'),
(132, 132, 1581120000, NULL, NULL, 'Borg Borgleson'),
(133, 133, 1581120000, NULL, NULL, 'Borg Borgleson'),
(134, 134, 1581120000, NULL, NULL, 'Borg Borgleson'),
(135, 135, 1581120000, NULL, NULL, 'Borg Borgleson'),
(136, 136, 1581120000, NULL, NULL, 'Borg Borgleson'),
(137, 137, 1581120000, NULL, NULL, 'Borg Borgleson'),
(138, 138, 1581120000, NULL, NULL, 'Borg Borgleson'),
(139, 139, 1581120000, NULL, NULL, 'Borg Borgleson'),
(140, 140, 1581120000, NULL, NULL, 'Borg Borgleson'),
(141, 141, 1581120000, NULL, NULL, 'Borg Borgleson'),
(142, 142, 1581120000, NULL, NULL, 'Borg Borgleson'),
(143, 143, 1581120000, NULL, NULL, 'Borg Borgleson'),
(144, 144, 1581120000, NULL, NULL, 'Borg Borgleson'),
(145, 145, 1581120000, NULL, NULL, 'Borg Borgleson'),
(146, 146, 1581120000, NULL, NULL, 'Borg Borgleson'),
(147, 147, 1581120000, NULL, NULL, 'Borg Borgleson'),
(148, 148, 1581120000, NULL, NULL, 'Borg Borgleson'),
(149, 149, 1581120000, NULL, NULL, 'Borg Borgleson'),
(150, 150, 1581120000, NULL, NULL, 'Borg Borgleson'),
(151, 151, 1581120000, NULL, NULL, 'Borg Borgleson'),
(152, 152, 1581120000, NULL, NULL, 'Borg Borgleson'),
(153, 153, 1581120000, NULL, NULL, 'Borg Borgleson'),
(154, 154, 1581120000, NULL, NULL, 'Borg Borgleson'),
(155, 155, 1581120000, NULL, NULL, 'Borg Borgleson'),
(156, 156, 1581120000, NULL, NULL, 'Borg Borgleson'),
(157, 157, 1581120000, NULL, NULL, 'Borg Borgleson'),
(158, 158, 1581120000, NULL, NULL, 'Borg Borgleson'),
(159, 159, 1581120000, NULL, NULL, 'Borg Borgleson'),
(160, 160, 1581120000, NULL, NULL, 'Borg Borgleson'),
(161, 161, 1581120000, NULL, NULL, 'Borg Borgleson'),
(162, 162, 1581120000, NULL, NULL, 'Borg Borgleson'),
(163, 163, 1581120000, NULL, NULL, 'Borg Borgleson'),
(164, 164, 1581120000, NULL, NULL, 'Borg Borgleson'),
(165, 165, 1581120000, NULL, NULL, 'Borg Borgleson');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clinician_program`
--
ALTER TABLE `clinician_program`
  ADD PRIMARY KEY (`clp_clinician_program_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clinician_program`
--
ALTER TABLE `clinician_program`
  MODIFY `clp_clinician_program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
