CREATE DATABASE IF NOT EXISTS nombre_de_la_base_de_datos;

USE nombre_de_la_base_de_datos;

CREATE TABLE IF NOT EXISTS `caracteristicas` (
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

CREATE TABLE IF NOT EXISTS `carrito` (
  `ID_Carrito` int(11) NOT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Fecha_Creacion` date DEFAULT NULL,
  PRIMARY KEY (`ID_Carrito`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `detalle_carrito` (
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

CREATE TABLE IF NOT EXISTS `imagenes_producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) DEFAULT NULL,
  `ruta` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `imagenes_producto_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`ID_Producto`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `productos` (
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
  CONSTRAINT `productos_ibfk_1`