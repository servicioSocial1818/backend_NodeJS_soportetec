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