-- Carga tabla Categorias
INSERT INTO digitalbyte.categorias(id,nombre) VALUES
(1,"Notebook"),
 (2,"Smartphone"),
 (3,"Tablet");
-- Carga tabla Productos
INSERT INTO digitalbyte.productos (ID_Producto,Nombre,Descripcion,Precio,Stock,ID_Categoria,Marca,Descuento,ID_Vendedor) VALUES 
(1,"Ipad 8va Generacion","El nuevo iPad se transforma en lo que quieras: un cuaderno digital, una oficina movil, un estudio fotografico, una consola de juegos o una sala de cine. El chip A12 Bionic te ofrece la potencia que necesitas para usar las apps de todos los dias y los juegos mas inmersivos. Puedes editar un documento mientras buscas informacion en Internet y hablas con un companiero por FaceTime. Gracias al Apple Pencil, tomar notas en el iPad es supersencillo. Si tienes que preparar un informe? Conecta el Smart Keyboard de tamanio completo y escribe con total comodidad.",532580.0,10,3,"Apple",0,0),
 (2,"Ipad 9na Generacion","Diseniado para que hagas todo lo que te gusta, por menos de lo que imaginas.",649999.0,30,3,"Apple",0,0),
 (3,"Ipad 10ma Generacion","Captura todos tus momentos al instante gracias a sus camaras, con resoluciones de 12 Mpx y 12 Mpx.",765809.0,20,3,"Apple",20,0),
 (4,"Iphone 13 Pro Max","Pantalla Super Retina XDR de 6.7 pulgadas con ProMotion que brinda una respuesta mas rapida y fluida.",1322142.0,15,2,"Apple",0,0),
 (5,"Iphone 14 Pro Max","El iPhone 14 Pro te permite captar detalles increibles gracias a su camara gran angular de 48 MP.",1544999.0,12,2,"Apple",0,0),
 (6,"iPhone 15 Pro Max","iPhone 15 Pro Max. Forjado en titanio y equipado con el revolucionario chip A17 Pro.",1764532.0,10,2,"Apple",0,0),
 (7,"Macbook Air M1","La notebook mas delgada y ligera de Apple viene con los superpoderes del chip M1.",1234999.0,25,1,"Apple",0,0),
 (8,"Macbook Air M2","MacBook Air 13\" Apple chip M2 - 8 core CPU - 10 GPU - 512GB: Chip M2 de Apple.",4994149.0,18,1,"Apple",0,0),
 (9,"Macbook Pro M2","El chip M1 de Apple redefine al Macbook Pro de 13 pulgadas. Viene con una CPU de 8 nucleos.",5142248.0,20,1,"Apple",20,0),
 (10,"Samsung Galaxy A54","Fotografia profesional en tu bolsillo. Descubri infinitas posibilidades para tus fotos con las 3 camaras principales de tu equipo.",336999.0,40,2,"Samsung",0,0),
 (11,"Samsung Galaxy S23 Ultra","Fotos nocturna epicas que vas a compartir si o si. Fotografia y gaming ultrarrapidos.",865999.0,30,2,"Samsung",0,0),
 (12,"Samsung Galaxy Z Flip5","Samsung Galaxy Z Flip 5 con 8GB de RAM y 256GB de almacenamiento. Doble camara y mas detalles.",659999.0,25,2,"Samsung",0,0),
 (13,"Notebook Samsung Galaxy Book3","La notebook Samsung Galaxy Book3 NP750XFG-KB2AR es una solucion tanto para trabajar y estudiar como para entretenerte.",915396.0,15,1,"Samsung",0,0),
 (14,"Samsung Galaxy Book3 i3","Termina todos tus proyectos gracias a la bateria de larga duracion de 54 Wh.",532999.0,18,1,"Samsung",0,0),
 (15,"Samsung Galaxy Book 3 Pro","Samsung Galaxy Book3 Pro 14 Intel Core I5 12 Nucleos 16GB Color Graphite te ofrece una experiencia de visualizacion cinematografica.",1149999.0,12,1,"Samsung",0,0),
 (16,"Xiaomi Redmi 10c","Doble camara y mas detalles. Sus 2 camaras traseras de 50 Mpx/2 Mpx te permitiran tomar imagenes con mas detalles.",119999.0,35,2,"Xiaomi",0,0),
 (17,"Xiaomi Redmi Note 11","Fotografia profesional en tu bolsillo. Descubri infinitas posibilidades para tus fotos con las 3 camaras principales de tu equipo.",235999.0,22,2,"Xiaomi",0,0),
 (18,"Xiaomi Mi 11 Lite","Camara de 64 MP, ultraligero con pantalla AMOLED de 6,55 pulgadas y disenio delgado.",345999.0,20,2,"Xiaomi",20,0),
 (19,"Xiaomi Redmibook 14","Portatil Xiaomi Redmibook 14 (2023) con procesador Intel i5 o Intel i7 de hasta 4,7GHz. 16 GB de RAM, graficos Intel Iris Xe integrados, almacenamiento SSD de 512 GB. Bateria para hasta 11 horas de uso y pantalla Super Retina de 14pulgadas y resolucion 2.8K",369167.42,15,1,"Xiaomi",0,0),
 (20,"Xiaomi Redmibook 15 Pro","Portatil Xiaomi Redmibook 15 Pro (2023) con procesador Ryzen 5 o Ryzen 7 de hasta 5,1GHz, 16GB de RAM, grafica integrada AMD Radeon, almacenamiento SSD de 512GB, con bateria de 72Wh y pantalla LCD de 15,6 con resolucion 3.2K",388618.14,12,1,"Xiaomi",0,0),
 (21,"Xiaomi Book Pro 16","Portatil Xiaomi Book Pro 16 (2022) con procesador Intel i5 o Intel i7 de hasta 4,7GHz. 16 GB de RAM, grafica dedicada NVIDIA GeForce RTX2050 de 4 GB o Intel Iris Xe integrada. Almacenamiento SSD de 512 GB, con bateria para hasta 12 horas de uso y pantalla tactil OLED de 16pulgadas con resolucion 4K.",466417.46,10,1,"Xiaomi",0,0),
 (22,"Redmi Pad 5","Esta tablet es la combinacion perfecta de rendimiento y versatilidad, ideal para acompaniar cada una de tus actividades. Transferir, sincronizar y acceder a tus dispositivos las veces que quieras ahora es posible. Sus conexiones bluetooth, wi-fi, usb-c te permiten potenciar sus funciones al maximo.",794523.0,20,3,"Xiaomi",20,0),
 (23,"Redmi Pad 6","Esta tablet es la combinacion perfecta de rendimiento y versatilidad, ideal para acompaniar cada una de tus actividades.",539240.0,18,3,"Xiaomi",0,0),
 (24,"Redmi Pad SE","Esta tablet es la combinacion perfecta de rendimiento y versatilidad, ideal para acompaniar cada una de tus actividades.",349899.0,22,3,"Xiaomi",0,0);

-- Carga tabla imagenes_producto
INSERT INTO digitalbyte.imagenes_producto(id,ID_Producto,ruta) VALUES
(1,1,"/img/apple/ipadGen8/ipad8va.png"),
 (2,1,"/img/apple/ipadGen8/ipad8va-1.png"),
 (3,1,"/img/apple/ipadGen8/ipad8va-2.png"),
 (4,1,"/img/apple/ipadGen8/ipad8va-3.png"),
 (5,2,"/img/apple/ipadGen9/ipad9na.png"),
 (6,2,"/img/apple/ipadGen9/ipad9na-1.png"),
 (7,2,"/img/apple/ipadGen9/ipad9na-2.png"),
 (8,2,"/img/apple/ipadGen9/ipad9na-3.png"),
 (9,3,"/img/apple/ipadGen10/ipad10ma.png"),
 (10,3,"/img/apple/ipadGen10/ipad10ma-1.png"),
 (11,3,"/img/apple/ipadGen10/ipad10ma-2.png"),
 (12,3,"/img/apple/ipadGen10/ipad10ma-3.png"),
 (13,4,"/img/apple/iphone13/iphone13.png"),
 (14,4,"/img/apple/iphone13/iphone13-1.png"),
 (15,4,"/img/apple/iphone13/iphone13-2.png"),
 (16,4,"/img/apple/iphone13/iphone13-3.png"),
 (17,5,"/img/apple/iphone14/iphone14.png"),
 (18,5,"/img/apple/iphone14/iphone14-1.png"),
 (19,5,"/img/apple/iphone14/iphone14-2.png"),
 (20,5,"/img/apple/iphone14/iphone14-3.png"),
 (21,6,"/img/apple/iphone15/iphone15.png"),
 (22,6,"/img/apple/iphone15/iphone15-1.png"),
 (23,6,"/img/apple/iphone15/iphone15-2.png"),
 (24,6,"/img/apple/iphone15/iphone15-3.png"),
 (25,7,"/img/apple/macbookAirM1/macbookairm1.png"),
 (26,7,"/img/apple/macbookAirM1/macbookairm1-1.png"),
 (27,7,"/img/apple/macbookAirM1/macbookairm1-2.png"),
 (28,7,"/img/apple/macbookAirM1/macbookairm1-3.png"),
 (29,8,"/img/apple/macbookAirM2/macbookairm2.png"),
 (30,8,"/img/apple/macbookAirM2/macbookairm2-1.png"),
 (31,8,"/img/apple/macbookAirM2/macbookairm2-2.png"),
 (32,8,"/img/apple/macbookAirM2/macbookairm2-3.png"),
 (33,9,"/img/apple/macbookProM2/macbookprom2.png"),
 (34,9,"/img/apple/macbookProM2/macbookprom2-1.png"),
 (35,9,"/img/apple/macbookProM2/macbookprom2-2.png"),
 (36,9,"/img/apple/macbookProM2/macbookprom2-3.png"),
 (37,10,"/img/samsung/samsungGalaxyA54/samsungA54.png"),
 (38,10,"/img/samsung/samsungGalaxyA54/samsungA54-1.png"),
 (39,10,"/img/samsung/samsungGalaxyA54/samsungA54-2.png"),
 (40,10,"/img/samsung/samsungGalaxyA54/samsungA54-3.png"),
 (41,11,"/img/samsung/samsungGalaxyS23/samsungS23.png"),
 (42,11,"/img/samsung/samsungGalaxyS23/samsungS23-1.png"),
 (43,11,"/img/samsung/samsungGalaxyS23/samsungS23-2.png"),
 (44,11,"/img/samsung/samsungGalaxyS23/samsungS23-3.png"),
 (45,12,"/img/samsung/samsungGalaxyZFlip5/galaxyZflip.png"),
 (46,12,"/img/samsung/samsungGalaxyZFlip5/galaxyZflip-1.png"),
 (47,12,"/img/samsung/samsungGalaxyZFlip5/galaxyZflip-2.png"),
 (48,12,"/img/samsung/samsungGalaxyZFlip5/galaxyZflip-3.png"),
 (49,13,"/img/samsung/samsungGalaxyBook3/galaxyBook3.png"),
 (50,13,"/img/samsung/samsungGalaxyBook3/galaxyBook3-1.png"),
 (51,13,"/img/samsung/samsungGalaxyBook3/galaxyBook3-2.png"),
 (52,13,"/img/samsung/samsungGalaxyBook3/galaxyBook3-3.png"),
 (53,14,"/img/samsung/samsungGalaxyBook3i3/galaxybook3i3.png"),
 (54,14,"/img/samsung/samsungGalaxyBook3i3/galaxybook3i3-1.png"),
 (55,14,"/img/samsung/samsungGalaxyBook3i3/galaxybook3i3-2.png"),
 (56,14,"/img/samsung/samsungGalaxyBook3i3/galaxybook3i3-3.png"),
 (57,15,"/img/samsung/samsungGalaxyBook3Pro/galaxyBook3Pro.png"),
 (58,15,"/img/samsung/samsungGalaxyBook3Pro/galaxyBook3Pro-1.png"),
 (59,15,"/img/samsung/samsungGalaxyBook3Pro/galaxyBook3Pro-2.png"),
 (60,15,"/img/samsung/samsungGalaxyBook3Pro/galaxyBook3Pro-3.png"),
 (61,16,"/img/xiaomi/redmi10C/redmi10C.png"),
 (62,16,"/img/xiaomi/redmi10C/redmi10C-1.png"),
 (63,16,"/img/xiaomi/redmi10C/redmi10C-2.png"),
 (64,16,"/img/xiaomi/redmi10C/redmi10C-3.png"),
 (65,17,"/img/xiaomi/redmiNote11/redmiNote11.png"),
 (66,17,"/img/xiaomi/redmiNote11/redmiNote11-1.png"),
 (67,17,"/img/xiaomi/redmiNote11/redmiNote11-2.png"),
 (68,17,"/img/xiaomi/redmiNote11/redmiNote11-3.png"),
 (69,18,"/img/xiaomi/redmiNote12/redminote12.png"),
 (70,18,"/img/xiaomi/redmiNote12/redminote12-1.png"),
 (71,18,"/img/xiaomi/redmiNote12/redminote12-2.png"),
 (72,18,"/img/xiaomi/redmiNote12/redminote12-3.png"),
 (73,19,"/img/xiaomi/redmiBook14/redmiBook14.png"),
 (74,19,"/img/xiaomi/redmiBook14/redmiBook14-1.png"),
 (75,19,"/img/xiaomi/redmiBook14/redmiBook14-2.png"),
 (76,19,"/img/xiaomi/redmiBook14/redmiBook14-3.png"),
 (77,20,"/img/xiaomi/redmiBook15Pro/redmiBook15Pro.png"),
 (78,20,"/img/xiaomi/redmiBook15Pro/redmiBook15Pro-1.png"),
 (79,20,"/img/xiaomi/redmiBook15Pro/redmiBook15Pro-2.png"),
 (80,20,"/img/xiaomi/redmiBook15Pro/redmiBook15Pro-3.png"),
 (81,21,"/img/xiaomi/redmiBook16Pro/redmiBook16Pro.png"),
 (82,21,"/img/xiaomi/redmiBook16Pro/redmiBook16Pro-1.png"),
 (83,21,"/img/xiaomi/redmiBook16Pro/redmiBook16Pro-2.png"),
 (84,21,"/img/xiaomi/redmiBook16Pro/redmiBook16Pro-3.png"),
 (85,22,"/img/xiaomi/redmiPad5/redmiPad5.png"),
 (86,22,"/img/xiaomi/redmiPad5/redmiPad5-1.png"),
 (87,22,"/img/xiaomi/redmiPad5/redmiPad5-2.png"),
 (88,22,"/img/xiaomi/redmiPad5/redmiPad5-3.png"),
 (89,23,"/img/xiaomi/redmiPad6/redmiPad6.png"),
 (90,23,"/img/xiaomi/redmiPad6/redmiPad6-1.png"),
 (91,23,"/img/xiaomi/redmiPad6/redmiPad6-2.png"),
 (92,23,"/img/xiaomi/redmiPad6/redmiPad6-3.png"),
 (93,24,"/img/xiaomi/redmiPadSE/redmiPadSE.png"),
 (94,24,"/img/xiaomi/redmiPadSE/redmiPadSE-1.png"),
 (95,24,"/img/xiaomi/redmiPadSE/redmiPadSE-2.png"),
 (96,24,"/img/xiaomi/redmiPadSE/redmiPadSE-3.png");

-- Carga tabla caracterisiticas
INSERT INTO caracteristicas
(ID_Producto, tamaño, memoria, camara, ram)
VALUES
(1, 14, 32, 48, 8),
(2, 15, 64, 64, 12),
(3, 15.5, 128, 108, 16),
(4, 16, 256, 108, 16),
(5, 16.5, 512, 108, 16),
(6, 17, 512, 108, 16),
(7, 17.5, 512, 108, 16),
(8, 18, 512, 108, 16),
(9, 18.5, 512, 108, 16),
(10, 19, 512, 108, 16),
(11, 19.5, 512, 108, 16),
(12, 20, 512, 108, 16),
(13, 20.5, 512, 108, 16),
(14, 21, 512, 108, 16),
(15, 21.5, 512, 108, 16),
(16, 22, 512, 108, 16),
(17, 22.5, 512, 108, 16),
(18, 23, 512, 108, 16),
(19, 23.5, 512, 108, 16),
(20, 24, 512, 108, 16),
(21, 24.5, 512, 108, 16),
(22, 25, 512, 108, 16),
(23, 25.5, 512, 108, 16),
(24, 26, 512, 108, 16);

-- Carga tabla usuarios
 INSERT INTO usuarios (id, nombre, apellido, email, contraseña, rol, nacionalidad, avatar, direccion, telefono) VALUES
(1, 'Mara', 'Santillan', 'mjsn98@gmail.com', '$2b$10$Nh87Yo5fRO7TC2UD9tCSWuv5V4cYUjgOX4jxpQkpXLr/K7MxUYOYq', 'Administrador', 'Argentina', '/img/avatar.jpg', '123 Calle Principal', '011-2345-6789'),
(2, 'Flor', 'Risso', 'flor@gmail.com', '$2b$10$Nh87Yo5fRO7TC2UD9tCSWuv5V4cYUjgOX4jxpQkpXLr/K7MxUYOYq', 'Vendedor', 'Argentina', '/img/avatar.jpg', '456 Avenida del Sol', '011-3456-7890'),
(3, 'Ximena', 'Marcos', 'asdfasf@gmail.com', '$2b$10$Nh87Yo5fRO7TC2UD9tCSWuv5V4cYUjgOX4jxpQkpXLr/K7MxUYOYq', 'Administrador', 'Argentina', '/img/avatar.jpg', '789 Calle de la Luna', '011-9012-3456'),
(4, 'Mara', 'Santillan', 'asdsda_98@gmail.com', '$2b$10$Nh87Yo5fRO7TC2UD9tCSWuv5V4cYUjgOX4jxpQkpXLr/K7MxUYOYq', 'Vendedor', 'Argentina', '/img/avatar.jpg', '321 Avenida de las Flores', '011-4567-8901'),
(5, 'Ximena', 'Marcos', 'mjsnn98@gmail.com', '$2b$10$Nh87Yo5fRO7TC2UD9tCSWuv5V4cYUjgOX4jxpQkpXLr/K7MxUYOYq', 'Administrador', 'Argentina', '/img/avatar.jpg', '654 Calle del Bosque', '011-5678-9012'),
(6, 'Mara', 'Marcos', 'mrsntllnn98@gmail.com', '$2b$10$Nh87Yo5fRO7TC2UD9tCSWuv5V4cYUjgOX4jxpQkpXLr/K7MxUYOYq', 'Vendedor', 'Argentina', '/img/avatar.jpg', '987 Avenida del Mar', '011-6789-0123'),
(7, 'Florencia', 'Risso', 'florencia@gmail.com', '$2b$10$Nh87Yo5fRO7TC2UD9tCSWuv5V4cYUjgOX4jxpQkpXLr/K7MxUYOYq', 'Administrador', 'Argentina', '/img/avatar.jpg', '543 Avenida del Rio', '011-7890-1234'),
(8, 'Sophia', 'Martinez', 'sophia.martinez@example.com', '$2b$10$Nh87Yo5fRO7TC2UD9tCSWuv5V4cYUjgOX4jxpQkpXLr/K7MxUYOYq', 'Vendedor', 'Argentina', '/img/avatar.jpg', '210 Calle de la Montaña', '011-8901-2345'),
(9, 'Alexander', 'Perez', 'alexander.perez@example.com', '$2b$10$Nh87Yo5fRO7TC2UD9tCSWuv5V4cYUjgOX4jxpQkpXLr/K7MxUYOYq', 'Vendedor', 'Argentina', '/img/avatar.jpg', '876 Calle de la Playa', '011-9876-5432'),
(10, 'Benjamin', 'Rodriguez', 'benjamin.rodriguez@example.com', '$2b$10$Nh87Yo5fRO7TC2UD9tCSWuv5V4cYUjgOX4jxpQkpXLr/K7MxUYOYq', 'Administrador', 'Argentina', '/img/avatar.jpg', '109 Avenida de las Estrellas', '011-0123-4567'),
(11, 'Super', 'Usuario', 'superusu@gmail.com', '$2b$10$Nh87Yo5fRO7TC2UD9tCSWuv5V4cYUjgOX4jxpQkpXLr/K7MxUYOYq', 'Administrador', 'Argentina', '/img/avatar.jpg', '109 Avenida de las Estrellas', '011-0123-4567');
