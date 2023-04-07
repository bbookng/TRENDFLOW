CREATE DATABASE  IF NOT EXISTS `member` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `member`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: trendflow.site    Database: member
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `login_log`
--

DROP TABLE IF EXISTS `login_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_log` (
  `login_log_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `id_address` varchar(50) NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`login_log_id`),
  KEY `FK_LoginLog_Member_MemberId_idx` (`member_id`),
  CONSTRAINT `FK_LoginLog_Member_MemberId` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_log`
--

LOCK TABLES `login_log` WRITE;
/*!40000 ALTER TABLE `login_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `keyword` varchar(100) DEFAULT NULL,
  `platform_code` varchar(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `gender` varchar(30) DEFAULT NULL,
  `age` varchar(10) DEFAULT NULL,
  `birthday` varchar(10) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (22,'삼성','PL100','수민','liijj@daum.net','female','20~29','1009','1303bc5d968f4393910ce580f1aa3133','2023-03-24 01:14:05'),(25,'대표','PL100','문석환','tjrghks96@naver.com','male','20~29','1121','ffaee9a0961e468c9b012ee6f8669378','2023-03-31 02:10:54'),(26,'U+','PL100','한진성','h5282000@naver.com','male','20~29','0528','33ae21aec49649d3809ab9ae570d31d1','2023-04-06 06:21:56'),(27,'기업','PL100','박상민','tablemin@kakao.com','male','20~29','0506','b13996e682d54c9e8e902de834556a22','2023-04-06 06:48:54'),(28,'삼성','PL100','김보경','ysflower1@naver.com','','','','ff3fb37d0f6f4d638ec435481e43dae1','2023-04-06 07:24:00'),(29,'삼성','PL100','김유민','youmean0427@naver.com','','','','e2bbea28d6cc4fac82b8fd2eb1317bed','2023-04-07 00:49:18'),(30,'삼성','PL100','권혁근','xkhg0611x@naver.com','0611','','','1a7ad0320e5b452fa534c894d1b6b008','2023-04-07 01:03:44');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `role_code` varchar(10) NOT NULL,
  `reg_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`),
  KEY `FK_Role_Member_MemberId_idx` (`member_id`),
  CONSTRAINT `FK_Role_Member` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (15,22,'RL100','2023-03-24 01:14:05'),(19,25,'RL100','2023-03-31 02:10:54'),(20,26,'RL100','2023-04-06 06:21:56'),(21,27,'RL100','2023-04-06 06:48:54'),(22,28,'RL100','2023-04-06 07:24:00'),(23,29,'RL100','2023-04-07 00:49:18'),(24,30,'RL100','2023-04-07 01:03:44');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `member_id` bigint NOT NULL,
  `refresh_token` text NOT NULL,
  `expire` bigint NOT NULL,
  `expire_dt` datetime NOT NULL,
  `reg_dt` datetime NOT NULL,
  PRIMARY KEY (`member_id`),
  KEY `FK_Token_Member_MemberId_idx` (`member_id`),
  CONSTRAINT `FK_Token_Member_MemberId` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (22,'Br-J-c6T4M8AotsjVxZX_rMpsXO09xpEkXvxqtCsCj102QAAAYdZQakm',5183999,'2023-06-06 10:08:07','2023-04-07 10:08:08'),(25,'iP_Q5k0zA3gY4VeXEVpFeqy5RgWNqq1vJuAlo2UQCj11GQAAAYdZQNCv',5183999,'2023-06-06 10:07:12','2023-04-07 10:07:13'),(26,'6ZUeMEqP6RyUShNAhxTYjjKPkxv9a5o2tt6Xr254CinI2QAAAYdVOpdB',5183999,'2023-06-05 15:21:55','2023-04-06 15:21:56'),(27,'Agj6JMbpKWwm-vpzKL3T9NQ_W7X8VSjrXZF5VCb0CinI2AAAAYdZTXhE',5183999,'2023-06-06 10:21:01','2023-04-07 10:21:02'),(28,'hqVMGUcxBQ7S8m2VwR97v54q4dlAZ0ZCZfEvmF7MCinJYAAAAYdXUO55',5183999,'2023-06-06 01:05:34','2023-04-07 01:05:35'),(29,'XFFpWzTnAjgslaCRksMAd-lLuz7vniVwfbaCBLhdCj102QAAAYdZMGwj',5183999,'2023-06-06 09:49:17','2023-04-07 09:49:18'),(30,'UdGs2NZ1JjVCKo-PJ6_vYi4jjLSoOrR-QkKk6iLkCiolEQAAAYdZPaKC',5183999,'2023-06-06 10:03:43','2023-04-07 10:03:44');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07 12:05:32
