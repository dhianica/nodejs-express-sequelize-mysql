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
/*Table structure for table `tbl_org_structures` */

DROP TABLE IF EXISTS `tbl_org_structures`;

CREATE TABLE `tbl_org_structures` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `parent_id` int(3) DEFAULT NULL,
  `org_structure_name` varchar(100) NOT NULL,
  `org_structure_description` text NOT NULL,
  `map_id` int(3) NOT NULL,
  `map_spatial` text NOT NULL,
  `res_1` varchar(100) DEFAULT NULL,
  `res_2` varchar(100) DEFAULT NULL,
  `res_3` varchar(100) DEFAULT NULL,
  `res_4` varchar(100) DEFAULT NULL,
  `res_5` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
