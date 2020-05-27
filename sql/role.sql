CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `role_level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

INSERT INTO `role` ( `role_id`, `role_name`,`role_level`) VALUES
(1,'Administrator', 1),
(2,'Supervisor', 2),
(3,'Clinician', 3),
(4,'Data Entry', 3);