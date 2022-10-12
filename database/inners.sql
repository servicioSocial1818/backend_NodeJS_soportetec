 ----- MUESTRA USUARIOS QUE NO TIENEN REGISTRO DE ASIGNACION
    SELECT Assignments.idAssignment, Users.first_name, Users.paternal_surname, Users.maternal_surname, Assignments.manager, Users.idUser
	FROM Users 
    LEFT OUTER JOIN Assignments ON Assignments.idAssignment = Users.idUser WHERE Assignments.idAssignment IS NULL;

-- solo trae username
SELECT  Users.username FROM Users LEFT OUTER JOIN Assignments ON Assignments.idAssignment = Users.idUser WHERE Assignments.idAssignment IS NULL;