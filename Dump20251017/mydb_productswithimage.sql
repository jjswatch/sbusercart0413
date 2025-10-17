CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productswithimage`
--

DROP TABLE IF EXISTS `productswithimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productswithimage` (
  `id` int NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `picture` longblob,
  `price` double NOT NULL,
  `rating_id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `brand` varchar(255) NOT NULL,
  `stock` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productswithimage`
--

LOCK TABLES `productswithimage` WRITE;
/*!40000 ALTER TABLE `productswithimage` DISABLE KEYS */;
INSERT INTO `productswithimage` VALUES (1,'smartphones','iPhone 5s 是一款經典智慧型手機，以其緊湊的設計和先進的功能而聞名。雖然它是一款舊款機型，但它仍然提供了可靠的用戶體驗。','https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/2.webp',NULL,109.95,1,'iPhone 5s','Apple',25),(2,'smartphones','iPhone 6 是一款時尚且功能強大的智慧型手機，具有更大的顯示器和更強大的效能。它引入了新的功能和設計元素，使其成為當時的熱門選擇。','https://cdn.dummyjson.com/product-images/smartphones/iphone-6/2.webp',NULL,22.3,2,'iPhone 6','Apple',60),(3,'smartphones','iPhone 13 Pro 是一款尖端智慧型手機，擁有強大的相機系統、高效能晶片和令人驚豔的顯示器。它為追求頂級技術的用戶提供先進的功能。','https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp',NULL,55.99,3,'iPhone 13 Pro','Apple',56),(4,'smartphones','iPhone X 是一款旗艦智慧型手機，配備無邊框 OLED 顯示器、臉部辨識技術 (Face ID) 和出色的性能。它代表了 iPhone 設計和創新的里程碑。','https://cdn.dummyjson.com/product-images/smartphones/iphone-x/2.webp',NULL,15.99,4,'iPhone X','Apple',37),(5,'smartphones','The Oppo A57 is a mid-range smartphone known for its sleek design and capable features. It offers a balance of performance and affordability, making it a popular choice.','https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',NULL,695,5,'John Hardy Women\'s Legends Naga Gold & Silver Dragon Station Chain Bracelet','',0),(6,'smartphones','The Oppo F19 Pro Plus is a feature-rich smartphone with a focus on camera capabilities. It boasts advanced photography features and a powerful performance for a premium user experience.','https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png',NULL,168,6,'Solid Gold Petite Micropave ','',0),(7,'smartphones','The Oppo K1 series offers a range of smartphones with various features and specifications. Known for their stylish design and reliable performance, the Oppo K1 series caters to diverse user preferences.','https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png',NULL,9.99,7,'White Gold Plated Princess','',0),(8,'smartphones','The Realme C35 is a budget-friendly smartphone with a focus on providing essential features for everyday use. It offers a reliable performance and user-friendly experience.','https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png',NULL,10.99,8,'Pierced Owl Rose Gold Plated Stainless Steel Double','',0),(9,'smartphones','The Realme X is a mid-range smartphone known for its sleek design and impressive display. It offers a good balance of performance and camera capabilities for users seeking a quality device.','https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png',NULL,64,9,'WD 2TB Elements Portable External Hard Drive - USB 3.0 ','',0),(10,'smartphones','The Realme XT is a feature-rich smartphone with a focus on camera technology. It comes equipped with advanced camera sensors, delivering high-quality photos and videos for photography enthusiasts.','https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png',NULL,109,10,'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s','',0),(11,'smartphones','The Samsung Galaxy S7 is a flagship smartphone known for its sleek design and advanced features. It features a high-resolution display, powerful camera, and robust performance.','https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png',NULL,109,11,'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5','',0),(12,'smartphones','The Samsung Galaxy S8 is a premium smartphone with an Infinity Display, offering a stunning visual experience. It boasts advanced camera capabilities and cutting-edge technology.','https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png',NULL,114,12,'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive','',0),(13,'smartphones','The Samsung Galaxy S10 is a flagship device featuring a dynamic AMOLED display, versatile camera system, and powerful performance. It represents innovation and excellence in smartphone technology.','https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png',NULL,599,13,'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin','',0),(14,'smartphones','The Vivo S1 is a stylish and mid-range smartphone offering a blend of design and performance. It features a vibrant display, capable camera system, and reliable functionality.','https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png',NULL,999.99,14,'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ','',0),(15,'smartphones','The Vivo V9 is a smartphone known for its sleek design and emphasis on capturing high-quality selfies. It features a notch display, dual-camera setup, and a modern design.','https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png',NULL,56.99,15,'BIYLACLESEN Women\'s 3-in-1 Snowboard Jacket Winter Coats','',0),(16,'smartphones','The Vivo X21 is a premium smartphone with a focus on cutting-edge technology. It features an in-display fingerprint sensor, a high-resolution display, and advanced camera capabilities.','https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png',NULL,29.95,16,'Lock and Love Women\'s Removable Hooded Faux Leather Moto Biker Jacket','',0),(17,'smartphones','Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn\'t overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.','https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png',NULL,39.99,17,'Rain Jacket Women Windbreaker Striped Climbing Raincoats','',0),(18,'smartphones','95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem','https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png',NULL,9.85,18,'MBJ Women\'s Solid Short Sleeve Boat Neck V ','',0),(19,'smartphones','100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort','https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png',NULL,7.95,19,'Opna Women\'s Short Sleeve Moisture','',0),(20,'smartphones','95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.','https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png',NULL,12.99,20,'DANVOUY Womens T Shirt Casual Cotton Short','',0);
/*!40000 ALTER TABLE `productswithimage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-17 13:52:35
