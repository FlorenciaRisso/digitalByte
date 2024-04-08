CREATE DATABASE IF NOT EXISTS digitalbyte;

USE digitalbyte;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nacionalidad` varchar(100) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `contraseña` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `estado` varchar(1) DEFAULT 'A',
  PRIMARY KEY (`id`)
);

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `interesados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE IF NOT EXISTS `productos` (
  `ID_Producto` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `Precio` decimal(10,2) DEFAULT NULL,
  `Stock` int(11) DEFAULT NULL,
  `ID_Categoria` int(11) DEFAULT NULL,
  `Marca` varchar(50) DEFAULT NULL,
  `Descuento` int(10) DEFAULT NULL,
  `ID_Vendedor` int(11) DEFAULT NULL,
  `Estado` varchar(1) DEFAULT 'A',
  PRIMARY KEY (`ID_Producto`),
  KEY `Categoria_id` (`ID_Categoria`),
  KEY `vendedor_ibfk_1_idx` (`ID_Vendedor`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`ID_Categoria`) REFERENCES `categorias` (`id`)
);

CREATE TABLE `caracteristicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Producto` int(11) DEFAULT NULL,
  `tamaño` varchar(50) DEFAULT NULL,
  `memoria` varchar(50) DEFAULT NULL,
  `camara` varchar(50) DEFAULT NULL,
  `ram` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`ID_Producto`),
  CONSTRAINT `caracteristicas_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `productos` (`ID_Producto`)
);


CREATE TABLE IF NOT EXISTS `carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Total` decimal(10,2) DEFAULT NULL,
  `Fecha_Creacion` date DEFAULT NULL,
  `Estado` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`id`)
);

CREATE TABLE `detalle_carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Carrito` int(11) DEFAULT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `Cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_Carrito` (`ID_Carrito`),
  KEY `ID_Producto` (`ID_Producto`),
  CONSTRAINT `detalle_carrito_ibfk_1` FOREIGN KEY (`ID_Carrito`) REFERENCES `carrito` (`id`),
  CONSTRAINT `detalle_carrito_ibfk_2` FOREIGN KEY (`ID_Producto`) REFERENCES `productos` (`ID_Producto`)
);


CREATE TABLE `imagenes_producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Producto` int(11) DEFAULT NULL,
  `ruta` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`ID_Producto`),
  CONSTRAINT `imagenes_producto_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `productos` (`ID_Producto`)
);


