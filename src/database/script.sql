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
    ADD FOREIGN KEY (resID) REFERENCES res(ID);

    -- Fin de las sentencias ALTER TABLE con comentarios

