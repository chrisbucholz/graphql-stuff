-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2020 at 09:28 PM
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
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `c_client_id` int(11) NOT NULL,
  `c_first_name` varchar(255) NOT NULL,
  `c_last_name` varchar(255) NOT NULL,
  `c_full_name` varchar(255) NOT NULL,
  `c_dob` bigint(20) NOT NULL,
  `c_file_no` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`c_client_id`, `c_first_name`, `c_last_name`, `c_full_name`, `c_dob`, `c_file_no`) VALUES
(1, 'Aaren', 'DerAaren', 'Aaren DerAaren', 325036800, 'N000000'),
(2, 'Aarika', 'DerAarika', 'Aarika DerAarika', 325036800, 'N000001'),
(3, 'Abagael', 'DerAbagael', 'Abagael DerAbagael', 325036800, 'N000002'),
(4, 'Abagail', 'DerAbagail', 'Abagail DerAbagail', 325036800, 'N000003'),
(5, 'Abbe', 'DerAbbe', 'Abbe DerAbbe', 325036800, 'N000004'),
(6, 'Abbey', 'DerAbbey', 'Abbey DerAbbey', 325036800, 'N000005'),
(7, 'Abbi', 'DerAbbi', 'Abbi DerAbbi', 325036800, 'N000006'),
(8, 'Abbie', 'DerAbbie', 'Abbie DerAbbie', 325036800, 'N000007'),
(9, 'Abby', 'DerAbby', 'Abby DerAbby', 325036800, 'N000008'),
(10, 'Abbye', 'DerAbbye', 'Abbye DerAbbye', 325036800, 'N000009'),
(11, 'Abigael', 'DerAbigael', 'Abigael DerAbigael', 325036800, 'N0000010'),
(12, 'Abigail', 'DerAbigail', 'Abigail DerAbigail', 325036800, 'N0000011'),
(13, 'Abigale', 'DerAbigale', 'Abigale DerAbigale', 325036800, 'N0000012'),
(14, 'Abra', 'DerAbra', 'Abra DerAbra', 325036800, 'N0000013'),
(15, 'Ada', 'DerAda', 'Ada DerAda', 325036800, 'N0000014'),
(16, 'Adah', 'DerAdah', 'Adah DerAdah', 325036800, 'N0000015'),
(17, 'Adaline', 'DerAdaline', 'Adaline DerAdaline', 325036800, 'N0000016'),
(18, 'Adan', 'DerAdan', 'Adan DerAdan', 325036800, 'N0000017'),
(19, 'Adara', 'DerAdara', 'Adara DerAdara', 325036800, 'N0000018'),
(20, 'Adda', 'DerAdda', 'Adda DerAdda', 325036800, 'N0000019'),
(21, 'Addi', 'DerAddi', 'Addi DerAddi', 325036800, 'N0000020'),
(22, 'Addia', 'DerAddia', 'Addia DerAddia', 325036800, 'N0000021'),
(23, 'Addie', 'DerAddie', 'Addie DerAddie', 325036800, 'N0000022'),
(24, 'Addy', 'DerAddy', 'Addy DerAddy', 325036800, 'N0000023'),
(25, 'Adel', 'DerAdel', 'Adel DerAdel', 325036800, 'N0000024'),
(26, 'Adela', 'DerAdela', 'Adela DerAdela', 325036800, 'N0000025'),
(27, 'Adelaida', 'DerAdelaida', 'Adelaida DerAdelaida', 325036800, 'N0000026'),
(28, 'Adelaide', 'DerAdelaide', 'Adelaide DerAdelaide', 325036800, 'N0000027'),
(29, 'Adele', 'DerAdele', 'Adele DerAdele', 325036800, 'N0000028'),
(30, 'Adelheid', 'DerAdelheid', 'Adelheid DerAdelheid', 325036800, 'N0000029'),
(31, 'Adelice', 'DerAdelice', 'Adelice DerAdelice', 325036800, 'N0000030'),
(32, 'Adelina', 'DerAdelina', 'Adelina DerAdelina', 325036800, 'N0000031'),
(33, 'Adelind', 'DerAdelind', 'Adelind DerAdelind', 325036800, 'N0000032'),
(34, 'Adeline', 'DerAdeline', 'Adeline DerAdeline', 325036800, 'N0000033'),
(35, 'Adella', 'DerAdella', 'Adella DerAdella', 325036800, 'N0000034'),
(36, 'Adelle', 'DerAdelle', 'Adelle DerAdelle', 325036800, 'N0000035'),
(37, 'Adena', 'DerAdena', 'Adena DerAdena', 325036800, 'N0000036'),
(38, 'Adey', 'DerAdey', 'Adey DerAdey', 325036800, 'N0000037'),
(39, 'Adi', 'DerAdi', 'Adi DerAdi', 325036800, 'N0000038'),
(40, 'Adiana', 'DerAdiana', 'Adiana DerAdiana', 325036800, 'N0000039'),
(41, 'Adina', 'DerAdina', 'Adina DerAdina', 325036800, 'N0000040'),
(42, 'Adora', 'DerAdora', 'Adora DerAdora', 325036800, 'N0000041'),
(43, 'Adore', 'DerAdore', 'Adore DerAdore', 325036800, 'N0000042'),
(44, 'Adoree', 'DerAdoree', 'Adoree DerAdoree', 325036800, 'N0000043'),
(45, 'Adorne', 'DerAdorne', 'Adorne DerAdorne', 325036800, 'N0000044'),
(46, 'Adrea', 'DerAdrea', 'Adrea DerAdrea', 325036800, 'N0000045'),
(47, 'Adria', 'DerAdria', 'Adria DerAdria', 325036800, 'N0000046'),
(48, 'Adriaens', 'DerAdriaens', 'Adriaens DerAdriaens', 325036800, 'N0000047'),
(49, 'Adrian', 'DerAdrian', 'Adrian DerAdrian', 325036800, 'N0000048'),
(50, 'Adriana', 'DerAdriana', 'Adriana DerAdriana', 325036800, 'N0000049'),
(51, 'Adriane', 'DerAdriane', 'Adriane DerAdriane', 325036800, 'N0000050'),
(52, 'Adrianna', 'DerAdrianna', 'Adrianna DerAdrianna', 325036800, 'N0000051'),
(53, 'Adrianne', 'DerAdrianne', 'Adrianne DerAdrianne', 325036800, 'N0000052'),
(54, 'Adriena', 'DerAdriena', 'Adriena DerAdriena', 325036800, 'N0000053'),
(55, 'Adrienne', 'DerAdrienne', 'Adrienne DerAdrienne', 325036800, 'N0000054'),
(56, 'Aeriel', 'DerAeriel', 'Aeriel DerAeriel', 325036800, 'N0000055'),
(57, 'Aeriela', 'DerAeriela', 'Aeriela DerAeriela', 325036800, 'N0000056'),
(58, 'Aeriell', 'DerAeriell', 'Aeriell DerAeriell', 325036800, 'N0000057'),
(59, 'Afton', 'DerAfton', 'Afton DerAfton', 325036800, 'N0000058'),
(60, 'Ag', 'DerAg', 'Ag DerAg', 325036800, 'N0000059'),
(61, 'Agace', 'DerAgace', 'Agace DerAgace', 325036800, 'N0000060'),
(62, 'Agata', 'DerAgata', 'Agata DerAgata', 325036800, 'N0000061'),
(63, 'Agatha', 'DerAgatha', 'Agatha DerAgatha', 325036800, 'N0000062'),
(64, 'Agathe', 'DerAgathe', 'Agathe DerAgathe', 325036800, 'N0000063'),
(65, 'Aggi', 'DerAggi', 'Aggi DerAggi', 325036800, 'N0000064'),
(66, 'Aggie', 'DerAggie', 'Aggie DerAggie', 325036800, 'N0000065'),
(67, 'Aggy', 'DerAggy', 'Aggy DerAggy', 325036800, 'N0000066'),
(68, 'Agna', 'DerAgna', 'Agna DerAgna', 325036800, 'N0000067'),
(69, 'Agnella', 'DerAgnella', 'Agnella DerAgnella', 325036800, 'N0000068'),
(70, 'Agnes', 'DerAgnes', 'Agnes DerAgnes', 325036800, 'N0000069'),
(71, 'Agnese', 'DerAgnese', 'Agnese DerAgnese', 325036800, 'N0000070'),
(72, 'Agnesse', 'DerAgnesse', 'Agnesse DerAgnesse', 325036800, 'N0000071'),
(73, 'Agneta', 'DerAgneta', 'Agneta DerAgneta', 325036800, 'N0000072'),
(74, 'Agnola', 'DerAgnola', 'Agnola DerAgnola', 325036800, 'N0000073'),
(75, 'Agretha', 'DerAgretha', 'Agretha DerAgretha', 325036800, 'N0000074'),
(76, 'Aida', 'DerAida', 'Aida DerAida', 325036800, 'N0000075'),
(77, 'Aidan', 'DerAidan', 'Aidan DerAidan', 325036800, 'N0000076'),
(78, 'Aigneis', 'DerAigneis', 'Aigneis DerAigneis', 325036800, 'N0000077'),
(79, 'Aila', 'DerAila', 'Aila DerAila', 325036800, 'N0000078'),
(80, 'Aile', 'DerAile', 'Aile DerAile', 325036800, 'N0000079'),
(81, 'Ailee', 'DerAilee', 'Ailee DerAilee', 325036800, 'N0000080'),
(82, 'Aileen', 'DerAileen', 'Aileen DerAileen', 325036800, 'N0000081'),
(83, 'Ailene', 'DerAilene', 'Ailene DerAilene', 325036800, 'N0000082'),
(84, 'Ailey', 'DerAiley', 'Ailey DerAiley', 325036800, 'N0000083'),
(85, 'Aili', 'DerAili', 'Aili DerAili', 325036800, 'N0000084'),
(86, 'Ailina', 'DerAilina', 'Ailina DerAilina', 325036800, 'N0000085'),
(87, 'Ailis', 'DerAilis', 'Ailis DerAilis', 325036800, 'N0000086'),
(88, 'Ailsun', 'DerAilsun', 'Ailsun DerAilsun', 325036800, 'N0000087'),
(89, 'Ailyn', 'DerAilyn', 'Ailyn DerAilyn', 325036800, 'N0000088'),
(90, 'Aime', 'DerAime', 'Aime DerAime', 325036800, 'N0000089'),
(91, 'Aimee', 'DerAimee', 'Aimee DerAimee', 325036800, 'N0000090'),
(92, 'Aimil', 'DerAimil', 'Aimil DerAimil', 325036800, 'N0000091'),
(93, 'Aindrea', 'DerAindrea', 'Aindrea DerAindrea', 325036800, 'N0000092'),
(94, 'Ainslee', 'DerAinslee', 'Ainslee DerAinslee', 325036800, 'N0000093'),
(95, 'Ainsley', 'DerAinsley', 'Ainsley DerAinsley', 325036800, 'N0000094'),
(96, 'Ainslie', 'DerAinslie', 'Ainslie DerAinslie', 325036800, 'N0000095'),
(97, 'Ajay', 'DerAjay', 'Ajay DerAjay', 325036800, 'N0000096'),
(98, 'Alaine', 'DerAlaine', 'Alaine DerAlaine', 325036800, 'N0000097'),
(99, 'Alameda', 'DerAlameda', 'Alameda DerAlameda', 325036800, 'N0000098'),
(100, 'Alana', 'DerAlana', 'Alana DerAlana', 325036800, 'N0000099'),
(101, 'Alanah', 'DerAlanah', 'Alanah DerAlanah', 325036800, 'N00000100'),
(102, 'Alane', 'DerAlane', 'Alane DerAlane', 325036800, 'N00000101'),
(103, 'Alanna', 'DerAlanna', 'Alanna DerAlanna', 325036800, 'N00000102'),
(104, 'Alayne', 'DerAlayne', 'Alayne DerAlayne', 325036800, 'N00000103'),
(105, 'Alberta', 'DerAlberta', 'Alberta DerAlberta', 325036800, 'N00000104'),
(106, 'Albertina', 'DerAlbertina', 'Albertina DerAlbertina', 325036800, 'N00000105'),
(107, 'Albertine', 'DerAlbertine', 'Albertine DerAlbertine', 325036800, 'N00000106'),
(108, 'Albina', 'DerAlbina', 'Albina DerAlbina', 325036800, 'N00000107'),
(109, 'Alecia', 'DerAlecia', 'Alecia DerAlecia', 325036800, 'N00000108'),
(110, 'Aleda', 'DerAleda', 'Aleda DerAleda', 325036800, 'N00000109'),
(111, 'Aleece', 'DerAleece', 'Aleece DerAleece', 325036800, 'N00000110'),
(112, 'Aleen', 'DerAleen', 'Aleen DerAleen', 325036800, 'N00000111'),
(113, 'Alejandra', 'DerAlejandra', 'Alejandra DerAlejandra', 325036800, 'N00000112'),
(114, 'Alejandrina', 'DerAlejandrina', 'Alejandrina DerAlejandrina', 325036800, 'N00000113'),
(115, 'Alena', 'DerAlena', 'Alena DerAlena', 325036800, 'N00000114'),
(116, 'Alene', 'DerAlene', 'Alene DerAlene', 325036800, 'N00000115'),
(117, 'Alessandra', 'DerAlessandra', 'Alessandra DerAlessandra', 325036800, 'N00000116'),
(118, 'Aleta', 'DerAleta', 'Aleta DerAleta', 325036800, 'N00000117'),
(119, 'Alethea', 'DerAlethea', 'Alethea DerAlethea', 325036800, 'N00000118'),
(120, 'Alex', 'DerAlex', 'Alex DerAlex', 325036800, 'N00000119'),
(121, 'Alexa', 'DerAlexa', 'Alexa DerAlexa', 325036800, 'N00000120'),
(122, 'Alexandra', 'DerAlexandra', 'Alexandra DerAlexandra', 325036800, 'N00000121'),
(123, 'Alexandrina', 'DerAlexandrina', 'Alexandrina DerAlexandrina', 325036800, 'N00000122'),
(124, 'Alexi', 'DerAlexi', 'Alexi DerAlexi', 325036800, 'N00000123'),
(125, 'Alexia', 'DerAlexia', 'Alexia DerAlexia', 325036800, 'N00000124'),
(126, 'Alexina', 'DerAlexina', 'Alexina DerAlexina', 325036800, 'N00000125'),
(127, 'Alexine', 'DerAlexine', 'Alexine DerAlexine', 325036800, 'N00000126'),
(128, 'Alexis', 'DerAlexis', 'Alexis DerAlexis', 325036800, 'N00000127'),
(129, 'Alfi', 'DerAlfi', 'Alfi DerAlfi', 325036800, 'N00000128'),
(130, 'Alfie', 'DerAlfie', 'Alfie DerAlfie', 325036800, 'N00000129'),
(131, 'Alfreda', 'DerAlfreda', 'Alfreda DerAlfreda', 325036800, 'N00000130'),
(132, 'Alfy', 'DerAlfy', 'Alfy DerAlfy', 325036800, 'N00000131'),
(133, 'Ali', 'DerAli', 'Ali DerAli', 325036800, 'N00000132'),
(134, 'Alia', 'DerAlia', 'Alia DerAlia', 325036800, 'N00000133'),
(135, 'Alica', 'DerAlica', 'Alica DerAlica', 325036800, 'N00000134'),
(136, 'Alice', 'DerAlice', 'Alice DerAlice', 325036800, 'N00000135'),
(137, 'Alicea', 'DerAlicea', 'Alicea DerAlicea', 325036800, 'N00000136'),
(138, 'Alicia', 'DerAlicia', 'Alicia DerAlicia', 325036800, 'N00000137'),
(139, 'Alida', 'DerAlida', 'Alida DerAlida', 325036800, 'N00000138'),
(140, 'Alidia', 'DerAlidia', 'Alidia DerAlidia', 325036800, 'N00000139'),
(141, 'Alie', 'DerAlie', 'Alie DerAlie', 325036800, 'N00000140'),
(142, 'Alika', 'DerAlika', 'Alika DerAlika', 325036800, 'N00000141'),
(143, 'Alikee', 'DerAlikee', 'Alikee DerAlikee', 325036800, 'N00000142'),
(144, 'Alina', 'DerAlina', 'Alina DerAlina', 325036800, 'N00000143'),
(145, 'Aline', 'DerAline', 'Aline DerAline', 325036800, 'N00000144'),
(146, 'Alis', 'DerAlis', 'Alis DerAlis', 325036800, 'N00000145'),
(147, 'Alisa', 'DerAlisa', 'Alisa DerAlisa', 325036800, 'N00000146'),
(148, 'Alisha', 'DerAlisha', 'Alisha DerAlisha', 325036800, 'N00000147'),
(149, 'Alison', 'DerAlison', 'Alison DerAlison', 325036800, 'N00000148'),
(150, 'Alissa', 'DerAlissa', 'Alissa DerAlissa', 325036800, 'N00000149'),
(151, 'Alisun', 'DerAlisun', 'Alisun DerAlisun', 325036800, 'N00000150'),
(152, 'Alix', 'DerAlix', 'Alix DerAlix', 325036800, 'N00000151'),
(153, 'Aliza', 'DerAliza', 'Aliza DerAliza', 325036800, 'N00000152'),
(154, 'Alla', 'DerAlla', 'Alla DerAlla', 325036800, 'N00000153'),
(155, 'Alleen', 'DerAlleen', 'Alleen DerAlleen', 325036800, 'N00000154'),
(156, 'Allegra', 'DerAllegra', 'Allegra DerAllegra', 325036800, 'N00000155'),
(157, 'Allene', 'DerAllene', 'Allene DerAllene', 325036800, 'N00000156'),
(158, 'Alli', 'DerAlli', 'Alli DerAlli', 325036800, 'N00000157'),
(159, 'Allianora', 'DerAllianora', 'Allianora DerAllianora', 325036800, 'N00000158'),
(160, 'Allie', 'DerAllie', 'Allie DerAllie', 325036800, 'N00000159'),
(161, 'Allina', 'DerAllina', 'Allina DerAllina', 325036800, 'N00000160'),
(162, 'Allis', 'DerAllis', 'Allis DerAllis', 325036800, 'N00000161'),
(163, 'Allison', 'DerAllison', 'Allison DerAllison', 325036800, 'N00000162'),
(164, 'Allissa', 'DerAllissa', 'Allissa DerAllissa', 325036800, 'N00000163'),
(165, 'Allix', 'DerAllix', 'Allix DerAllix', 325036800, 'N00000164');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`c_client_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `c_client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
