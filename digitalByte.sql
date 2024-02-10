-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: digitalbyte
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `caracteristicas`
--

DROP TABLE IF EXISTS `caracteristicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caracteristicas` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `tamaño` varchar(50) DEFAULT NULL,
  `memoria` varchar(50) DEFAULT NULL,
  `camara` varchar(50) DEFAULT NULL,
  `desbloqueo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `caracteristicas_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`ID_Producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caracteristicas`
--

LOCK TABLES `caracteristicas` WRITE;
/*!40000 ALTER TABLE `caracteristicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `caracteristicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `ID_Carrito` int(11) NOT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Fecha_Creacion` date DEFAULT NULL,
  PRIMARY KEY (`ID_Carrito`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Notebook'),(2,'Smartphone'),(3,'Tablet');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_carrito`
--

DROP TABLE IF EXISTS `detalle_carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_carrito` (
  `ID_Detalle` int(11) NOT NULL,
  `ID_Carrito` int(11) DEFAULT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `Cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Detalle`),
  KEY `ID_Carrito` (`ID_Carrito`),
  KEY `ID_Producto` (`ID_Producto`),
  CONSTRAINT `detalle_carrito_ibfk_1` FOREIGN KEY (`ID_Carrito`) REFERENCES `carrito` (`ID_Carrito`),
  CONSTRAINT `detalle_carrito_ibfk_2` FOREIGN KEY (`ID_Producto`) REFERENCES `productos` (`ID_Producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_carrito`
--

LOCK TABLES `detalle_carrito` WRITE;
/*!40000 ALTER TABLE `detalle_carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta` (
  `ID_Detalle_Venta` int(11) NOT NULL,
  `ID_Venta` int(11) DEFAULT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `Cantidad` int(11) DEFAULT NULL,
  `Precio_Unitario` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_Detalle_Venta`),
  KEY `ID_Venta` (`ID_Venta`),
  KEY `ID_Producto` (`ID_Producto`),
  CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`ID_Venta`) REFERENCES `ventas` (`ID_Venta`),
  CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`ID_Producto`) REFERENCES `productos` (`ID_Producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes_producto`
--

DROP TABLE IF EXISTS `imagenes_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes_producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) DEFAULT NULL,
  `ruta` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `imagenes_producto_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`ID_Producto`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes_producto`
--

LOCK TABLES `imagenes_producto` WRITE;
/*!40000 ALTER TABLE `imagenes_producto` DISABLE KEYS */;
INSERT INTO `imagenes_producto` VALUES (1,1,'/img/apple/ipadGen8/ipad8va.png'),(2,1,'/img/apple/ipadGen8/ipad8va-1.png'),(3,1,'/img/apple/ipadGen8/ipad8va-2.png'),(4,1,'/img/apple/ipadGen8/ipad8va-3.png'),(5,2,'/img/apple/ipadGen9/ipad9na.png'),(6,2,'/img/apple/ipadGen9/ipad9na-1.png'),(7,2,'/img/apple/ipadGen9/ipad9na-2.png'),(8,2,'/img/apple/ipadGen9/ipad9na-3.png'),(9,3,'/img/apple/ipadGen10/ipad10ma.png'),(10,3,'/img/apple/ipadGen10/ipad10ma-1.png'),(11,3,'/img/apple/ipadGen10/ipad10ma-2.png'),(12,3,'/img/apple/ipadGen10/ipad10ma-3.png'),(13,4,'/img/apple/iphone13/iphone13.png'),(14,4,'/img/apple/iphone13/iphone13-1.png'),(15,4,'/img/apple/iphone13/iphone13-2.png'),(16,4,'/img/apple/iphone13/iphone13-3.png'),(17,5,'/img/apple/iphone14/iphone14.png'),(18,5,'/img/apple/iphone14/iphone14-1.png'),(19,5,'/img/apple/iphone14/iphone14-2.png'),(20,5,'/img/apple/iphone14/iphone14-3.png'),(21,6,'/img/apple/iphone15/iphone15.png'),(22,6,'/img/apple/iphone15/iphone15-1.png'),(23,6,'/img/apple/iphone15/iphone15-2.png'),(24,6,'/img/apple/iphone15/iphone15-3.png'),(25,7,'/img/apple/macbookAirM1/macbookairm1.png'),(26,7,'/img/apple/macbookAirM1/macbookairm1-1.png'),(27,7,'/img/apple/macbookAirM1/macbookairm1-2.png'),(28,7,'/img/apple/macbookAirM1/macbookairm1-3.png'),(29,8,'/img/apple/macbookAirM2/macbookairm2.png'),(30,8,'/img/apple/macbookAirM2/macbookairm2-1.png'),(31,8,'/img/apple/macbookAirM2/macbookairm2-2.png'),(32,8,'/img/apple/macbookAirM2/macbookairm2-3.png'),(33,9,'/img/apple/macbookProM2/macbookprom2.png'),(34,9,'/img/apple/macbookProM2/macbookprom2-1.png'),(35,9,'/img/apple/macbookProM2/macbookprom2-2.png'),(36,9,'/img/apple/macbookProM2/macbookprom2-3.png'),(37,10,'/img/samsung/samsungGalaxyA54/samsungA54.png'),(38,10,'/img/samsung/samsungGalaxyA54/samsungA54-1.png'),(39,10,'/img/samsung/samsungGalaxyA54/samsungA54-2.png'),(40,10,'/img/samsung/samsungGalaxyA54/samsungA54-3.png'),(41,11,'/img/samsung/samsungGalaxyS23/samsungS23.png'),(42,11,'/img/samsung/samsungGalaxyS23/samsungS23-1.png'),(43,11,'/img/samsung/samsungGalaxyS23/samsungS23-2.png'),(44,11,'/img/samsung/samsungGalaxyS23/samsungS23-3.png'),(45,12,'/img/samsung/samsungGalaxyZFlip5/galaxyZflip.png'),(46,12,'/img/samsung/samsungGalaxyZFlip5/galaxyZflip-1.png'),(47,12,'/img/samsung/samsungGalaxyZFlip5/galaxyZflip-2.png'),(48,12,'/img/samsung/samsungGalaxyZFlip5/galaxyZflip-3.png'),(49,13,'/img/samsung/samsungGalaxyBook3/galaxyBook3.png'),(50,13,'/img/samsung/samsungGalaxyBook3/galaxyBook3-1.png'),(51,13,'/img/samsung/samsungGalaxyBook3/galaxyBook3-2.png'),(52,13,'/img/samsung/samsungGalaxyBook3/galaxyBook3-3.png'),(53,14,'/img/samsung/samsungGalaxyBook3i3/galaxybook3i3.png'),(54,14,'/img/samsung/samsungGalaxyBook3i3/galaxybook3i3-1.png'),(55,14,'/img/samsung/samsungGalaxyBook3i3/galaxybook3i3-2.png'),(56,14,'/img/samsung/samsungGalaxyBook3i3/galaxybook3i3-3.png'),(57,15,'/img/samsung/samsungGalaxyBook3Pro/galaxyBook3Pro.png'),(58,15,'/img/samsung/samsungGalaxyBook3Pro/galaxyBook3Pro-1.png'),(59,15,'/img/samsung/samsungGalaxyBook3Pro/galaxyBook3Pro-2.png'),(60,15,'/img/samsung/samsungGalaxyBook3Pro/galaxyBook3Pro-3.png'),(61,16,'/img/xiaomi/redmi10C/redmi10C.png'),(62,16,'/img/xiaomi/redmi10C/redmi10C-1.png'),(63,16,'/img/xiaomi/redmi10C/redmi10C-2.png'),(64,16,'/img/xiaomi/redmi10C/redmi10C-3.png'),(65,17,'/img/xiaomi/redmiNote11/redmiNote11.png'),(66,17,'/img/xiaomi/redmiNote11/redmiNote11-1.png'),(67,17,'/img/xiaomi/redmiNote11/redmiNote11-2.png'),(68,17,'/img/xiaomi/redmiNote11/redmiNote11-3.png'),(69,18,'/img/xiaomi/redmiNote12/redminote12.png'),(70,18,'/img/xiaomi/redmiNote12/redminote12-1.png'),(71,18,'/img/xiaomi/redmiNote12/redminote12-2.png'),(72,18,'/img/xiaomi/redmiNote12/redminote12-3.png'),(73,19,'/img/xiaomi/redmiBook14/redmiBook14.png'),(74,19,'/img/xiaomi/redmiBook14/redmiBook14-1.png'),(75,19,'/img/xiaomi/redmiBook14/redmiBook14-2.png'),(76,19,'/img/xiaomi/redmiBook14/redmiBook14-3.png'),(77,20,'/img/xiaomi/redmiBook15Pro/redmiBook15Pro.png'),(78,20,'/img/xiaomi/redmiBook15Pro/redmiBook15Pro-1.png'),(79,20,'/img/xiaomi/redmiBook15Pro/redmiBook15Pro-2.png'),(80,20,'/img/xiaomi/redmiBook15Pro/redmiBook15Pro-3.png'),(81,21,'/img/xiaomi/redmiBook16Pro/redmiBook16Pro.png'),(82,21,'/img/xiaomi/redmiBook16Pro/redmiBook16Pro-1.png'),(83,21,'/img/xiaomi/redmiBook16Pro/redmiBook16Pro-2.png'),(84,21,'/img/xiaomi/redmiBook16Pro/redmiBook16Pro-3.png'),(85,22,'/img/xiaomi/redmiPad5/redmiPad5.png'),(86,22,'/img/xiaomi/redmiPad5/redmiPad5-1.png'),(87,22,'/img/xiaomi/redmiPad5/redmiPad5-2.png'),(88,22,'/img/xiaomi/redmiPad5/redmiPad5-3.png'),(89,23,'/img/xiaomi/redmiPad6/redmiPad6.png'),(90,23,'/img/xiaomi/redmiPad6/redmiPad6-1.png'),(91,23,'/img/xiaomi/redmiPad6/redmiPad6-2.png'),(92,23,'/img/xiaomi/redmiPad6/redmiPad6-3.png'),(93,24,'/img/xiaomi/redmiPadSE/redmiPadSE.png'),(94,24,'/img/xiaomi/redmiPadSE/redmiPadSE-1.png'),(95,24,'/img/xiaomi/redmiPadSE/redmiPadSE-2.png'),(96,24,'/img/xiaomi/redmiPadSE/redmiPadSE-3.png');
/*!40000 ALTER TABLE `imagenes_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `ID_Producto` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `Precio` decimal(10,2) DEFAULT NULL,
  `Stock` int(11) DEFAULT NULL,
  `Categoria_id` int(11) DEFAULT NULL,
  `Marca` varchar(50) DEFAULT NULL,
  `Descuento` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_Producto`),
  KEY `Categoria_id` (`Categoria_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`Categoria_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Ipad 8va Generacion','El nuevo iPad se transforma en lo que quieras: un cuaderno digital, una oficina móvil, un estudio fotográfico, una consola de juegos o una sala de cine. El chip A12 Bionic te ofrece la potencia que necesitas para usar las apps de todos los días y los juegos más inmersivos. Puedes editar un documento mientras buscas información en Internet y hablas con un compañero por FaceTime. Gracias al Apple Pencil, tomar notas en el iPad es supersencillo. ¿Tienes que preparar un informe? Conecta el Smart Keyboard de tamaño completo y escribe con total comodidad.',532580.00,10,3,'Apple',NULL),(2,'Ipad 9na Generacion','Diseñado para que hagas todo lo que te gusta, por menos de lo que imaginas.',649999.00,30,3,'Apple',NULL),(3,'Ipad 10ma Generacion','Capturá todos tus momentos al instante gracias a sus cámaras, con resoluciones de 12 Mpx y 12 Mpx.',765809.00,20,3,'Apple',NULL),(4,'Iphone 13 Pro Max','Pantalla Super Retina XDR de 6.7 pulgadas con ProMotion que brinda una respuesta más rápida y fluida.',1322142.00,15,1,'Apple',NULL),(5,'Iphone 14 Pro Max','El iPhone 14 Pro te permite captar detalles increíbles gracias a su cámara gran angular de 48 MP.',1544999.00,12,1,'Apple',NULL),(6,'iPhone 15 Pro Max','iPhone 15 Pro Max. Forjado en titanio y equipado con el revolucionario chip A17 Pro.',1764532.00,10,1,'Apple',NULL),(7,'Macbook Air M1','La notebook más delgada y ligera de Apple viene con los superpoderes del chip M1.',1234999.00,25,2,'Apple',NULL),(8,'Macbook Air M2','MacBook Air 13\" Apple chip M2 - 8 core CPU - 10 GPU - 512GB: Chip M2 de Apple.',4994149.00,18,2,'Apple',NULL),(9,'Macbook Pro M2','El chip M1 de Apple redefine al Macbook Pro de 13 pulgadas. Viene con una CPU de 8 núcleos.',5142248.00,20,2,'Apple',NULL),(10,'Samsung Galaxy A54','Fotografía profesional en tu bolsillo. Descubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo.',336999.00,40,1,'Samsung',NULL),(11,'Samsung Galaxy S23 Ultra','Fotos nocturnas épicas que vas a compartir sí o sí. Fotografía y gaming ultrarrápidos.',865999.00,30,1,'Samsung',NULL),(12,'Samsung Galaxy Z Flip5','Samsung Galaxy Z Flip 5 con 8GB de RAM y 256GB de almacenamiento. Doble cámara y más detalles.',659999.00,25,1,'Samsung',NULL),(13,'Notebook Samsung Galaxy Book3','La notebook Samsung Galaxy Book3 NP750XFG-KB2AR es una solución tanto para trabajar y estudiar como para entretenerte.',915396.00,15,3,'Samsung',NULL),(14,'Samsung Galaxy Book3 i3','Terminá todos tus proyectos gracias a la batería de larga duración de 54 Wh.',532999.00,18,3,'Samsung',NULL),(15,'Samsung Galaxy Book 3 Pro','Samsung Galaxy Book3 Pro 14 Intel Core I5 12 Núcleos 16GB Color Graphite te ofrece una experiencia de visualización cinematográfica.',1149999.00,12,3,'Samsung',NULL),(16,'Xiaomi Redmi 10c','Doble cámara y más detalles. Sus 2 cámaras traseras de 50 Mpx/2 Mpx te permitirán tomar imágenes con más detalles.',119999.00,35,1,'Xiaomi',NULL),(17,'Xiaomi Redmi Note 11','Fotografía profesional en tu bolsillo. Descubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo.',235999.00,22,1,'Xiaomi',NULL),(18,'Xiaomi Mi 11 Lite','Cámara de 64 MP, ultraligero con pantalla AMOLED de 6,55 pulgadas y diseño delgado.',345999.00,20,1,'Xiaomi',NULL),(19,'Xiaomi Redmibook 14','Portátil Xiaomi Redmibook 14 (2023) con procesador Intel i5 o Intel i7 de hasta 4,7GHz. 16 GB de RAM, gráficos Intel Iris Xe integrados, almacenamiento SSD de 512 GB. Batería para hasta 11 horas de uso y pantalla Super Retina de 14” y resolución 2.8K',369167.42,15,3,'Xiaomi',NULL),(20,'Xiaomi Redmibook 15 Pro','Portátil Xiaomi Redmibook 15 Pro (2023) con procesador Ryzen 5 o Ryzen 7 de hasta 5,1GHz, 16GB de RAM, gráfica integrada AMD Radeon, almacenamiento SSD de 512GB, con batería de 72Wh y pantalla LCD de 15,6″ con resolución 3.2K (3200×2000)',388618.14,12,3,'Xiaomi',NULL),(21,'Xiaomi Book Pro 16','Portátil Xiaomi Book Pro 16 (2022) con procesador Intel i5 o Intel i7 de hasta 4,7GHz. 16 GB de RAM, gráfica dedicada NVIDIA GeForce RTX2050 de 4 GB o Intel Iris Xe integrada. Almacenamiento SSD de 512 GB, con batería para hasta 12 horas de uso y pantalla táctil OLED de 16” con resolución 4K.',466417.46,10,3,'Xiaomi',NULL),(22,'Redmi Pad 5','Esta tablet es la combinación perfecta de rendimiento y versatilidad, ideal para acompañar cada una de tus actividades. Transferir, sincronizar y acceder a tus dispositivos las veces que quieras ahora es posible. Sus conexiones bluetooth, wi-fi, usb-c te permiten potenciar sus funciones al máximo.',794523.00,20,2,'Xiaomi',NULL),(23,'Redmi Pad 6','Esta tablet es la combinación perfecta de rendimiento y versatilidad, ideal para acompañar cada una de tus actividades.',539240.00,18,2,'Redmi',NULL),(24,'Redmi Pad SE','Esta tablet es la combinación perfecta de rendimiento y versatilidad, ideal para acompañar cada una de tus actividades.',349899.00,22,2,'Redmi',NULL);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nacionalidad` varchar(100) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `Contraseña` varchar(100) DEFAULT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `ID_Venta` int(11) NOT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Fecha_Venta` date DEFAULT NULL,
  PRIMARY KEY (`ID_Venta`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-10 13:49:41
