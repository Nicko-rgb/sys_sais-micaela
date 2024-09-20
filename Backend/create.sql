-- SQLBook: Code
-- Active: 1725904580185@@127.0.0.1@3306@db_sais
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS db_sais;

-- Usar la base de datos creada
USE db_sais;

-- Eliminar tablas si existen para evitar errores
DROP TABLE IF EXISTS responsable_de_paciente;
DROP TABLE IF EXISTS pacientes;  -- Asegúrate de que esta tabla se defina más adelante si es necesaria

-- Crear el usuario con contraseña
CREATE USER 'db-sais90'@'%' IDENTIFIED BY 'db-sais90';

-- Otorgar todos los privilegios al usuario en la base de datos
GRANT ALL PRIVILEGES ON db_sais.* TO 'db-sais90'@'%';

-- Aplicar los cambios de privilegios
FLUSH PRIVILEGES;

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
    FOREIGN KEY (id_responsable) REFERENCES responsable_de_paciente(id_responsable) ON DELETE SET NULL
);

--CREAR UNA TABLA PARA LA CITAS PARA EL PACIENTE DE TIPO NIÑO
CREATE TABLE cita_ninhos (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    
)

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
    condicion VARCHAR(30) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    contraseña VARCHAR(50) NOT NULL
)