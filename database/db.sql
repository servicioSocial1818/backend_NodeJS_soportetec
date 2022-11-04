DROP DATABASE soportetec;
DROP TABLES Users;
DROP TABLES Roles;
DROP TABLES Assignments;
DROP TABLES Devices;
DROP TABLES Reports;

CREATE DATABASE soportetec;
USE soportetec;

CREATE TABLE Roles (
idRole INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
role_name VARCHAR(15) NOT NULL
);

INSERT INTO Roles(role_name) VALUES ("cliente");
INSERT INTO Roles(role_name) VALUES ("admin");
SELECT * FROM Roles;

SELECT Users.first_name, Roles.role_name
FROM Roles
INNER JOIN Users
ON Roles.idRole = Users.rol;

SELECT Users.idUser, Users.first_name, Users.paternal_surname, Users.maternal_surname, Users.username, Roles.role_name, Users.location, Users.phoneNumber, Users.email, Users.gender FROM Users INNER JOIN Roles ON Users.rol = Roles.idRole;

SELECT * FROM Users;
CREATE TABLE Users (
idUser INTEGER PRIMARY KEY AUTO_INCREMENT,
paternal_surname VARCHAR(25) NOT NULL,
maternal_surname VARCHAR(25) NOT NULL,
first_name VARCHAR(25) NOT NULL, 
date_birth VARCHAR(50) NULL,
gender VARCHAR(10) NULL,
phoneNumber VARCHAR(10) NULL,
email VARCHAR(50) NULL,
username VARCHAR(25) NOT NULL,
password VARCHAR(25) NOT NULL,
rol INTEGER NOT NULL,
location VARCHAR(25) NOT NULL,
FOREIGN KEY (rol) REFERENCES Roles(idRole)
ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO Users (paternal_surname, maternal_surname, first_name, gender, username, password, rol, location)
VALUES ("parternal1", "maternal1", "firstname", "masculino", "usuario", "contraseña", "1", "sistemas");

ALTER TABLE Users ADD COLUMN assignment BOOLEAN DEFAULT 0;
ALTER TABLE Devices ADD COLUMN assignment BOOLEAN DEFAULT 0;

DELIMITER $$
CREATE PROCEDURE addAssignment(
	IN p_idUser INTEGER,
    IN p_idDevice INTEGER,
    IN p_manager VARCHAR(100)
)
BEGIN
INSERT INTO Assignments(idUser, idDevice, manager) 
	VALUES (p_idUser, p_idDevice, p_manager);

UPDATE Devices SET assignment = 1 WHERE idDevice = p_idDevice;
END $$
DELIMITER ;

call addAssignment(16, 16, "CHECO PEREZ");
DROP PROCEDURE addAssignment;


DELIMITER $$
CREATE PROCEDURE deleteAssignment(
	IN p_idAssignment INTEGER,
    IN p_idUser INTEGER,
    IN p_idDevice INTEGER
)
BEGIN
DELETE FROM Assignments WHERE idAssignment = p_idAssignment;

UPDATE Users SET assignment = 0 WHERE idUser = p_idUser;

UPDATE Devices SET assignment = 0 WHERE idDevice = p_idDevice;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE deleteUser(
    IN p_idUser INTEGER
)
BEGIN

UPDATE Devices 
INNER JOIN Assignments ON Assignments.idUser = p_idUser
SET assignment = 0 
WHERE Devices.idDevice = Assignments.idDevice;

DELETE FROM Assignments WHERE idUser = p_idUser;

DELETE FROM Users WHERE idUser = p_idUser;
END $$
DELIMITER ;

SELECT Assignments.idDevice, Assignments.idUser, Assignments.idAssignment
FROM Users
INNER JOIN Assignments ON Users.idUser = Assignments.idUser WHERE Users.idUser = 507;

UPDATE Devices 
INNER JOIN Assignments ON Assignments.idUser = 507
SET assignment = 0 
WHERE Devices.idDevice = Assignments.idDevice;


DELIMITER $$
CREATE PROCEDURE deleteDevice(
    IN p_idDevice INTEGER
)
BEGIN
UPDATE Users 
INNER JOIN Assignments ON Assignments.idDevice = p_idDevice
SET assignment = 0 
WHERE Users.idUser = Assignments.idUser;

DELETE FROM Assignments WHERE idDevice = p_idDevice;
DELETE FROM Devices WHERE idDevice = p_idDevice;
END $$
DELIMITER ;

call deleteUser(1005);

call deleteAssignment(23, 16, 16);

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

ALTER TABLE Devices MODIFY description_device VARCHAR(50) NULL;
ALTER TABLE Devices MODIFY serie_number VARCHAR(50) NOT NULL;

CREATE TABLE Assignments (
idAssignment INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
idUser INTEGER UNIQUE KEY NOT NULL,
idDevice INTEGER UNIQUE KEY NOT NULL,
manager VARCHAR(100) NOT NULL,
FOREIGN KEY (idUser) REFERENCES Users(idUser)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (idDevice) REFERENCES Devices(idDevice)
ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO Assignments (idUser, idDevice, manager) 
VALUES 
(1, 1,"sadas"),
(2, 2,"sadas"),
(3, 3,"sadas"),
(4, 4,"sadas"),
(5, 5,"sadas"),
(6, 6,"sadas"),
(7, 7,"sadas"),
(8, 8,"sadas"),
(9, 9,"sadas"),
(10, 10,"sadas"),
(11, 11,"sadas"),
(12, 12,"sadas"),
(13, 13,"sadas"),
(14, 14,"sadas"),
(15, 15,"sadas"),
(16, 16,"sadas");
SELECT * FROM Assignments;

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
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (idAssignment) REFERENCES Assignments(idAssignment)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (idDevice) REFERENCES Devices(idDevice)
ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE Reports 
DROP COLUMN solution_problem
;
CREATE TABLE Articles(
idArticle INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
articleName VARCHAR(100),
stock INTEGER,
size VARCHAR(45)
);
CREATE TABLE Report_details(
idReportDetails INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
idArticle INTEGER NOT NULL,
idReport INTEGER NOT NULL,
amount INTEGER,
FOREIGN KEY (idArticle) REFERENCES Articles (idArticle)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (idReport) REFERENCES Reports (idReport)
ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT * FROM Reports;
 -- Muestra los datos de usuarios y equipos asignados
SELECT Assignments.idAssignment, Users.first_name, Users.paternal_surname, Users.maternal_surname, Devices.trademark, Assignments.manager, Devices.serie_number
FROM ((Assignments
INNER JOIN Users ON Assignments.idUser = Users.idUser)
INNER JOIN Devices ON Assignments.idDevice = Devices.idDevice);

    ----- MUESTRA USUARIOS QUE NO TIENEN REGISTRO DE ASIGNACION
    SELECT  Users.username
	FROM Users 
    LEFT OUTER JOIN Assignments ON Assignments.idAssignment = Users.idUser WHERE Assignments.idAssignment IS NULL;

-- MUESTA LOS EQUIPOS QUE NO TIENEN REGISTRO DE ASIGNACIÓN
SELECT Devices.serie_number, Devices.trademark, Devices.model, Devices.storage_device, Devices.ram, Assignments.idAssignment
FROM Devices
LEFT OUTER JOIN Assignments ON Assignments.idAssignment = Devices.idDevice WHERE Assignments.idAssignment IS NULL;


SELECT * FROM Assignments;
SELECT * FROM Users;
SELECT * FROM Devices;

DELETE Assignments, Users
FROM Assignments
INNER JOIN Users ON Assignments.idUser = Users.idUser
WHERE Users.idUser = 3;

