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

