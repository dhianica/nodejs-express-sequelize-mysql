/*
SQLyog Ultimate v10.42 
MySQL - 5.5.5-10.1.37-MariaDB : Database - dashboard_polda
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dashboard_polda` /*!40100 DEFAULT CHARACTER SET latin1 */;

/*Table structure for table `tbl_comments` */

DROP TABLE IF EXISTS `tbl_comments`;

CREATE TABLE `tbl_comments` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `comment_value` text NOT NULL,
  `transaction_id` int(3) NOT NULL,
  `username` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_comments` */

/*Table structure for table `tbl_config_details` */

DROP TABLE IF EXISTS `tbl_config_details`;

CREATE TABLE `tbl_config_details` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `config_id` int(3) NOT NULL,
  `config_detail_name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_config_details` */

insert  into `tbl_config_details`(`id`,`config_id`,`config_detail_name`,`createdAt`,`updatedAt`) values (1,1,'perbatasan1','2020-02-16 08:24:40','2020-02-16 15:26:38'),(2,1,'perbatasan 2','2020-02-16 08:24:51','2020-02-16 15:24:51'),(3,1,'perbatasan 3','2020-02-16 08:24:54','2020-02-16 15:24:54');

/*Table structure for table `tbl_configs` */

DROP TABLE IF EXISTS `tbl_configs`;

CREATE TABLE `tbl_configs` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `config_name` varchar(100) NOT NULL,
  `config_type` varchar(20) NOT NULL,
  `config_description` text,
  `res_1` varchar(100) DEFAULT NULL,
  `res_2` varchar(100) DEFAULT NULL,
  `res_3` varchar(100) DEFAULT NULL,
  `res_4` varchar(100) DEFAULT NULL,
  `res_5` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_configs` */

insert  into `tbl_configs`(`id`,`config_name`,`config_type`,`config_description`,`res_1`,`res_2`,`res_3`,`res_4`,`res_5`,`createdAt`,`updatedAt`) values (1,'perbatasan','data','perbatasan 1','','','','','','2020-02-15 22:45:30','2020-02-16 05:48:58'),(2,'kejadian','data','kejadian','','','','','','2020-02-16 06:13:04','2020-02-16 13:13:04'),(3,'kegiatan','data','kegiatan 1','','','','','','2020-02-16 06:13:22','2020-02-16 13:36:45'),(4,'brimob','data','brimob 1','','','','','','2020-02-16 06:14:27','2020-02-16 13:37:28');

/*Table structure for table `tbl_org_structures` */

DROP TABLE IF EXISTS `tbl_org_structures`;

CREATE TABLE `tbl_org_structures` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `parent_id` int(3) DEFAULT NULL,
  `org_structure_name` varchar(100) NOT NULL,
  `org_structure_description` text NOT NULL,
  `map_id` int(3) NOT NULL,
  `res_1` varchar(100) DEFAULT NULL,
  `res_2` varchar(100) DEFAULT NULL,
  `res_3` varchar(100) DEFAULT NULL,
  `res_4` varchar(100) DEFAULT NULL,
  `res_5` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_org_structures` */

insert  into `tbl_org_structures`(`id`,`parent_id`,`org_structure_name`,`org_structure_description`,`map_id`,`res_1`,`res_2`,`res_3`,`res_4`,`res_5`,`createdAt`,`updatedAt`) values (1,0,'jawa barat','jawa barat',1,'','','','','','2020-02-16 10:25:02','2020-02-16 17:25:02'),(2,1,'ciamis','ciamis, jawa barat',1,'1','','','','','2020-02-16 10:25:24','2020-02-16 17:29:45');

/*Table structure for table `tbl_pois` */

DROP TABLE IF EXISTS `tbl_pois`;

CREATE TABLE `tbl_pois` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `poi_name` varchar(100) NOT NULL,
  `poi_address` varchar(200) DEFAULT NULL,
  `poi_lon` float NOT NULL,
  `poi_lat` float NOT NULL,
  `poi_type` int(3) NOT NULL,
  `poi_description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_pois` */

/*Table structure for table `tbl_transaction_photos` */

DROP TABLE IF EXISTS `tbl_transaction_photos`;

CREATE TABLE `tbl_transaction_photos` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `transaction_id` int(3) NOT NULL,
  `transaction_photos` text NOT NULL,
  `transaction_photos_description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_transaction_photos` */

/*Table structure for table `tbl_transactions` */

DROP TABLE IF EXISTS `tbl_transactions`;

CREATE TABLE `tbl_transactions` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `transaction_sid` varchar(30) NOT NULL,
  `transaction_description` text,
  `transaction_value` int(2) NOT NULL,
  `transaction_category` int(2) NOT NULL,
  `transaction_count_image` int(2) NOT NULL,
  `transaction_type` int(3) NOT NULL COMMENT 'config_id',
  `username` varchar(50) NOT NULL,
  `org_structure_id` int(3) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_transactions` */

/*Table structure for table `tbl_troops_transfers` */

DROP TABLE IF EXISTS `tbl_troops_transfers`;

CREATE TABLE `tbl_troops_transfers` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `org_structure_id_origin` int(3) NOT NULL,
  `org_structure_id_destination` int(3) NOT NULL,
  `troops_transfer_total` int(5) NOT NULL,
  `unity_id` int(3) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_troops_transfers` */

/*Table structure for table `tbl_user_tokens` */

DROP TABLE IF EXISTS `tbl_user_tokens`;

CREATE TABLE `tbl_user_tokens` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expired_date` datetime NOT NULL,
  `expired_timestamp` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_user_tokens` */

insert  into `tbl_user_tokens`(`id`,`username`,`token`,`expired_date`,`expired_timestamp`,`createdAt`,`updatedAt`) values (1,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4MTA1MjgsImV4cCI6MTYxMzM0NjUyOH0.RjN0X1PbeOUunIX0IFybSwc0JZAyL2XbCtd-si1fT3I','2020-02-16 00:14:15',1581812055,'2020-02-15 23:48:48','2020-02-16 07:14:15'),(2,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4MTEzNDQsImV4cCI6MTYxMzM0NzM0NH0.yv4Bsv4NyP9ycmn8Cjaaw9lFZqpMB3GabdTH8bKc4B0','2021-02-15 00:02:24',1581811407,'2020-02-16 00:02:24','2020-02-16 07:05:25'),(3,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4MTE4MDIsImV4cCI6MTYxMzM0NzgwMn0.V5-ntjvDA00ZDYtLQqxVc00o6Ck1ZpO-3-7TDdxhXMg','2020-02-16 00:14:33',1581812073,'2020-02-16 00:10:02','2020-02-16 07:14:33'),(4,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4MTIzODYsImV4cCI6MTYxMzM0ODM4Nn0.GPM9sw5_wZuXL-mODacI_43DKJ2zTlZQd0VzHbJglyE','2020-02-16 05:58:40',1581832720,'2020-02-16 00:19:46','2020-02-16 12:58:40'),(5,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4MzI2OTIsImV4cCI6MTYxMzM2ODY5Mn0.fHz8mlLIhO95Q3nyEs8MGWt3s9_D06CLKAWOHHkmV4g','2020-02-16 05:58:43',1581832723,'2020-02-16 05:58:12','2020-02-16 12:58:43'),(6,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4MzI3OTgsImV4cCI6MTYxMzM2ODc5OH0.fsH8cN_CeYzf_GNBa645MTDa2qViLymqj2gbC4vh9Mw','2020-02-16 06:00:13',1581832813,'2020-02-16 05:59:58','2020-02-16 13:00:13'),(7,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4MzMwMjcsImV4cCI6MTYxMzM2OTAyN30.sTr2YfT6AbPMgDTk3JDHmuqYsdwr4ShBxgp_nKBYXx4','2020-02-16 06:06:04',1581833164,'2020-02-16 06:03:47','2020-02-16 13:06:04'),(8,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4MzM1NTksImV4cCI6MTYxMzM2OTU1OX0.vHcFv5RkzYg0tQoMjicbwBj6b2Dz_kjnCwBmmfCI1ts','2020-02-16 06:13:19',1581833599,'2020-02-16 06:12:39','2020-02-16 13:13:19'),(9,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4MzM2NTYsImV4cCI6MTYxMzM2OTY1Nn0.OQcOyTFhYcPM1L196CfTRCchyFRqWkX4aJKF9ZJvvKk','2020-02-16 06:14:31',1581833671,'2020-02-16 06:14:16','2020-02-16 13:14:31'),(10,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4MzQ2OTUsImV4cCI6MTYxMzM3MDY5NX0.IGBEZ5HWZO4N5jcvhgUnjALUhF1uRIMYx60Y_ywrLaE','2021-02-15 06:31:35',1613370695,'2020-02-16 06:31:35','2020-02-16 13:31:35'),(11,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4NDgzNzIsImV4cCI6MTYxMzM4NDM3Mn0.0IpgWLvSbeefl3wMElKgvO7iUO5ZbJLFHOFoCPuAgbI','2021-02-15 10:19:32',1613384372,'2020-02-16 10:19:32','2020-02-16 17:19:32'),(12,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODQyNTIsImV4cCI6MTYxMzQyMDI1Mn0.RJ7zYbxlHIWahNkOebjAtHmDgQ6SkRyVydHQbBWT1ec','2021-02-15 20:17:32',1613420252,'2020-02-16 20:17:32','2020-02-17 03:17:32'),(13,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODYyODQsImV4cCI6MTYxMzQyMjI4NH0._bs8lxpgq322E8Qtb2tKLOKS31Hc2HGChDC8tAngaUk','2021-02-15 20:51:24',1613422284,'2020-02-16 20:51:24','2020-02-17 03:51:24'),(14,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODYzMjgsImV4cCI6MTYxMzQyMjMyOH0.VZkK-QPviFoR7f6hmJ577UOkas5UbYMhrOc8_6xKtCo','2021-02-15 20:52:08',1613422328,'2020-02-16 20:52:08','2020-02-17 03:52:08'),(15,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODY2OTMsImV4cCI6MTYxMzQyMjY5M30.yIWbSQatPUDCTRDKq3ho2IpVvyNElRhJXhZRVzr0OcY','2021-02-15 20:58:13',1613422693,'2020-02-16 20:58:13','2020-02-17 03:58:13'),(16,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODY3MDksImV4cCI6MTYxMzQyMjcwOX0.cCU7BiCG-juRwQ9fy_ccWOYljaURt5BwtpXmnyhpLAk','2021-02-15 20:58:29',1613422709,'2020-02-16 20:58:29','2020-02-17 03:58:29'),(17,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODY4MTEsImV4cCI6MTYxMzQyMjgxMX0.kcFNFe8zd-EHakgJbk50RukuPulYNYNtDThvZyy_6_A','2021-02-15 21:00:11',1613422811,'2020-02-16 21:00:11','2020-02-17 04:00:11'),(18,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODcwNzUsImV4cCI6MTYxMzQyMzA3NX0.rA97QDLUK0Bx6KLy1ECZnJCvhjQCPq9VflmrKPgxnuQ','2021-02-15 21:04:35',1613423075,'2020-02-16 21:04:35','2020-02-17 04:04:35'),(19,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODcwNzcsImV4cCI6MTYxMzQyMzA3N30.YyUV8CZG8S6fxkwzoscKIiqAODAwLK1ofvRUZnVH3Xk','2021-02-15 21:04:37',1613423077,'2020-02-16 21:04:37','2020-02-17 04:04:37'),(20,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODcwODgsImV4cCI6MTYxMzQyMzA4OH0.K-acWLr7B929BI5DYvjAiGex17Uslx9s97PRHXzZgXg','2021-02-15 21:04:48',1613423088,'2020-02-16 21:04:48','2020-02-17 04:04:48'),(21,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODcyODIsImV4cCI6MTYxMzQyMzI4Mn0.vuv6J5WXijxjsomqDxKAv5umOXz-AqxUevBn8XiaJdc','2021-02-15 21:08:02',1613423282,'2020-02-16 21:08:02','2020-02-17 04:08:02'),(22,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODczMzIsImV4cCI6MTYxMzQyMzMzMn0.q75n9BB1Qx4_1UaJ-CuUxrUWM5ISjLJO3Aes_M5hvF0','2021-02-15 21:08:52',1613423332,'2020-02-16 21:08:52','2020-02-17 04:08:52'),(23,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE4ODc0NTEsImV4cCI6MTYxMzQyMzQ1MX0.yEkTWWdHxUvOyY4Mtrr6iAU5IKdM6KkLOMeo-ODH-y0','2021-02-15 21:10:51',1613423451,'2020-02-16 21:10:51','2020-02-17 04:10:51'),(24,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE5MTA0ODYsImV4cCI6MTYxMzQ0NjQ4Nn0.KD0ffuwFvFTOWXyOSSUyAcR-XpBETiQL3x6TLOLc0aM','2021-02-16 03:34:46',1613446486,'2020-02-17 03:34:46','2020-02-17 10:34:46'),(25,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE5MTA0ODgsImV4cCI6MTYxMzQ0NjQ4OH0.nDpqmsFJmQaOXPgOgw0qOUi7rHStRjymt5WHKq0LZcM','2021-02-16 03:34:48',1613446488,'2020-02-17 03:34:48','2020-02-17 10:34:48'),(26,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE5NTU2MTgsImV4cCI6MTYxMzQ5MTYxOH0.qwz4_QlRoVOFEQqxnbPCU3wN6mu6MgMo2YmYZVH9_P8','2021-02-16 16:06:58',1613491618,'2020-02-17 16:06:58','2020-02-17 23:06:58'),(27,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE5NTU2NTgsImV4cCI6MTYxMzQ5MTY1OH0.dOpq61pejba_DD1OElz1MgreVZ1jtUyW49FwZa3pVMk','2021-02-16 16:07:38',1613491658,'2020-02-17 16:07:38','2020-02-17 23:07:38'),(28,'tester','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE5NTU3MjYsImV4cCI6MTYxMzQ5MTcyNn0.ilILQJansJXU9pvGYulsULKzchlR_9d4VjA5al1jy2M','2021-02-16 16:08:46',1613491726,'2020-02-17 16:08:46','2020-02-17 23:08:46');

/*Table structure for table `tbl_users` */

DROP TABLE IF EXISTS `tbl_users`;

CREATE TABLE `tbl_users` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `user_number` varchar(30) NOT NULL COMMENT 'NRP',
  `user_fullname` varchar(100) NOT NULL,
  `user_nickname` varchar(50) DEFAULT NULL,
  `user_type` int(3) NOT NULL COMMENT 'config_id',
  `org_structure_id` int(3) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `password_salt` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_users` */

insert  into `tbl_users`(`id`,`user_number`,`user_fullname`,`user_nickname`,`user_type`,`org_structure_id`,`username`,`password`,`password_salt`,`createdAt`,`updatedAt`) values (2,'1241241','TESTER','TESTER',1,1,'tester','$2b$10$1ZYTi3rdkGmLvi2V3zE8fO7OjlpW49disg50jGFBzP9cjWq3tlQ2G','$2b$10$1ZYTi3rdkGmLvi2V3zE8fO','2020-02-15 22:42:04','2020-02-16 05:42:04');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
