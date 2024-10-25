-- SQLBook: Code
-- Active: 1727790809895@@127.0.0.1@3306@db_sais
-- SQLBook: Code

CREATE DATABASE IF NOT EXISTS db_sais;

-- Usar la base de datos creada
USE db_sais;
-- Crear el usuario
CREATE USER 'user-sais'@'%' IDENTIFIED BY 'user-sais';
-- Otorgar todos los privilegios al usuario en la base de datos
GRANT ALL PRIVILEGES ON db_sais.* TO 'user-sais'@'%';
-- Aplicar los cambios de privilegios
FLUSH PRIVILEGES;
REPAIR TABLE mysql.db;
CHECK TABLE mysql.db;
-- Crear la tabla responsable_de_paciente
CREATE TABLE responsable_de_paciente (
    id_responsable INT AUTO_INCREMENT PRIMARY KEY,
    dni_res VARCHAR(8) NOT NULL,
    tipo_res VARCHAR(50) NOT NULL,
    ape_paterno_res VARCHAR(50) NOT NULL,
    ape_materno_res VARCHAR(50) NOT NULL,
    nombres_res VARCHAR(100) NOT NULL,
    celular1_res VARCHAR(20) NOT NULL,
    celular2_res VARCHAR(20),
    localidad_res VARCHAR(50) NOT NULL,
    sector_res VARCHAR(20) NOT NULL,
    direccion_res VARCHAR(100) NOT NULL,
    departamento_res VARCHAR(50) NOT NULL,
    provincia_res VARCHAR(50) NOT NULL,
    distrito_res VARCHAR(50) NOT NULL
);

-- Crear la tabla pacientes
CREATE TABLE pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(15) NOT NULL,
    CNV_linea VARCHAR(50),
    hist_clinico VARCHAR(50),
    ape_paterno VARCHAR(50) NOT NULL,
    ape_materno VARCHAR(50) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    edad INT NOT NULL,
    sexo VARCHAR(40) NOT NULL,
    discapacidad VARCHAR(50),
    celular1 VARCHAR(15),
    celular2 VARCHAR(15),
    localidad VARCHAR(50),
    sector VARCHAR(20),
    direccion VARCHAR(100),
    departamento VARCHAR(50),
    provincia VARCHAR(50),
    distrito VARCHAR(50),
    tipo_paciente VARCHAR(50) NOT NULL,
    id_responsable INT,
    FOREIGN KEY (id_responsable) REFERENCES responsable_de_paciente (id_responsable) ON DELETE SET NULL
);

--CREAR UNA TABLA PARA LA CITAS PARA EL PACIENTE DE TIPO NIÑO
CREATE TABLE cita_ninhos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    especialidad VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    hora VARCHAR(20) NOT NULL,
    consultorio INT NOT NULL,
    hisClinico VARCHAR(50) NOT NULL,
    dni VARCHAR(15) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    edad INT NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    motivoConsulta TEXT NOT NULL,
    direccion VARCHAR(100),
    metodo VARCHAR(50),
    semEmbarazo INT,
    id_responsable INT,
    FOREIGN KEY (id_responsable) REFERENCES responsable_de_paciente (id_responsable) ON DELETE SET NULL,
    fechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREAMOS UNA TABLA PARA REGISTRAR A LOS PERSONALES DE SALUD
CREATE TABLE personal_salud (
    id_personal INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(15) NOT NULL,
    paterno VARCHAR(50) NOT NULL,
    materno VARCHAR(50) NOT NULL,
    nombres VARCHAR(50) NOT NULL,
    tipo_user VARCHAR(30) NOT NULL,
    profesion VARCHAR(40) NOT NULL,
    servicio VARCHAR(40) NOT NULL,
    especial_cita VARCHAR(40) NOT NULL,
    num_consultorio VARCHAR(1) NULL,
    condicion VARCHAR(30) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    estado VARCHAR(10) NOT NULL DEFAULT 'activo',
    reset_token VARCHAR(255) DEFAULT NULL,
    fechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREAMOS UNA TABLA PARA REGISTRAR TURNOS DE PERSONALES
CREATE TABLE turnos_personal (
    id_turno INT AUTO_INCREMENT PRIMARY KEY,
    id_personal INT,
    FOREIGN KEY (id_personal) REFERENCES personal_salud (id_personal) ON DELETE CASCADE, -- Elimina turnos relacionados si se elimina el personal
    id_turno_tipo INT NOT NULL, -- Relación a una tabla de tipos de turnos
    FOREIGN KEY (id_turno_tipo) REFERENCES tipos_turno_personal(id_turno_tipo), -- Clave foránea para tipos de turno
    fecha DATE NOT NULL,
    UNIQUE (id_personal, fecha) -- Evitar turnos duplicados en la misma fecha para el mismo personal
);

-- CREAMO LA TABLA DE TIPOS DE TURNO
CREATE TABLE tipos_turno_personal (
    id_turno_tipo INT AUTO_INCREMENT PRIMARY KEY,
    turno VARCHAR(100) NOT NULL,
    clave_turno VARCHAR(50) NOT NULL
);
-- CREAMOS UNA TABLA PARA RECIBIR DATOS DE DIAS BLOQUEADOS PARA EL PERSONAL
CREATE TABLE dias_bloqueados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    bloqueado BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (fecha) -- Para evitar duplicados de la misma fecha
);


CREATE TABLE `etnia` (
  `id_etnia` int(11) NOT NULL,
  `nombre_etnia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `etnia`
--

INSERT INTO `etnia` (`id_etnia`, `nombre_etnia`) VALUES
(1, 'Achuar / Achual, Achuale, Achuare'),
(2, 'Aimara / Aru'),
(3, 'Amahuaca / Amin waka, Yora'),
(4, 'Arabela / Chiripuno, Tapueyocuaca'),
(5, 'Ashaninka / Campa ashaninka'),
(6, 'Asheninka / Asheninka del Gran Pajonal'),
(7, 'Bora / Booraa, Miamuna, Miranha, Miranya'),
(8, 'Capanahua / Buskipani, Nuquencaibo'),
(9, 'Cashinahua / Caxinahua, Huni kuin, Kachinahua'),
(10, 'Chamicuro / Camikodlo, Chamicolos'),
(11, 'Chapra / Shapra'),
(12, 'Chitonahua / Murunahua, Yora'),
(13, 'Ese eja / Eseejja, Huarayo, Tiatinagua'),
(14, 'Harakbut / Amarakaeri, Arasaeri, Kisamberi, Pukirieri, Sapiteri, Toyoeri, Wachipaeri'),
(15, 'Ikitu / Amacacore, Iquito, Quiturran'),
(16, 'Inapari / Inamari, Inapari, Kushitireni'),
(17, 'Isconahua / Isconawa, Iskobakebo'),
(18, 'Jaqaru / Aimara central, Aimara tupino, Aru, Cauqui'),
(19, 'Jibaro / Jibaro del rio Corrientes, Shiwiar, Siwaro'),
(20, 'Kakataibo / Uni, Unibo'),
(21, 'Kakinte / Poyenisati'),
(22, 'Kandozi / Kandoshi'),
(23, 'Kichwa / Inga, Quichua, Lamas, Llacuash'),
(24, 'Kukama kukamiria / Cocama cocamilla, Xibitaona'),
(25, 'Madija / Culina, Kolina, Madiha'),
(26, 'Maijuna / Maijiki, Orejon'),
(27, 'Marinahua / Onocoin, Yora'),
(28, 'Mashco Piro'),
(29, 'Mastanahua / Yora'),
(30, 'Matses / Mayoruna'),
(31, 'Matsigenka / Machiguenga, Matsiganga, Matsiguenga'),
(32, 'Muniche / Munichi'),
(33, 'Murui-muinani / Huitoto'),
(34, 'Nahua / Yora'),
(35, 'Nanti / Matsigenka'),
(36, 'Nomatsigenga / Atiri, Nomachiguenga'),
(37, 'Ocaina / Dukaiya, Dyoxaiya'),
(38, 'Omagua / Ariana, Omagua yete, Pariana, Umawa'),
(39, 'Secoya / Aido pai'),
(40, 'Sharanahua / Onicoin, Yora'),
(41, 'Shawi / Campo piyapi, Chayawita, Tshahui'),
(42, 'Shipibo-konibo / Chioeo-conivo, Joni, Shipibo'),
(43, 'Shiwilu / Jebero, Shiwila, Xebero'),
(44, 'Tikuna / Duuxugu, Ticuna'),
(45, 'Urarina / Itucali, Itukale, Kacha edze'),
(46, 'Uro / Uru'),
(47, 'Vacacocha / Abijira, Aushiri, Awshira, Aewa'),
(48, 'Wampis / Huambisa, Shuar-suampis'),
(49, 'Yagua / Nihamwo, Yihamwo'),
(50, 'Yaminahua / Jjamimawa, Yora'),
(51, 'Yanesha/Amage,Amuesha,Amuexia'),
(52, 'Yine/Chotaquiro,/Pira,Piro,Simirinche'),
(53, 'Afrodescendiente/Afroperuano,Negro,Zambo'),
(54, 'Blanco'),
(55, 'Mestizo'),
(56, 'Asiatico Descendiente'),
(57, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `financiamiento`
--

CREATE TABLE `financiamiento` (
  `id_financiamiento` int(11) NOT NULL,
  `nombre_financiamiento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `financiamiento`
--

INSERT INTO `financiamiento` (`id_financiamiento`, `nombre_financiamiento`) VALUES
(1, 'SELECCIONE FINANCIAMIENTO'),
(2, 'S.I.S'),
(3, 'ESSALUD'),
(4, 'S.O.A.T'),
(5, 'SANIDAD F.A.P'),
(6, 'SANIDAD NAVAL'),
(7, 'SANIDAD EP'),
(8, 'SANIDAD PNP'),
(9, 'PRIVADOS'),
(10, 'OTROS'),
(11, 'EXONERADO');

-- --------------------------------------------------------

CREATE TABLE `programa` (
  `id_programa` int(11) NOT NULL,
  `nombre_programa` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `programa`
--

INSERT INTO `programa` (`id_programa`, `nombre_programa`) VALUES
(1, 'SELECCIONE PROGRAMA'),
(2, 'PIN PVL'),
(3, 'CUNA+'),
(4, 'JUNTOS'),
(5, 'OTROS'),
(6, 'NINGUNO');

-- --------------------------------------------------------

CREATE TABLE `nacimiento_paciente_ninos` (
  `ID_DATOS_NACIMIENTO` int(11) NOT NULL,
  `EDAD_GESTACIONAL` int(11) DEFAULT NULL,
  `ID_PACIENTE` int(11) DEFAULT NULL,
  `PESO` decimal(5,2) DEFAULT NULL,
  `TALLA` decimal(5,2) DEFAULT NULL,
  `PERIMETRO_CEFALICO` decimal(5,2) DEFAULT NULL,
  `ID_ETNIA` int(11) DEFAULT NULL,
  `ID_FINANCIAMENTO` int(11) DEFAULT NULL,
  `ID_PROGRAMA` int(11) DEFAULT NULL,
  `codigo_sis` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nacimiento_paciente_ninos`
--

INSERT INTO `nacimiento_paciente_ninos` (`ID_DATOS_NACIMIENTO`, `EDAD_GESTACIONAL`, `ID_PACIENTE`, `PESO`, `TALLA`, `PERIMETRO_CEFALICO`, `ID_ETNIA`, `ID_FINANCIAMENTO`, `ID_PROGRAMA`, `codigo_sis`) VALUES
(16, 6363, 3, 5.20, 1.72, 15.20, 5, 2, 3, 'XDXDfghj'),
(17, 90, 9, 60.00, 1.62, 55.00, 5, 4, 4, '22'),
(18, 848, 10, 37.00, 737.00, 838.00, 4, 6, 5, '888');

-- -------------------