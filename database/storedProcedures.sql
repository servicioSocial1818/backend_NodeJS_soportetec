-- PARA CREAR ASIGNACION
DELIMITER $$
CREATE PROCEDURE addAssignment(
	IN p_idUser INTEGER,
    IN p_idDevice INTEGER,
    IN p_manager VARCHAR(100)
)
BEGIN
INSERT INTO Assignments(idUser, idDevice, manager) 
	VALUES (p_idUser, p_idDevice, p_manager);

UPDATE Users SET assignment = 1 WHERE idUser = p_idUser;

UPDATE Devices SET assignment = 1 WHERE idDevice = p_idDevice;
END $$
DELIMITER ;

-- Eliminar asignacion
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

-- Eliminar usuario y a su vez su registro de asignación
DELIMITER $$
CREATE PROCEDURE deleteUser(
    IN p_idUser INTEGER
)
BEGIN
DELETE FROM Assignments WHERE idUser = p_idUser;

DELETE FROM Users WHERE idUser = p_idUser;
END $$
DELIMITER ;

-- Eliminar usuario, su registro de asignacion y actualizar el equipo que tenía a  "false" = no asignado
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

-- Eliminar Equipo, su registro de asignacion y actualizar el usuario que tenía como propietario a "false" = sin asignación
DELIMITER $$
CREATE PROCEDURE deleteDevice(
    IN p_idDevice INTEGER
)
BEGIN
/*
UPDATE Users 
INNER JOIN Assignments ON Assignments.idDevice = p_idDevice
SET assignment = 0 
WHERE Users.idUser = Assignments.idUser;
*/
DELETE FROM Assignments WHERE idDevice = p_idDevice;
DELETE FROM Devices WHERE idDevice = p_idDevice;
END $$
DELIMITER ;


-- eliminar asignación con el id del equipo y actualizar el estado de asignación del equipo
DELIMITER $$
CREATE PROCEDURE deleteAssignment(
	IN p_idDevice INTEGER
)
BEGIN

UPDATE Devices 
INNER JOIN Assignments ON Assignments.idDevice = Devices.idDevice
SET Devices.assignment = 0 WHERE Assignments.idDevice = p_idDevice;

DELETE FROM Assignments WHERE idDevice = p_idDevice;


END $$
DELIMITER ;