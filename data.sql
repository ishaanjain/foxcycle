# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.24)
# Database: dev
# Generation Time: 2019-03-07 02:15:13 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table about
# ------------------------------------------------------------

DROP TABLE IF EXISTS `about`;

CREATE TABLE `about` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL DEFAULT '',
  `address` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(255) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL DEFAULT '',
  `imageurl` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `about` WRITE;
/*!40000 ALTER TABLE `about` DISABLE KEYS */;

INSERT INTO `about` (`id`, `description`, `address`, `phone`, `title`, `imageurl`)
VALUES
	(1,'Hello World','10243 CSC307 Drive','654 134 1235','Our Story','https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/04/03/Pictures/_56db43e2-3722-11e8-8aa5-05fdb8d0ae52.jpg');

/*!40000 ALTER TABLE `about` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table announce
# ------------------------------------------------------------

DROP TABLE IF EXISTS `announce`;

CREATE TABLE `announce` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL DEFAULT '',
  `imageurl` varchar(255) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `announce` WRITE;
/*!40000 ALTER TABLE `announce` DISABLE KEYS */;

INSERT INTO `announce` (`id`, `description`, `imageurl`, `title`)
VALUES
	(1,'Hello World','https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/04/03/Pictures/_56db43e2-3722-11e8-8aa5-05fdb8d0ae52.jpg','Our Story');

/*!40000 ALTER TABLE `announce` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `imageUrls` varchar(255) DEFAULT NULL,
  `stockCount` int(11) NOT NULL DEFAULT '0',
  `inStoreOnly` tinyint(4) NOT NULL DEFAULT '0',
  `tagString` varchar(255) DEFAULT NULL,
  `description` varchar(2040) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `name`, `price`, `imageUrls`, `stockCount`, `inStoreOnly`, `tagString`, `description`)
VALUES
	(25,'Marin Fairfax SC2 - 2018',5000,'https://www.tiptopbikeshop.com/images/library/zoom/marin-fairfax-sc2-289205-1.jpg',10,0,'brand:Marin;color:White;size:Medium;type:Road','The Fairfax SC2 gets you there quicker with its lightweight Series 2 alloy frame and upgrades that include a lighter weight aluminum fork and wide-range 3 x 9-speed Shimano Acera drivetrain. With 27 speeds, durable double-wall rims, and Schwalbe Road Cruiser puncture-resistant tires, plus an ergonomic saddle and grips, the Fairfax SC2 transforms your daily commute into a comfortable daily adventure.'),
	(26,'Kona Ute - 2019',1599,'https://www.tiptopbikeshop.com/images/library/zoom/kona-ute-350908-1.jpg',6,0,'brand:Kona;color:Matte Black;size:Large;type:Road','Multiple Bike-of-the-Year awards speak for themselves. The Ute is a well-designed, carry-everything utility bike that makes quick work of trips to the store, dropping the kids off at school and bringing the tree home for the holidays. We didn?t need any awards to tell us how rad this bike is, but it?s nice to see that other people get it.'),
	(29,'Blix Electric Bikes Aveny Step-Through - 2017',123,'https://www.tiptopbikeshop.com/images/library/zoom/blix-electric-bikes-aveny-step-through-297309-1.jpg',7,0,'brand:Willier;color:Orange;size:Medium;type:Road','Effortlessly explore new avenues to recreation and transportation with Blix\'s Aveny. The SpinTech electric assist system powers you up to 20mph and features a throttle for power on demand. With a range up to 40 miles or 60 miles, depending on the battery you choose, you can roam all over town with peace of mind. With the included rack and basket, you can carry what you need to run errands, go to work, or have a picnic. The upright fit of Aveny is comfortable and lets you enjoy the sights, while integrated lights and disc brakes keep you visible and in control.'),
	(30,'Civia Lowry Step Thru 7-Speed - 2019',479,'https://www.tiptopbikeshop.com/images/library/zoom/civia-lowry-step-thru-7-speed-258568-1.jpg',7,0,'brand:Civia;color:Light Blue;size:Large;type:Cruiser','Roll down to the local boulangerie for a fresh baguette aboard the Civia Lowry Step Thru 7-speed. It combines the grace and elegance of classic commuting bikes with a low maintenance and an easy-riding ethos, that\'ll have you feeling instantly at home. The reinforced steel frame and fork features an upright riding position for comfort and easy viewing of the road ahead. The 7-speed Shimano drivetrain provides reliable, crisp shifting, an ergonomically bent handlebar keeps your hands comfortable, and strong brakes slow you down even when the bike is loaded with heaps of fresh pastries.'),
	(31,'Surly Disc Trucker - 2018',1550,'https://www.tiptopbikeshop.com/images/library/large/surly-disc-trucker-328511-11.jpg',61,0,'brand:Surly;color:Grey;size:Medium;type:Road','Surly\'s Long Haul Trucker enjoys a reputation as one of the best riding and most value-packed touring bikes out there. It\'s been around long enough to be tested in the real world, in all kinds of places, with all kinds of loads on all kinds of roads.\n\nSometimes, however, a combination of load, climate and terrain demands a bit more braking performance than a standard rim-brake LHT can provide. That\'s where the Disc Trucker comes in. Disc Trucker is a Long Haul Trucker specifically designed for the unique forces discs impose. Surly made sure it can run discs, racks, and fenders with no jury rigging, a somewhat unique feature they\'ve just now decided to call Simulpatibility.\n\nMost of the components on the complete bike are the same as the standard LHT; parts chosen for their balance of technical capability, durability, and value. The drivetrain uses the sort of wide gearing you will need for loaded and unloaded travel, cable operated disc brakes for their proven reliability and ease of service, and hubs that are durable and easy to maintain.\n\nYou\'ll need to outfit it with the extras you want, like fenders and racks. Surly doesn\'t include that stuff because everybody\'s needs are different. From the casual commuter to the person who rides around the world more than once, the Disc Trucker is more than capable. It\'s a tool designed from the ground up to take you and a bunch of stuff just about anywhere you\'d like to go. It is a tool to help you get lost and find yourself.'),
	(32,'Surly Lowside - 2018',960,'https://www.tiptopbikeshop.com/images/library/large/surly-lowside-240198-1-11-1.jpg',9,0,'brand:Surly;color:Black;size:Small;type:BMX','The Surly Lowside is the bike that gets you across town for a quick rip on singletrack, then over to the bar for a night out. It?s the bike you turn to when you?re not entirely sure what the night has in store. It?s the bike to grab when you want to have just as much fun riding to the trail as you do on the trail, itself. Singlespeeding is an integral part of Surly?s DNA, and the Lowside continues the tradition, by taking a simpler approach to trail riding.\n\n- 100% Surly 4130 chromoly frame, main triangle is double-butted; 1 1/8\" threadless chromoly fork\n- Singlespeed \"specific\" (derailleur hanger: yes; Trip Guides: no)\n- Dropper post routing\n- Gnot-Boost rear spacing\n- Front and rear thru-axles\n- 26 x 3\" or 27.5 x 2.8\" tire clearance'),
	(33,'Salsa Marrakesh Flat Bar - 2017',1599,'https://www.tiptopbikeshop.com/images/library/large/salsa-marrakesh-flat-bar-282390-1.jpg',10,0,'brand:Salsa;color:Blue;size:Medium;type:Road','With the smooth-riding, cargo-hauling characteristics of the Salsa Marrakesh Flatbar, you might find yourself taking to life on the road for good. The Marrakesh is built for comfort over long distances with a sturdy chromoly frame and fork that soak-up fatiguing road vibration and provide numerous cargo-carrying options to suit any load. Reliability is key on any major tour, and Shimano\'s Deore 3x9-speed drivetrain paired to Microshift shifters provides solid shifting performance with easy maintenance and repairability. WTB SX-19 rims laced to Shimano Deore 36-hole hubs increase dependability and offer a robust platform for shouldering weight over paved and gravel roads alike, and Avid\'s reputable BB7M mechanical disc brakes and 160mm rotors provide confident control no matter what the weather brings. Clearance for up to 2.0-inch tires give the Marrakesh the ability to traverse rough singletrack when your adventure leaves the tarmac, and mounts for fender, cages, and racks ensure you\'ll never lack options for carrying everything you need.'),
	(34,'Civia Parkway Step-Thru Electric Bike - 2018',2799,'https://www.tiptopbikeshop.com/images/library/zoom/civia-parkway-327379-14.jpg',12,0,'brand:Civia;color:Light Blue;size:Medium;type:Electric','The Civia Parkway is the perfect ebike for experiencing the city. The there-when-you-need-it boost from Bosch?s ultra-reliable electric motor makes hills a breeze, while easy-to-use components celebrate the elegance of an uncomplicated bicycle. From no sweat crosstown commutes, to fitness rides, the Parkway is an exciting and fun option for getting around.\n\nHighlights:\n\n- Lightweight AL-6061 round frame tubing, rack and fender mounts\n- Bosch Active Line electric motor for gentle assist up to 20 mph\n- Equipped with Bosch Powerpack 400 frame battery, Purion compact computer, and 2A compact charger\n- Shimano 9-speed drivetrain and Shimano cable disc brakes\n- Kenda Kwick 26 x 2.0\" black/mocha tires with K-Shield\n- 26 x 2.3\" max. tire size without fenders'),
	(35,'Salsa Journeyman Apex 1 650',999,'https://www.tiptopbikeshop.com/images/library/zoom/salsa-journeyman-drop-bar-apex-650-346080-11.jpg',1,0,'brand:Salsa;color:Pink;size:Large;type:Mountain','The Salsa Journeyman is an all-road bike with the chops to fulfill a wide variety of missions. Journeyman Apex 1 650 offers the comfort and traction of a wider, WTB Nano 2.1-inch tire, and you?ll notice the difference in traction and ride quality immediately when you go off-road. It also features SRAM Apex 1x11 gearing, which is perfect for venturing farther off the beaten path with a wide range and low-maintenance design. TRP Spyre mechanical disc brakes feature dual piston movement for easy setup, simple adjustments, and field serviceability?all tremendous assets when you?re riding in the middle of nowhere. Salsa cockpit components keep you solidly in control while remaining unobtrusive and lightweight. Whether you?re wandering the backroads, bikepacking, or racing gravel, Journeyman is perfectly at home.');

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table product_tags_tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_tags_tag`;

CREATE TABLE `product_tags_tag` (
  `productId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  PRIMARY KEY (`productId`,`tagId`),
  KEY `FK_0de90b04710a86601acdff88c21` (`tagId`),
  CONSTRAINT `FK_0de90b04710a86601acdff88c21` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_208235f4a5c925f11171252b760` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `product_tags_tag` WRITE;
/*!40000 ALTER TABLE `product_tags_tag` DISABLE KEYS */;

INSERT INTO `product_tags_tag` (`productId`, `tagId`)
VALUES
	(31,113),
	(31,114),
	(31,115),
	(31,116),
	(32,117),
	(32,118),
	(32,119),
	(32,120),
	(33,121),
	(33,122),
	(33,123),
	(33,124),
	(34,125),
	(34,126),
	(34,127),
	(34,128),
	(35,129),
	(35,130),
	(35,131),
	(35,132),
	(26,137),
	(26,138),
	(26,139),
	(26,140),
	(29,141),
	(29,142),
	(29,143),
	(29,144),
	(30,145),
	(30,146),
	(30,147),
	(30,148),
	(25,149),
	(25,150),
	(25,151),
	(25,152);

/*!40000 ALTER TABLE `product_tags_tag` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table service
# ------------------------------------------------------------

DROP TABLE IF EXISTS `service`;

CREATE TABLE `service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL DEFAULT '10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table session
# ------------------------------------------------------------

DROP TABLE IF EXISTS `session`;

CREATE TABLE `session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expiresAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_3d2f174ef04fb312fdebd0ddc5` (`userId`),
  CONSTRAINT `FK_3d2f174ef04fb312fdebd0ddc53` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;

INSERT INTO `session` (`id`, `expiresAt`, `userId`)
VALUES
	(5,'2019-03-06 18:12:44',1),
	(9,'2019-03-06 18:35:48',9);

/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;

INSERT INTO `tag` (`id`, `name`)
VALUES
	(49,'brand:Blix'),
	(50,'color:Gloss Black'),
	(51,'size:Medium'),
	(52,'type:Road'),
	(53,'brand:Blix'),
	(54,'color:Gloss Black'),
	(55,'size:Medium'),
	(56,'type:Mountain'),
	(57,'brand:Blix'),
	(58,'color:Gloss Black'),
	(59,'size:Medium'),
	(60,'type:Road'),
	(61,'brand:Blix'),
	(62,'color:Gloss Black'),
	(63,'size:Medium'),
	(64,'type:Road'),
	(65,'brand:Blix'),
	(66,'color:Gloss Black'),
	(67,'size:Medium'),
	(68,'type:Road'),
	(69,'brand:Blix'),
	(70,'color:Gloss Black'),
	(71,'size:Medium'),
	(72,'type:Road'),
	(73,'brand:Blix'),
	(74,'color:Gloss Black'),
	(75,'size:Medium'),
	(76,'type:Road'),
	(77,'brand:Kona'),
	(78,'color:Matte Black'),
	(79,'size:Large'),
	(80,'type:Road'),
	(81,'brand:Kona'),
	(82,'color:Matte Black'),
	(83,'size:Large'),
	(84,'type:Road'),
	(85,'brand:Kona'),
	(86,'color:Matte Black'),
	(87,'size:Large'),
	(88,'type:Road'),
	(89,'brand:Kona'),
	(90,'color:Matte Black'),
	(91,'size:Large'),
	(92,'type:Road'),
	(93,'brand:Kona'),
	(94,'color:Matte Black'),
	(95,'size:Large'),
	(96,'brand:Kona'),
	(97,'color:Matte Black'),
	(98,'size:Large'),
	(99,'type:Road'),
	(105,'brand:Willier'),
	(106,'color:Orange'),
	(107,'size:Medium'),
	(108,'type:Road'),
	(109,'brand:Civia'),
	(110,'color:Light Blue'),
	(111,'size:Large'),
	(112,'type:Cruiser'),
	(113,'brand:Surly'),
	(114,'color:Grey'),
	(115,'size:Medium'),
	(116,'type:Road'),
	(117,'brand:Surly'),
	(118,'color:Black'),
	(119,'size:Small'),
	(120,'type:BMX'),
	(121,'brand:Salsa'),
	(122,'color:Blue'),
	(123,'size:Medium'),
	(124,'type:Road'),
	(125,'brand:Civia'),
	(126,'color:Light Blue'),
	(127,'size:Medium'),
	(128,'type:Electric'),
	(129,'brand:Salsa'),
	(130,'color:Pink'),
	(131,'size:Large'),
	(132,'type:Mountain'),
	(133,'brand:Marin'),
	(134,'color:White'),
	(135,'size:Medium'),
	(136,'type:Road'),
	(137,'brand:Kona'),
	(138,'color:Matte Black'),
	(139,'size:Large'),
	(140,'type:Road'),
	(141,'brand:Willier'),
	(142,'color:Orange'),
	(143,'size:Medium'),
	(144,'type:Road'),
	(145,'brand:Civia'),
	(146,'color:Light Blue'),
	(147,'size:Large'),
	(148,'type:Cruiser'),
	(149,'brand:Marin'),
	(150,'color:White'),
	(151,'size:Medium'),
	(152,'type:Road');

/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table time
# ------------------------------------------------------------

DROP TABLE IF EXISTS `time`;

CREATE TABLE `time` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `monstart` datetime NOT NULL,
  `monend` datetime NOT NULL,
  `tuestart` datetime NOT NULL,
  `tuesend` datetime NOT NULL,
  `wedstart` datetime NOT NULL,
  `wedend` datetime NOT NULL,
  `thursstart` datetime NOT NULL,
  `thursend` datetime NOT NULL,
  `fristart` datetime NOT NULL,
  `friend` datetime NOT NULL,
  `satstart` datetime NOT NULL,
  `satend` datetime NOT NULL,
  `sunstart` datetime NOT NULL,
  `sunend` datetime NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table to_do
# ------------------------------------------------------------

DROP TABLE IF EXISTS `to_do`;

CREATE TABLE `to_do` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `complete` tinyint(4) NOT NULL,
  `dueDate` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_dc00b4c082848833754e5ed9a3` (`userId`),
  CONSTRAINT `FK_dc00b4c082848833754e5ed9a30` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profileUrl` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_eea9ba2f6e1bb8cb89c4e672f6` (`emailAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `firstName`, `lastName`, `password`, `profileUrl`, `emailAddress`, `isAdmin`)
VALUES
	(1,'a','a','a','a','asdf',0),
	(8,'admin','admin','hi',NULL,'admin@email.com',1);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
