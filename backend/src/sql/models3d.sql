CREATE TABLE `carshop` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Iduser` int DEFAULT NULL,
  `Idproduct` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Iduser` (`Iduser`),
  KEY `Idproduct` (`Idproduct`),
  CONSTRAINT `carshop_ibfk_1` FOREIGN KEY (`Iduser`) REFERENCES `user` (`Id`),
  CONSTRAINT `carshop_ibfk_2` FOREIGN KEY (`Idproduct`) REFERENCES `models` (`Id`)
)

CREATE TABLE `models` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `Iduser` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Iduser` (`Iduser`),
  CONSTRAINT `models_ibfk_1` FOREIGN KEY (`Iduser`) REFERENCES `user` (`Id`)
)

CREATE TABLE `user` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cell` varchar(13) NOT NULL,
  `key_stripe` text,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cell` (`cell`)
)