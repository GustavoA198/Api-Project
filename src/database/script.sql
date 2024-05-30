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
FOREIGN KEY (resID) REFERENCES res(ID);
-- Fin de las sentencias ALTER TABLE con comentarios


-- Inicio de la insercion de datos de prueba

-- Cliente
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('00000000-0000-0000-0000-000000000001', '123456789', 'Juan Perez', 'Calle 123', '1234567', 'juan@gmail.com');
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('00000000-0000-0000-0000-000000000002', '987654321', 'Maria Rodriguez', 'Calle 456', '7654321', 'maria@gmail.com');
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('00000000-0000-0000-0000-000000000003', '123123123', 'Pedro Gomez', 'Calle 789', '3213213', 'pedro@gmail.com');
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('00000000-0000-0000-0000-000000000004', '321321321', 'Luisa Perez', 'Calle 321', '3213213', 'luisa@gmail.com');
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('00000000-0000-0000-0000-000000000005', '456456456', 'Carlos Rodriguez', 'Calle 654', '6546546', 'carlos@gmail.com');
INSERT INTO Cliente (ID, Identificacion, Nombre, Direccion, Telefono, Email) VALUES ('00000000-0000-0000-0000-000000000006', '654654654', 'Ana Gomez', 'Calle 987', '6546546', 'ana@gmail.com');

-- Finca
INSERT INTO Finca (ID, Nombre, Direccion, Observaciones) VALUES ('00000000-0000-0000-0000-000000000001', 'Finca La Esperanza', 'Calle 123', 'Finca de prueba');
INSERT INTO Finca (ID, Nombre, Direccion, Observaciones) VALUES ('00000000-0000-0000-0000-000000000002', 'Finca La Ilusion', 'Calle 456', 'Finca de prueba');
INSERT INTO Finca (ID, Nombre, Direccion, Observaciones) VALUES ('00000000-0000-0000-0000-000000000003', 'Finca La Alegria', 'Calle 789', 'Finca de prueba');
INSERT INTO Finca (ID, Nombre, Direccion, Observaciones) VALUES ('00000000-0000-0000-0000-000000000004', 'Finca La Felicidad', 'Calle 321', 'Finca de prueba');

-- Lote
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('00000000-0000-0000-0000-000000000001', 'Lote 1', 1, 25, '00000000-0000-0000-0000-000000000001');   
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('00000000-0000-0000-0000-000000000002', 'Lote 2', 2, 30, '00000000-0000-0000-0000-000000000001');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('00000000-0000-0000-0000-000000000003', 'Lote 3', 3, 20, '00000000-0000-0000-0000-000000000002');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('00000000-0000-0000-0000-000000000004', 'Lote 4', 4, 15, '00000000-0000-0000-0000-000000000002');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('00000000-0000-0000-0000-000000000005', 'Lote 5', 5, 10, '00000000-0000-0000-0000-000000000003');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('00000000-0000-0000-0000-000000000006', 'Lote 6', 6, 5, '00000000-0000-0000-0000-000000000003');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('00000000-0000-0000-0000-000000000007', 'Lote 7', 7, 10, '00000000-0000-0000-0000-000000000004');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('00000000-0000-0000-0000-000000000008', 'Lote 8', 8, 15, '00000000-0000-0000-0000-000000000004');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('00000000-0000-0000-0000-000000000009', 'Lote 9', 9, 20, '00000000-0000-0000-0000-000000000004');
INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES ('00000000-0000-0000-0000-000000000010', 'Lote 10', 10, 25, '00000000-0000-0000-0000-000000000004');

-- Insumo
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('00000000-0000-0000-0000-000000000001', 'Vacuna 1', '2021-05-17', 100, '2022-01-01', 'Vacuna para enfermedades comunes');
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('00000000-0000-0000-0000-000000000002', 'Vacuna 2', '2021-05-17', 50, '2022-01-01', 'Vacuna para enfermedades comunes');
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('00000000-0000-0000-0000-000000000003', 'Vacuna 3', '2021-05-17', 75, '2022-01-01', 'Vacuna para enfermedades comunes');
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('00000000-0000-0000-0000-000000000004', 'Vacuna 4', '2021-05-17', 25, '2022-01-01', 'Vacuna para enfermedades comunes');
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('00000000-0000-0000-0000-000000000005', 'Vacuna 5', '2021-05-17', 10, '2022-01-01', 'Vacuna para enfermedades comunes');
INSERT INTO Insumo (ID, Nombre, FechaIngreso, CantidadActual, FechaVencimiento, Observaciones) VALUES ('00000000-0000-0000-0000-000000000006', 'Vacuna 6', '2021-05-17', 5, '2022-01-01', 'Vacuna para enfermedades comunes');

-- Actividad
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('00000000-0000-0000-0000-000000000001', '2021-02-15', 'Fumigada', '2021-03-01', '00000000-0000-0000-0000-000000000001', 'Actividad de prueba');
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('00000000-0000-0000-0000-000000000002', '2022-03-10', 'Fumigada', '2022-04-05', '00000000-0000-0000-0000-000000000002', 'Actividad de prueba');
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('00000000-0000-0000-0000-000000000003', '2023-04-05', 'Limpieza', '2023-05-01', '00000000-0000-0000-0000-000000000003', 'Actividad de prueba');
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('00000000-0000-0000-0000-000000000004', '2022-05-20', 'Limpieza', '2022-06-15', '00000000-0000-0000-0000-000000000004', 'Actividad de prueba');
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('00000000-0000-0000-0000-000000000005', '2023-06-30', 'Cercada', '2023-07-20', '00000000-0000-0000-0000-000000000005', 'Actividad de prueba');
INSERT INTO Actividad (ID, Fecha, Tipo, TiempoCarencia, LoteID, Observaciones) VALUES ('00000000-0000-0000-0000-000000000006', '2021-07-25', 'Cercada', '2021-08-10', '00000000-0000-0000-0000-000000000006', 'Actividad de prueba');


-- InsumosActividad
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002');
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003');
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004');
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005');
INSERT INTO InsumosActividad (ID, InsumoID, ActividadID) VALUES ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006');

-- Ocupacion
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('00000000-0000-0000-0000-000000000001', 10, '2021-02-15', 'Lecheras', '2021-03-15', '00000000-0000-0000-0000-000000000001');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('00000000-0000-0000-0000-000000000002', 15, '2023-04-05', 'Secas', '2023-05-05', '00000000-0000-0000-0000-000000000002');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('00000000-0000-0000-0000-000000000003', 20, '2023-06-30', 'Engorde', '2023-07-30', '00000000-0000-0000-0000-000000000003');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('00000000-0000-0000-0000-000000000004', 25, '2021-08-30', 'Novillas', '2021-09-30', '00000000-0000-0000-0000-000000000004');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('00000000-0000-0000-0000-000000000005', 30, '2022-09-05', 'Novillos', '2022-10-05', '00000000-0000-0000-0000-000000000005');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('00000000-0000-0000-0000-000000000006', 35, '2023-10-30', 'Otro', '2023-11-30', '00000000-0000-0000-0000-000000000006');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('00000000-0000-0000-0000-000000000007', 40, '2020-01-01', 'Lecheras', '2020-01-31', '00000000-0000-0000-0000-000000000007');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('00000000-0000-0000-0000-000000000008', 45, '2020-02-01', 'Secas', '2020-02-29', '00000000-0000-0000-0000-000000000008');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('00000000-0000-0000-0000-000000000009', 50, '2020-03-01', 'Engorde', '2020-03-31', '00000000-0000-0000-0000-000000000009');
INSERT INTO Ocupacion (ID, NoAnimales, FechaIngreso, TipoRebano, FechaSalida, LoteID) VALUES ('00000000-0000-0000-0000-000000000010', 55, '2020-04-01', 'Novillas', '2020-04-30', '00000000-0000-0000-0000-000000000010');

-- Productos
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('00000000-0000-0000-0000-000000000001', 'Leche', '2021-02-15', 100);
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('00000000-0000-0000-0000-000000000002', 'Carne', '2022-03-10', 550);
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('00000000-0000-0000-0000-000000000003', 'Leche', '2023-04-05', 75);
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('00000000-0000-0000-0000-000000000004', 'Carne', '2022-05-20', 425);
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('00000000-0000-0000-0000-000000000005', 'Leche', '2023-06-30', 114);
INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES ('00000000-0000-0000-0000-000000000006', 'Carne', '2021-07-25', 295);

-- Venta
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('00000000-0000-0000-0000-000000000001', 100.00, 'Venta de prueba', '00000000-0000-0000-0000-000000000001');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('00000000-0000-0000-0000-000000000002', 50.00, 'Venta de prueba', '00000000-0000-0000-0000-000000000002');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('00000000-0000-0000-0000-000000000003', 75.00, 'Venta de prueba', '00000000-0000-0000-0000-000000000003');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('00000000-0000-0000-0000-000000000004', 25.00, 'Venta de prueba', '00000000-0000-0000-0000-000000000004');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('00000000-0000-0000-0000-000000000005', 10.00, 'Venta de prueba', '00000000-0000-0000-0000-000000000005');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('00000000-0000-0000-0000-000000000006', 5.00, 'Venta de prueba', '00000000-0000-0000-0000-000000000006');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('00000000-0000-0000-0000-000000000007', 100.00, 'Venta de prueba', '00000000-0000-0000-0000-000000000001');
INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES ('00000000-0000-0000-0000-000000000008', 50.00, 'Venta de prueba', '00000000-0000-0000-0000-000000000002');

-- ProductosVentas
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('00000000-0000-0000-0000-000000000001', 10.00, 10, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('00000000-0000-0000-0000-000000000002', 5.00, 10, '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('00000000-0000-0000-0000-000000000003', 7.50, 10, '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('00000000-0000-0000-0000-000000000004', 2.50, 10, '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('00000000-0000-0000-0000-000000000005', 1.00, 10, '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('00000000-0000-0000-0000-000000000006', 0.50, 10, '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('00000000-0000-0000-0000-000000000007', 10.00, 10, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000007');
INSERT INTO ProductosVentas (ID, PrecioUnitario, Cantidad, ProductoID, VentaID) VALUES ('00000000-0000-0000-0000-000000000008', 5.00, 10, '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000008');

   -- Reses madres y padres sin relaciones parentales iniciales
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('00000000-0000-0000-0000-000000000001', 1, 'Pepe', 'Leche', '2015-01-01', 'Activa', NULL, NULL, 900.00, 50.00, 'M', 'Holstein', 0, '123456789', 'Padre de varias reses', '00000000-0000-0000-0000-000000000001');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('00000000-0000-0000-0000-000000000002', 2, 'Luisa', 'Leche', '2015-02-01', 'Activa', NULL, NULL, 850.00, 50.00, 'F', 'Holstein', 0, '987654321', 'Madre de varias reses', '00000000-0000-0000-0000-000000000002');

-- Reses hijas con sus relaciones parentales
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('00000000-0000-0000-0000-000000000003', 3, 'Juanita', 'Leche', '2023-01-01', 'Activa', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 100.00, 50.00, 'F', 'Holstein', 0, '123456789', 'Hija de Luisa y Pepe', '00000000-0000-0000-0000-000000000001');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('00000000-0000-0000-0000-000000000004', 4, 'Maria', 'Leche', '2019-01-01', 'Activa', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 100.00, 50.00, 'F', 'Holstein', 0, '123456789', 'Hija de Luisa y Pepe', '00000000-0000-0000-0000-000000000002');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('00000000-0000-0000-0000-000000000005', 5, 'Pepa', 'Leche', '2021-01-15', 'Activa', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 100.00, 50.00, 'F', 'Holstein', 0, '123456789', 'Hija de Luisa y Pepe', '00000000-0000-0000-0000-000000000003');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('00000000-0000-0000-0000-000000000006', 6, 'Luna', 'Leche', '2018-08-01', 'Activa', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 100.00, 50.00, 'F', 'Holstein', 0, '123456789', 'Hija de Luisa y Pepe', '00000000-0000-0000-0000-000000000004');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('00000000-0000-0000-0000-000000000007', 7, 'Estrella', 'Leche', '2020-01-01', 'Activa', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 100.00, 50.00, 'F', 'Holstein', 0, '123456789', 'Hija de Luisa y Pepe', '00000000-0000-0000-0000-000000000004');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('00000000-0000-0000-0000-000000000008', 8, 'Rey', 'Leche', '2019-01-21', 'Activa', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 110.00, 55.00, 'M', 'Holstein', 0, '987654321', 'Hijo de Luisa y Pepe', '00000000-0000-0000-0000-000000000001');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('00000000-0000-0000-0000-000000000009', 9, 'Rosa', 'Leche', '2022-01-30', 'Activa', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 105.00, 53.00, 'F', 'Holstein', 0, '987654322', 'Hija de Luisa y Pepe', '00000000-0000-0000-0000-000000000002');
INSERT INTO Res (ID, Numero, Nombre, Tipo, FechaNacimiento, Estado, Madre, Padre, PesoActual, PesoNacimiento, Sexo, Raza, NumeroPartos, RegistroICA, Observaciones, FincaID) 
VALUES ('00000000-0000-0000-0000-000000000010', 10, 'Jazmín', 'Leche', '2020-01-01', 'Activa', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 108.00, 54.00, 'F', 'Holstein', 0, '987654323', 'Hija de Luisa y Pepe', '00000000-0000-0000-0000-000000000003');

-- Alimentos
INSERT INTO alimento (ID, Nombre, Tipo) VALUES ('00000000-0000-0000-0000-000000000001', 'Concentrado terneros', 'Concentrado');
INSERT INTO alimento (ID, Nombre, Tipo) VALUES ('00000000-0000-0000-0000-000000000002', 'Concentrado vacas', 'Concentrado');
INSERT INTO alimento (ID, Nombre, Tipo) VALUES ('00000000-0000-0000-0000-000000000003', 'Concentrado vacas en secado', 'Concentrado');

-- Muertes
INSERT INTO Muerte (ID, Fecha, Causa, Observaciones, ResID) VALUES ('00000000-0000-0000-0000-000000000001', '2020-01-01', 'Enfermedad', 'Muerte de prueba', '00000000-0000-0000-0000-000000000001');
INSERT INTO Muerte (ID, Fecha, Causa, Observaciones, ResID) VALUES ('00000000-0000-0000-0000-000000000002', '2020-01-01', 'Enfermedad', 'Muerte de prueba', '00000000-0000-0000-0000-000000000002');

-- Produccion individual
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000001', '2020-01-01', 'Leche', 10.00, '00000000-0000-0000-0000-000000000001');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000002', '2020-01-01', 'Leche', 10.00, '00000000-0000-0000-0000-000000000002');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000003', '2020-01-01', 'Leche', 10.00, '00000000-0000-0000-0000-000000000003');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000004', '2020-01-01', 'Leche', 10.00, '00000000-0000-0000-0000-000000000004');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000005', '2020-01-01', 'Leche', 10.00, '00000000-0000-0000-0000-000000000005');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000006', '2020-01-01', 'Leche', 10.00, '00000000-0000-0000-0000-000000000006');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000007', '2020-01-01', 'Leche', 10.00, '00000000-0000-0000-0000-000000000007');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000008', '2020-01-01', 'Leche', 10.00, '00000000-0000-0000-0000-000000000008');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000009', '2020-01-01', 'Leche', 10.00, '00000000-0000-0000-0000-000000000009');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000010', '2020-01-02', 'Leche', 10.00, '00000000-0000-0000-0000-000000000010');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000011', '2020-01-02', 'Carne', 10.00, '00000000-0000-0000-0000-000000000001');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000012', '2020-01-02', 'Carne', 10.00, '00000000-0000-0000-0000-000000000002');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000013', '2020-01-02', 'Carne', 10.00, '00000000-0000-0000-0000-000000000003');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000014', '2020-01-02', 'Carne', 10.00, '00000000-0000-0000-0000-000000000004');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000015', '2020-01-02', 'Carne', 10.00, '00000000-0000-0000-0000-000000000005');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000016', '2020-01-02', 'Carne', 10.00, '00000000-0000-0000-0000-000000000006');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000017', '2020-01-02', 'Carne', 10.00, '00000000-0000-0000-0000-000000000007');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000018', '2020-01-02', 'Carne', 10.00, '00000000-0000-0000-0000-000000000008');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000019', '2020-01-02', 'Carne', 10.00, '00000000-0000-0000-0000-000000000009');
INSERT INTO ProduccionIndividual (ID, Fecha, Tipo, Cantidad, ResID) VALUES ('00000000-0000-0000-0000-000000000020', '2020-01-02', 'Carne', 10.00, '00000000-0000-0000-0000-000000000010');

-- Servicio
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('00000000-0000-0000-0000-000000000001', 'Inseminacion', '2021-02-15', 'Juan Perez', 'Servicio de prueba');
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('00000000-0000-0000-0000-000000000002', 'Inseminacion', '2022-03-10', 'Maria Rodriguez', 'Servicio de prueba');
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('00000000-0000-0000-0000-000000000003', 'Inseminacion', '2023-04-05', 'Pedro Gomez', 'Servicio de prueba');
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('00000000-0000-0000-0000-000000000004', 'Inseminacion', '2022-05-20', 'Luisa Perez', 'Servicio de prueba');
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('00000000-0000-0000-0000-000000000005', 'Podología', '2023-06-30', 'Carlos Rodriguez', 'Servicio de prueba');
INSERT INTO Servicio (ID, Tipo, Fecha, Veterinario, Observaciones) VALUES ('00000000-0000-0000-0000-000000000006', 'Inseminacion', '2021-07-25', 'Ana Gomez', 'Servicio de prueba');

-- Montas
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('00000000-0000-0000-0000-000000000001', '2020-01-25', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('00000000-0000-0000-0000-000000000002', '2021-02-11', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('00000000-0000-0000-0000-000000000003', '2021-01-01', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('00000000-0000-0000-0000-000000000004', '2023-01-01', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000008');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('00000000-0000-0000-0000-000000000005', '2024-08-01', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('00000000-0000-0000-0000-000000000006', '2021-01-10', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000008');
INSERT INTO Monta (ID, FechaParto, ServicioID, ToroID) VALUES ('00000000-0000-0000-0000-000000000007', '2020-09-01', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000008');

-- Inseminaciones
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('00000000-0000-0000-0000-000000000001', '2022-01-25', '00000000-0000-0000-0000-000000000002');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('00000000-0000-0000-0000-000000000002', '2023-02-11', '00000000-0000-0000-0000-000000000004');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('00000000-0000-0000-0000-000000000003', '2022-03-01', '00000000-0000-0000-0000-000000000006');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('00000000-0000-0000-0000-000000000004', '2023-04-15', '00000000-0000-0000-0000-000000000002');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('00000000-0000-0000-0000-000000000005', '2021-06-10', '00000000-0000-0000-0000-000000000004');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('00000000-0000-0000-0000-000000000006', '2023-07-20', '00000000-0000-0000-0000-000000000006');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('00000000-0000-0000-0000-000000000007', '2021-08-25', '00000000-0000-0000-0000-000000000002');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('00000000-0000-0000-0000-000000000008', '2022-09-05', '00000000-0000-0000-0000-000000000004');
INSERT INTO Inseminacion (ID, FechaParto, ServicioID) VALUES ('00000000-0000-0000-0000-000000000009', '2023-10-30', '00000000-0000-0000-0000-000000000006');

-- Uso
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('00000000-0000-0000-0000-000000000001', 'consumo personal', '2022-01-15', 10, '00000000-0000-0000-0000-000000000001');   
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('00000000-0000-0000-0000-000000000002', 'alimentar terneros', '2023-03-10', 15, '00000000-0000-0000-0000-000000000002');
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('00000000-0000-0000-0000-000000000003', 'alimentar terneros', '2021-06-25', 20, '00000000-0000-0000-0000-000000000003'); 
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('00000000-0000-0000-0000-000000000004', 'alimentar terneros', '2022-09-05', 25, '00000000-0000-0000-0000-000000000004'); 
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('00000000-0000-0000-0000-000000000005', 'alimentar terneros', '2023-11-18', 30, '00000000-0000-0000-0000-000000000005'); 
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('00000000-0000-0000-0000-000000000006', 'alimentar terneros', '2021-12-02', 35, '00000000-0000-0000-0000-000000000004');
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('00000000-0000-0000-0000-000000000007', 'alimentar terneros', '2022-07-22', 40, '00000000-0000-0000-0000-000000000001');
INSERT INTO Uso (ID, Justificacion, Fecha, Cantidad, ProductoID) VALUES ('00000000-0000-0000-0000-000000000008', 'alimentar terneros', '2023-08-30', 45, '00000000-0000-0000-0000-000000000002');

-- Usuario
INSERT INTO Usuario (ID, Tipo, Identificacion, Nombre, Direccion, Telefono, Email, Contraseña) VALUES ('00000000-0000-0000-0000-000000000001', 'admin', '123456789', 'Juan Perez', 'Calle 123', '1234567', 'juan@juan.com', '123456');
INSERT INTO Usuario (ID, Tipo, Identificacion, Nombre, Direccion, Telefono, Email, Contraseña) VALUES ('00000000-0000-0000-0000-000000000002', 'operario', '987654321', 'Maria Rodriguez', 'Calle 456', '7654321', 'maria@maria.com', '123456');

-- Transaccion
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('00000000-0000-0000-0000-000000000001', 'Compra de insumos', '2021-05-01', 100.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('00000000-0000-0000-0000-000000000002', 'Compra de insumos', '2022-03-15', 50.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('00000000-0000-0000-0000-000000000003', 'Compra de insumos', '2023-07-20', 75.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('00000000-0000-0000-0000-000000000004', 'Compra de insumos', '2022-09-10', 325.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('00000000-0000-0000-0000-000000000005', 'Compra de insumos', '2023-11-05', 910.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('00000000-0000-0000-0000-000000000006', 'Compra de insumos', '2022-12-25', 500.00);
INSERT INTO Transaccion (ID, Descripcion, Fecha, Valor) VALUES ('00000000-0000-0000-0000-000000000007', 'Compra de insumos', '2021-08-30', 100.00);

-- InsumosTransaccion
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('00000000-0000-0000-0000-000000000001', 10, 10.00, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('00000000-0000-0000-0000-000000000002', 10, 5.00, '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('00000000-0000-0000-0000-000000000003', 10, 7.50, '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('00000000-0000-0000-0000-000000000004', 10, 32.50, '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('00000000-0000-0000-0000-000000000005', 10, 91.00, '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('00000000-0000-0000-0000-000000000006', 10, 50.00, '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006');
INSERT INTO InsumosTransaccion (ID, Cantidad, ValorUnitario, InsumoID, TransaccionID) VALUES ('00000000-0000-0000-0000-000000000007', 10, 10.00, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000007');

-- Imagen
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000001', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '00000000-0000-0000-0000-000000000001');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000002', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '00000000-0000-0000-0000-000000000002');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000003', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '00000000-0000-0000-0000-000000000003');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000004', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '00000000-0000-0000-0000-000000000004');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000005', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '00000000-0000-0000-0000-000000000005');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000006', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '00000000-0000-0000-0000-000000000006');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000007', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '00000000-0000-0000-0000-000000000007');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000008', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '00000000-0000-0000-0000-000000000008');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000009', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '00000000-0000-0000-0000-000000000009');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000010', 'https://riquezasdebolivia.com/wp-content/uploads/2…ses-de-20-a-25-meses-de-edad-1300-libras-peso.jpg', '00000000-0000-0000-0000-000000000010');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000011', 'https://ganaderiasos.com/wp-content/uploads/2016/12/GSOO16Dc8-1068x776.jpg', '00000000-0000-0000-0000-000000000001');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000012', 'https://ganaderiasos.com/wp-content/uploads/2016/12/GSOO16Dc8-1068x776.jpg', '00000000-0000-0000-0000-000000000002');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000013', 'https://ganaderiasos.com/wp-content/uploads/2016/12/GSOO16Dc8-1068x776.jpg', '00000000-0000-0000-0000-000000000003');
INSERT INTO Imagen (ID, URL, resID) VALUES ('00000000-0000-0000-0000-000000000014', 'https://ganaderiasos.com/wp-content/uploads/2016/12/GSOO16Dc8-1068x776.jpg', '00000000-0000-0000-0000-000000000004');

-- InsumoServicio
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002');
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003');
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004');
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005');
INSERT INTO InsumoServicio (ID, InsumoID, ServicioID) VALUES ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006');
