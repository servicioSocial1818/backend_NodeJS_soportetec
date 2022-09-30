DROP DATABASE soportetec;
CREATE DATABASE soportetec;

CREATE TABLE Roles (
idRole INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
role_name VARCHAR(15) NOT NULL
);

INSERT INTO Roles(role_name) VALUES ("cliente");
INSERT INTO Roles(role_name) VALUES ("admin");
SELECT * FROM Roles;

CREATE TABLE Users (
idUser INTEGER PRIMARY KEY AUTO_INCREMENT,
paternal_surname VARCHAR(25) NOT NULL,
maternal_surname VARCHAR(25) NOT NULL,
first_name VARCHAR(25) NOT NULL, 
date_birth VARCHAR(50) NULL,
gender VARCHAR(10) NULL,
phoneNumber VARCHAR(10) NULL,
email VARCHAR(25) NULL,
username VARCHAR(25) NOT NULL,
password VARCHAR(25) NOT NULL,
rol INTEGER NOT NULL,
location VARCHAR(25) NOT NULL,
FOREIGN KEY (rol) REFERENCES Roles(idRole)
ON UPDATE CASCADE ON DELETE RESTRICT
);

INSERT INTO Users (paternal_surname, maternal_surname, first_name, gender, username, password, rol, location)
VALUES ("parternal1", "maternal1", "firstname", "masculino", "usuario", "contraseña", "1", "sistemas");

CREATE TABLE Devices (
idDevice INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
description_device VARCHAR(50) NOT NULL,
serie_number VARCHAR(50) DEFAULT NULL,
device_type VARCHAR(25) NOT NULL,
trademark VARCHAR(20),
model VARCHAR(35),
monitor VARCHAR(20) DEFAULT NULL,
perifericos VARCHAR(50) DEFAULT NULL,
storage_device VARCHAR(50) DEFAULT NULL,
ram VARCHAR(10) DEFAULT NULL,
processor VARCHAR(25) DEFAULT NULL,
graphic_card VARCHAR(20) DEFAULT NULL,
color VARCHAR(15)
);
SELECT * FROM Devices;

CREATE TABLE Assignments (
idAssignment INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
idUser INTEGER NOT NULL,
idDevice INTEGER UNIQUE KEY NOT NULL,
manager VARCHAR(100) NOT NULL,
FOREIGN KEY (idUser) REFERENCES Users(idUser)
ON UPDATE CASCADE ON DELETE RESTRICT,
FOREIGN KEY (idDevice) REFERENCES Devices(idDevice)
ON UPDATE CASCADE ON DELETE RESTRICT
);

-- CREATE PROCEDURE deviceAssignment (
-- 	IN manager VARCHAR(100),
--     IN idUser INT,
--     IN serie_number VARCHAR(50),
--     IN device_type VARCHAR(25),
--     IN trademark VARCHAR(20),
--     IN model VARCHAR(35),
--     IN color VARCHAR(15),
--     IN description_device VARCHAR(25),
--     IN monitor VARCHAR(20),
--     IN perifericos VARCHAR(50),
--     IN storage_device VARCHAR(50),
--     IN ram VARCHAR(10),
--     IN processor VARCHAR(25),
--     IN graphic_card VARCHAR(20)
-- );

CREATE TABLE Reports (
idReport INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
idUser INTEGER NOT NULL,
idAssignment INTEGER NOT NULL,
idDevice INTEGER NOT NULL,
problem_description VARCHAR(200),
solution_problem VARCHAR(200),
done BOOLEAN NOT NULL DEFAULT 0,
create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (idUser) REFERENCES Users(idUser)
ON UPDATE CASCADE ON DELETE RESTRICT,
FOREIGN KEY (idAssignment) REFERENCES Assignments(idAssignment)
ON UPDATE CASCADE ON DELETE RESTRICT,
FOREIGN KEY (idDevice) REFERENCES Devices(idDevice)
ON UPDATE CASCADE ON DELETE RESTRICT
);

SELECT * FROM Users;