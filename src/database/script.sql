-- Create Database
CREATE DATABASE ProGanaderoDB;

-- Use the database
USE ProGanaderoDB;

-- Tabla res de prueba
CREATE TABLE res (
    id VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100),
    fechaNacimiento DATE,
    madre VARCHAR(36),
    padre VARCHAR(36),
    pesoActual DECIMAL(10,2),
    pesoNacimiento DECIMAL(10,2),
    sexo CHAR(1) CHECK (sexo IN ('M', 'F')),
    raza VARCHAR(20),
    numeroPartos INT(5),
    registroICA VARCHAR(50),
    fincaID VARCHAR(36)
);