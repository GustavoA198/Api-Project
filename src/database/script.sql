-- Create Database
    CREATE DATABASE ProGanaderoDB;

-- Use the database
USE ProGanaderoDB;

-- Tabla res de prueba
CREATE TABLE Cliente (
    ID VARCHAR(36) PRIMARY KEY NOT NULL,
    Identificacion VARCHAR(20) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Direccion VARCHAR(200),
    Telefono VARCHAR(20) NOT NULL,
    Email VARCHAR(100)
);

CREATE TABLE Finca (
    ID VARCHAR(36) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Direccion VARCHAR(200),
    Observaciones TEXT
);

CREATE TABLE Lote (
    ID VARCHAR(36) PRIMARY KEY,
    Nombre VARCHAR(36),
    Numero INT(11) NOT NULL,
    Aforo INT(4),
    FincaID VARCHAR(36) NOT NULL
);

CREATE TABLE Insumo (
    ID VARCHAR(36) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    FechaIngreso DATE NOT NULL,
    CantidadActual BIGINT,
    FechaVencimiento DATE,
    Observaciones TEXT
);

CREATE TABLE Actividad (
    ID VARCHAR(36) PRIMARY KEY,
    Fecha DATE NOT NULL,
    Tipo VARCHAR(100),
    TiempoCarencia DATE,
    LoteID VARCHAR(36) NOT NULL,
    Observaciones TEXT
);

CREATE TABLE InsumosActividad (
    ID VARCHAR(36) PRIMARY KEY,
    InsumoID VARCHAR(36) NOT NULL,
    ActividadID VARCHAR(36) NOT NULL
);

CREATE TABLE Ocupacion (
    ID VARCHAR(36) PRIMARY KEY,
    NoAnimales INT(11) NOT NULL,
    FechaIngreso DATE,
    TipoRebano ENUM("Lecheras","Secas", "Engorde", "Novillas", "Novillos", "Otro"),
    FechaSalida DATE,
    LoteID VARCHAR(36) NOT NULL
);

CREATE TABLE Producto (
    ID VARCHAR(36) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Fecha DATE,
    Cantidad INT(11) NOT NULL
);

CREATE TABLE Venta (
ID VARCHAR(36) PRIMARY KEY,
Total DECIMAL(10,2) NOT NULL,
Observaciones TEXT,
ClienteID VARCHAR(36) NOT NULL
);

CREATE TABLE ProductosVentas (
ID VARCHAR(36) PRIMARY KEY,
PrecioUnitario DECIMAL(10,2),
Cantidad INT(11) NOT NULL,
ProductoID VARCHAR(36) NOT NULL,
VentaID VARCHAR(36) NOT NULL
);

CREATE TABLE Res (
ID VARCHAR(36) PRIMARY KEY,
Numero INT(6) NOT NULL,
Nombre VARCHAR(100),
Tipo ENUM('Leche', 'Carne', 'Doble Proposito'),
FechaNacimiento DATE,
Estado ENUM('Activa', 'Vendida', 'Muerte'),
Madre VARCHAR(36),
Padre VARCHAR(36),
PesoActual DECIMAL(5,2),
PesoNacimiento DECIMAL(5,2),
Sexo CHAR(1) CHECK (Sexo IN ('M', 'F')),
Raza VARCHAR(20),
NumeroPartos INT(5),
RegistroICA VARCHAR(50),
Observaciones TEXT,
FincaID VARCHAR(36) NOT NULL
);

CREATE TABLE alimento(
ID VARCHAR(36) PRIMARY KEY,
Nombre VARCHAR(100) NOT NULL,
Tipo VARCHAR(100) NOT NULL
);

CREATE TABLE Muerte (
ID VARCHAR(36) PRIMARY KEY,
Fecha DATE NOT NULL,
Causa VARCHAR(200),
Observaciones TEXT,
ResID VARCHAR(36) NOT NULL
);

CREATE TABLE ProduccionIndividual (
ID VARCHAR(36) PRIMARY KEY,
Fecha DATE NOT NULL,
Tipo VARCHAR(20) CHECK (Tipo IN ('Leche', 'Carne')),
Cantidad DECIMAL(5,2) NOT NULL,
ResID VARCHAR(36) NOT NULL
);

CREATE TABLE Servicio (
ID VARCHAR(36) PRIMARY KEY,
Tipo VARCHAR(100),
Fecha DATE NOT NULL,
Veterinario VARCHAR(100),
Observaciones TEXT
);

CREATE TABLE Monta (
ID VARCHAR(36) PRIMARY KEY,
FechaParto DATE,
ServicioID VARCHAR(36) NOT NULL,
ToroID VARCHAR(36) NOT NULL,
FOREIGN KEY (ServicioID) REFERENCES Servicio(ID),
FOREIGN KEY (ToroID) REFERENCES Res(ID)
);

CREATE TABLE Inseminacion (
ID VARCHAR(36) PRIMARY KEY,
FechaParto DATE,
ServicioID VARCHAR(36) NOT NULL,
FOREIGN KEY (ServicioID) REFERENCES Servicio(ID)
);

CREATE TABLE Uso (
ID VARCHAR(36) PRIMARY KEY,
Justificacion TEXT,
Fecha DATE NOT NULL,
Cantidad INT(11),
ProductoID VARCHAR(36),
FOREIGN KEY (ProductoID) REFERENCES Producto(ID)
);

CREATE TABLE Usuario (
ID VARCHAR(36) PRIMARY KEY,
Tipo VARCHAR(20) CHECK (Tipo IN ('admin', 'operario')),
Identificacion VARCHAR(20),
Nombre VARCHAR(100),
Direccion VARCHAR(100),
Telefono VARCHAR(20),
Email VARCHAR(100) NOT NULL,
Contraseña VARCHAR(100) NOT NULL
);

CREATE TABLE Transaccion (
ID VARCHAR(36) PRIMARY KEY,
Descripcion TEXT,
Fecha DATE NOT NULL,
Valor DECIMAL(10,2) NOT NULL
);

CREATE TABLE InsumosTransaccion (
ID VARCHAR(36) PRIMARY KEY,
Cantidad INT(10) NOT NULL,
ValorUnitario DECIMAL(10,2),
InsumoID VARCHAR(36) NOT NULL,
TransaccionID VARCHAR(36) NOT NULL
);

CREATE TABLE Imagen (
ID VARCHAR(36) PRIMARY KEY,
URL VARCHAR(100) NOT NULL,
resID VARCHAR(36) NOT NULL
);

CREATE TABLE InsumoServicio (  
ID VARCHAR(36) PRIMARY KEY,
InsumoID VARCHAR(36) NOT NULL,
ServicioID VARCHAR(36) NOT NULL
);


-- foreing keys InsumoServicio
ALTER TABLE InsumoServicio
ADD CONSTRAINT fk_InsumoServicio_Insumo
FOREIGN KEY (InsumoID) REFERENCES Insumo(ID),
ADD CONSTRAINT fk_InsumoServicio_Servicio
FOREIGN KEY (ServicioID) REFERENCES Servicio(ID);
-- Foreign Keys Lote
ALTER TABLE Lote
ADD CONSTRAINT fk_Lote_Finca
FOREIGN KEY (FincaID) REFERENCES Finca(ID);

-- Foreign Keys Actividad
ALTER TABLE Actividad
ADD CONSTRAINT fk_Actividad_Lote
FOREIGN KEY (LoteID) REFERENCES Lote(ID);

-- foreign keys Res
ALTER TABLE Res
ADD CONSTRAINT fk_Res_Finca
FOREIGN KEY (FincaID) REFERENCES Finca(ID),
ADD CONSTRAINT fk_Res_Madre
FOREIGN KEY (Madre) REFERENCES Res(ID),
ADD CONSTRAINT fk_Res_Padre
FOREIGN KEY (Padre) REFERENCES Res(ID);

-- Foreign Keys InsumosActividad
ALTER TABLE InsumosActividad
ADD CONSTRAINT fk_InsumosActividad_Insumo
FOREIGN KEY (InsumoID) REFERENCES Insumo(ID),
ADD CONSTRAINT fk_InsumosActividad_Actividad
FOREIGN KEY (ActividadID) REFERENCES Actividad(ID);

-- Foreign Keys Ocupacion
ALTER TABLE Ocupacion
ADD CONSTRAINT fk_Ocupacion_Lote
FOREIGN KEY (LoteID) REFERENCES Lote(ID);

-- Asociación de la tabla 'Venta' con la tabla 'Cliente'
ALTER TABLE Venta
ADD CONSTRAINT fk_Venta_Cliente
FOREIGN KEY (ClienteID) REFERENCES Cliente(ID);

-- Asociación de la tabla 'ProductosVentas' con las tablas 'Producto' y 'Venta'
ALTER TABLE ProductosVentas
ADD CONSTRAINT fk_ProductosVentas_Producto
FOREIGN KEY (ProductoID) REFERENCES Producto(ID),
ADD CONSTRAINT fk_ProductosVentas_Venta
FOREIGN KEY (VentaID) REFERENCES Venta(ID);

-- Asociación de la tabla 'Muerte' con la tabla 'Res'
ALTER TABLE Muerte
ADD CONSTRAINT fk_Muerte_Res
FOREIGN KEY (ResID) REFERENCES Res(ID);

-- Asociación de la tabla 'ProduccionIndividual' con la tabla 'Res'
ALTER TABLE ProduccionIndividual
ADD CONSTRAINT fk_ProduccionIndividual_Res
FOREIGN KEY (ResID) REFERENCES Res(ID);

-- Asociación de la tabla 'Monta' con las tablas 'Servicio' y 'Res'
ALTER TABLE Monta
ADD CONSTRAINT fk_Monta_Servicio
FOREIGN KEY (ServicioID) REFERENCES Servicio(ID),
ADD CONSTRAINT fk_Monta_Res
FOREIGN KEY (ToroID) REFERENCES Res(ID);

-- Asociación de la tabla 'Inseminacion' con la tabla 'Servicio'
ALTER TABLE Inseminacion
ADD CONSTRAINT fk_Inseminacion_Servicio
FOREIGN KEY (ServicioID) REFERENCES Servicio(ID);

-- Asociación de la tabla 'Uso' con la tabla 'Producto'
ALTER TABLE Uso
ADD CONSTRAINT fk_Uso_Producto
FOREIGN KEY (ProductoID) REFERENCES Producto(ID);

-- Asociación de la tabla 'InsumosTransaccion' con las tablas 'Insumo' y 'Transaccion'
ALTER TABLE InsumosTransaccion
ADD CONSTRAINT fk_InsumosTransaccion_Insumo
FOREIGN KEY (InsumoID) REFERENCES Insumo(ID),
ADD CONSTRAINT fk_InsumosTransaccion_Transaccion
FOREIGN KEY (TransaccionID) REFERENCES Transaccion(ID);

ALTER TABLE Imagen
ADD CONSTRAINT fk_Imagen_Res
ADD FOREIGN KEY (resID) REFERENCES res(ID);
-- Fin de las sentencias ALTER TABLE con comentarios


-- Inicio de la insercion de datos de prueba

-- Cliente
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('1', '123456789', 'Juan Perez', 'Calle 123', '1234567', 'juan@gmail.com');
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('2', '987654321', 'Maria Rodriguez', 'Calle 456', '7654321', 'maria@gmail.com');
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('3', '123123123', 'Pedro Gomez', 'Calle 789', '3213213', 'pedro@gmail.com');
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('4', '321321321', 'Luisa Perez', 'Calle 321', '3213213', 'luisa@gmail.com');
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('5', '456456456', 'Carlos Rodriguez', 'Calle 654', '6546546', 'carlos@gmail.com');
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('6', '654654654', 'Ana Gomez', 'Calle 987', '6546546', 'ana@gmail.com');

-- Finca
INSERT INTO Finca (ID, Nombre, Direccion, Observaciones) VALUES ('1', 'Finca La Esperanza', 'Calle 123', 'Finca de prueba');
INSERT INTO Finca (ID, Nombre, Direccion, Observaciones) VALUES ('2', 'Finca La Ilusion', 'Calle 456', 'Finca de prueba');
INSERT INTO Finca (ID, Nombre, Direccion, Observaciones) VALUES ('3', 'Finca La Alegria', 'Calle 789', 'Finca de prueba');
INSERT INTO Finca (ID, Nombre, Direccion, Observaciones) VALUES ('4', 'Finca La Felicidad', 'Calle 321', 'Finca de prueba');

-- Lote
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('1', 'Lote 1', 1, 25, '1');   
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('2', 'Lote 2', 2, 30, '1');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('3', 'Lote 3', 3, 20, '2');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('4', 'Lote 4', 4, 15, '2');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('5', 'Lote 5', 5, 10, '3');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('6', 'Lote 6', 6, 5, '3');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('7', 'Lote 7', 7, 10, '4');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('8', 'Lote 8', 8, 15, '4');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('9', 'Lote 9', 9, 20, '4');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('10', 'Lote 10', 10, 25, '4');

-- Insumo
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('1', 'Vacuna 1', '2021-05-17', 100, '2022-01-01', 'Vacuna para enfermedades comunes');
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('2', 'Vacuna 2', '2021-05-17', 50, '2022-01-01', 'Vacuna para enfermedades comunes');
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('3', 'Vacuna 3', '2021-05-17', 75, '2022-01-01', 'Vacuna para enfermedades comunes');
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('4', 'Vacuna 4', '2021-05-17', 25, '2022-01-01', 'Vacuna para enfermedades comunes');
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('5', 'Vacuna 5', '2021-05-17', 10, '2022-01-01', 'Vacuna para enfermedades comunes');
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('6', 'Vacuna 6', '2021-05-17', 5, '2022-01-01', 'Vacuna para enfermedades comunes');

-- Actividad
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('1', '2021-02-15', 'Fumigada', '2021-03-01', '1', 'Actividad de prueba');
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('2', '2022-03-10', 'Fumigada', '2022-04-05', '2', 'Actividad de prueba');
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('3', '2023-04-05', 'Limpieza', '2023-05-01', '3', 'Actividad de prueba');
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('4', '2022-05-20', 'Limpieza', '2022-06-15', '4', 'Actividad de prueba');
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('5', '2023-06-30', 'Cercada', '2023-07-20', '5', 'Actividad de prueba');
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('6', '2021-07-25', 'Cercada', '2021-08-10', '6', 'Actividad de prueba');


-- InsumosActividad
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('1', '1', '1');
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('2', '2', '2');
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('3', '3', '3');
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('4', '4', '4');
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('5', '5', '5');
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('6', '6', '6');

-- Ocupacion
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('1', 10, '2021-02-15', 'Lecheras', '2021-03-15', '1');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('2', 15, '2023-04-05', 'Secas', '2023-05-05', '2');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('3', 20, '2023-06-30', 'Engorde', '2023-07-30', '3');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('4', 25, '2021-08-30', 'Novillas', '2021-09-30', '4');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('5', 30, '2022-09-05', 'Novillos', '2022-10-05', '5');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('6', 35, '2023-10-30', 'Otro', '2023-11-30', '6');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('7', 40, '2020-01-01', 'Lecheras', '2020-01-31', '7');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('8', 45, '2020-02-01', 'Secas', '2020-02-29', '8');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('9', 50, '2020-03-01', 'Engorde', '2020-03-31', '9');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('10', 55, '2020-04-01', 'Novillas', '2020-04-30', '10');

-- Productos
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('1', 'Leche', '2021-02-15', 100);
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('2', 'Carne', '2022-03-10', 550);
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('3', 'Leche', '2023-04-05', 75);
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('4', 'Carne', '2022-05-20', 425);
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('5', 'Leche', '2023-06-30', 114);
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('6', 'Carne', '2021-07-25', 295);

-- Venta
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('1', 100.00, 'Venta de prueba', '1');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('2', 50.00, 'Venta de prueba', '2');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('3', 75.00, 'Venta de prueba', '3');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('4', 25.00, 'Venta de prueba', '4');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('5', 10.00, 'Venta de prueba', '5');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('6', 5.00, 'Venta de prueba', '6');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('7', 100.00, 'Venta de prueba', '1');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('8', 50.00, 'Venta de prueba', '2');

-- ProductosVentas
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('1', 10.00, 10, '1', '1');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('2', 5.00, 10, '2', '2');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('3', 7.50, 10, '3', '3');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('4', 2.50, 10, '4', '4');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('5', 1.00, 10, '5', '5');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('6', 0.50, 10, '6', '6');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('7', 10.00, 10, '1', '7');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('8', 5.00, 10, '2', '8');

   -- Reses madres y padres sin relaciones parentales iniciales
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('1', 1, 'Pepe', 'Leche', '2015-01-01', 'Activa', NULL, NULL, 900.00, 50.00, 'M', 'Holstein', 0, '123456789', 'Padre de varias reses', '1');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('2', 2, 'Luisa', 'Leche', '2015-02-01', 'Activa', NULL, NULL, 850.00, 50.00, 'F', 'Holstein', 0, '987654321', 'Madre de varias reses', '2');

-- Reses hijas con sus relaciones parentales
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('3', 3, 'Juanita', 'Leche', '2023-01-01', 'Activa', '2', '1', 100.00, 50.00, 'F', 'Holstein', 0, '123456789', 'Hija de Luisa y Pepe', '1');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('4', 4, 'Maria', 'Leche', '2019-01-01', 'Activa', '2', '1', 100.00, 50.00, 'F', 'Holstein', 0, '123456789', 'Hija de Luisa y Pepe', '2');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('5', 5, 'Pepa', 'Leche', '2021-01-15', 'Activa', '2', '1', 100.00, 50.00, 'F', 'Holstein', 0, '123456789', 'Hija de Luisa y Pepe', '3');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('6', 6, 'Luna', 'Leche', '2018-08-01', 'Activa', '2', '1', 100.00, 50.00, 'F', 'Holstein', 0, '123456789', 'Hija de Luisa y Pepe', '4');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('7', 7, 'Estrella', 'Leche', '2020-01-01', 'Activa', '2', '1', 100.00, 50.00, 'F', 'Holstein', 0, '123456789', 'Hija de Luisa y Pepe', '4');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('8', 8, 'Sol', 'Leche', '2019-01-21', 'Activa', '2', '1', 110.00, 55.00, 'M', 'Holstein', 0, '987654321', 'Hijo de Luisa y Pepe', '1');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('9', 9, 'Rosa', 'Leche', '2022-01-30', 'Activa', '2', '1', 105.00, 53.00, 'F', 'Holstein', 0, '987654322', 'Hija de Luisa y Pepe', '2');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('10', 10, 'Jazmín', 'Leche', '2020-01-01', 'Activa', '2', '1', 108.00, 54.00, 'F', 'Holstein', 0, '987654323', 'Hija de Luisa y Pepe', '3');

-- Alimentos
INSERT INTO alimento (ID, Nombre, Tipo) VALUES ('1', 'Concentrado terneros', 'Concentrado');
INSERT INTO alimento (ID, Nombre, Tipo) VALUES ('2', 'Concentrado vacas', 'Concentrado');
INSERT INTO alimento (ID, Nombre, Tipo) VALUES ('3', 'Concentrado vacas en secado', 'Concentrado');

-- Muertes
INSERT INTO Muerte (ID, Fecha, Causa, Observaciones, ResID) VALUES ('1', '2020-01-01', 'Enfermedad', 'Muerte de prueba', '1');
INSERT INTO Muerte (ID, Fecha, Causa, Observaciones, ResID) VALUES ('2', '2020-01-01', 'Enfermedad', 'Muerte de prueba', '2');

-- Produccion individual
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('1', '2020-01-01', 'Leche', 10.00, '1');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('2', '2020-01-01', 'Leche', 10.00, '2');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('3', '2020-01-01', 'Leche', 10.00, '3');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('4', '2020-01-01', 'Leche', 10.00, '4');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('5', '2020-01-01', 'Leche', 10.00, '5');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('6', '2020-01-01', 'Leche', 10.00, '6');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('7', '2020-01-01', 'Leche', 10.00, '7');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('8', '2020-01-01', 'Leche', 10.00, '8');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('9', '2020-01-01', 'Leche', 10.00, '9');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('10', '2020-01-02', 'Leche', 10.00, '10');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('11', '2020-01-02', 'Carne', 10.00, '1');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('12', '2020-01-02', 'Carne', 10.00, '2');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('13', '2020-01-02', 'Carne', 10.00, '3');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('14', '2020-01-02', 'Carne', 10.00, '4');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('15', '2020-01-02', 'Carne', 10.00, '5');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('16', '2020-01-02', 'Carne', 10.00, '6');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('17', '2020-01-02', 'Carne', 10.00, '7');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('18', '2020-01-02', 'Carne', 10.00, '8');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('19', '2020-01-02', 'Carne', 10.00, '9');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('20', '2020-01-02', 'Carne', 10.00, '10');

-- Servicio
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('1', 'Inseminacion', '2021-02-15', 'Juan Perez', 'Servicio de prueba');
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('2', 'Inseminacion', '2022-03-10', 'Maria Rodriguez', 'Servicio de prueba');
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('3', 'Inseminacion', '2023-04-05', 'Pedro Gomez', 'Servicio de prueba');
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('4', 'Inseminacion', '2022-05-20', 'Luisa Perez', 'Servicio de prueba');
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('5', 'Podología', '2023-06-30', 'Carlos Rodriguez', 'Servicio de prueba');
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('6', 'Inseminacion', '2021-07-25', 'Ana Gomez', 'Servicio de prueba');

-- Montas
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('1', '2020-01-25', '1', '1');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('2', '2021-02-11', '3', '1');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('3', '2021-01-01', '5', '1');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('4', '2023-01-01', '1', '2');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('5', '2024-08-01', '3', '2');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('6', '2021-01-10', '5', '2');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('7', '2020-09-01', '1', '3');

-- Inseminaciones
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('1', '2022-01-25', '2');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('2', '2023-02-11', '4');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('3', '2022-03-01', '6');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('4', '2023-04-15', '2');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('5', '2021-06-10', '4');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('6', '2023-07-20', '6');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('7', '2021-08-25', '2');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('8', '2022-09-05', '4');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('9', '2023-10-30', '6');

-- Uso
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('1', 'consumo personal', '2022-01-15', 10, '1');   
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('2', 'alimentar terneros', '2023-03-10', 15, '2');
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('3', 'alimentar terneros', '2021-06-25', 20, '3'); 
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('4', 'alimentar terneros', '2022-09-05', 25, '4'); 
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('5', 'alimentar terneros', '2023-11-18', 30, '5'); 
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('6', 'alimentar terneros', '2021-12-02', 35, '6');
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('7', 'alimentar terneros', '2022-07-22', 40, '1');
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('8', 'alimentar terneros', '2023-08-30', 45, '2');

-- Usuario
INSERT INTO Usuario (ID, Tipo, Identificacion, Nombre, Direccion, Telefono, Email, Contraseña) VALUES ('1', 'admin', '123456789', 'Juan Perez', 'Calle 123', '1234567', 'juan@juan.com', '123456');
INSERT INTO Usuario (ID, Tipo, Identificacion, Nombre, Direccion, Telefono, Email, Contraseña) VALUES ('2', 'operario', '987654321', 'Maria Rodriguez', 'Calle 456', '7654321', 'maria@maria.com', '123456');

-- Transaccion
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('1', 'Compra de insumos', '2021-05-01', 100.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('2', 'Compra de insumos', '2022-03-15', 50.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('3', 'Compra de insumos', '2023-07-20', 75.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('4', 'Compra de insumos', '2022-09-10', 325.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('5', 'Compra de insumos', '2023-11-05', 910.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('6', 'Compra de insumos', '2022-12-25', 500.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('7', 'Compra de insumos', '2021-08-30', 100.00);

-- InsumosTransaccion
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('1', 10, 10.00, '1', '1');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('2', 10, 5.00, '2', '2');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('3', 10, 7.50, '3', '3');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('4', 10, 32.50, '4', '4');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('5', 10, 91.00, '5', '5');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('6', 10, 50.00, '6', '6');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('7', 10, 10.00, '1', '7');

-- Imagen
INSERT INTO Imagen (ID, URL, resID) VALUES ('1', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '1');
INSERT INTO Imagen (ID, URL, resID) VALUES ('2', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '2');
INSERT INTO Imagen (ID, URL, resID) VALUES ('3', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '3');
INSERT INTO Imagen (ID, URL, resID) VALUES ('4', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '4');
INSERT INTO Imagen (ID, URL, resID) VALUES ('5', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '5');
INSERT INTO Imagen (ID, URL, resID) VALUES ('6', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '6');
INSERT INTO Imagen (ID, URL, resID) VALUES ('7', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '7');
INSERT INTO Imagen (ID, URL, resID) VALUES ('8', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '8');
INSERT INTO Imagen (ID, URL, resID) VALUES ('9', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '9');
INSERT INTO Imagen (ID, URL, resID) VALUES ('10', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '10');
INSERT INTO Imagen (ID, URL, resID) VALUES ('11', 'https://ganaderiasos.com/wp-content/uploads/2016/12/GSOO16Dc8-1068x776.jpg', '1');
INSERT INTO Imagen (ID, URL, resID) VALUES ('12', 'https://ganaderiasos.com/wp-content/uploads/2016/12/GSOO16Dc8-1068x776.jpg', '2');
INSERT INTO Imagen (ID, URL, resID) VALUES ('13', 'https://ganaderiasos.com/wp-content/uploads/2016/12/GSOO16Dc8-1068x776.jpg', '3');
INSERT INTO Imagen (ID, URL, resID) VALUES ('14', 'https://ganaderiasos.com/wp-content/uploads/2016/12/GSOO16Dc8-1068x776.jpg', '4');

-- InsumoServicio
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('1', '1', '1');
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('2', '2', '2');
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('3', '3', '3');
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('4', '4', '4');
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('5', '5', '5');
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('6', '6', '6');


