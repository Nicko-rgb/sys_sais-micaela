// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Importar mysql2
const cron = require('node-cron');
const nodemailer = require('nodemailer'); // Importar nodemailer para enviar correos electrónicos
const crypto = require('crypto'); // Importar crypto para generar tokens únicos
const app = express();
const PORT = process.env.PORT || 5000;
// Configura tu conexión a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_sais'
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Verificar conexión a la base de datos
const testDatabaseConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos exitosa!');
        connection.release(); // Liberar la conexión
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

// Endpoint para obtener pacientes con búsqueda y resultados aleatorios
app.get('/api/obtener/pacientes', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const { searchTerm = '' } = req.query; // Obtener el término de búsqueda

        let query = 'SELECT * FROM pacientes';
        const params = [];

        if (searchTerm) {
            // Separar el término de búsqueda en palabras
            const searchTerms = searchTerm.trim().toLowerCase().split(/\s+/);
            const conditions = [];

            // Crear condiciones para cada término de búsqueda
            searchTerms.forEach(term => {
                conditions.push(`(LOWER(dni) LIKE ? OR LOWER(hist_clinico) LIKE ? OR LOWER(CONCAT(ape_paterno, ' ', ape_materno, ', ', nombres)) LIKE ?)`);
                params.push(`%${term}%`, `%${term}%`, `%${term}%`);
            });

            // Unir las condiciones con OR
            query += ' WHERE ' + conditions.join(' OR ');
        }

        query += ' ORDER BY RAND() LIMIT 10'; // Ordenar aleatoriamente y limitar a 10 resultados

        const [rows] = await connection.execute(query, params);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los pacientes', error: error.message });
    } finally {
        connection.release();
    }
});

// Endpoint para registrar pacientes
app.post('/api/registrar/pacientes', async (req, res) => {
    const pacienteData = req.body;

    const connection = await pool.getConnection(); // Usar el pool de conexiones
    try {
        await connection.beginTransaction(); // Iniciar transacción

        let idResponsable = null;

        // Si hay responsable, insertar en responsable_de_paciente
        if (pacienteData.responsable) {
            const responsable = pacienteData.responsable;
            const [result] = await connection.execute(
                `INSERT INTO responsable_de_paciente (dni_res, tipo_res, ape_paterno_res, ape_materno_res, nombres_res, celular1_res, celular2_res, localidad_res, sector_res, direccion_res, departamento_res, provincia_res, distrito_res) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    responsable.dniRes,
                    responsable.tipoRes,
                    responsable.ape_paternoRes,
                    responsable.ape_maternoRes,
                    responsable.nombresRes,
                    responsable.celular1Res || null,
                    responsable.celular2Res || null,
                    responsable.localidadRes,
                    responsable.sectorRes,
                    responsable.direccionRes,
                    responsable.departamentoRes,
                    responsable.provinciaRes,
                    responsable.distritoRes,
                ]
            );
            idResponsable = result.insertId; // Obtener el ID del responsable insertado
        }

        // Insertar en pacientes
        const [pacienteResult] = await connection.execute(
            `INSERT INTO pacientes (dni, CNV_linea, hist_clinico, ape_paterno, ape_materno, nombres, fecha_nacimiento, edad, sexo, discapacidad, celular1, celular2, localidad, sector, direccion, departamento, provincia, distrito, tipo_paciente, id_responsable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                pacienteData.dni,
                pacienteData.cnvLinea,
                pacienteData.historiaClinico,
                pacienteData.paterno,
                pacienteData.materno,
                pacienteData.nombre,
                pacienteData.fechaNacimiento,
                pacienteData.edad,
                pacienteData.sexo,
                pacienteData.discapacidad || null,
                pacienteData.celular1 || null,
                pacienteData.celular2 || null,
                pacienteData.localidad,
                pacienteData.sector || null,
                pacienteData.direccion,
                pacienteData.departamento,
                pacienteData.provincia,
                pacienteData.distrito,
                pacienteData.tipoPaciente,
                idResponsable, // Relacionar con el ID del responsable (puede ser null)
            ]
        );

        await connection.commit(); // Confirmar transacción
        res.status(201).json({ message: 'Paciente guardado correctamente', idPaciente: pacienteResult.insertId });
    } catch (error) {
        await connection.rollback(); // Revertir transacción en caso de error
        console.error(error);
        res.status(500).json({ message: 'Error al guardar el paciente', error: error.message });
    } finally {
        connection.release(); // Cerrar conexión
    }
});


// Endpoint para obtener datos del paciente según su historial clínico
app.get('/api/obtener-pacientes/hist-clinico/:historialClinico', async (req, res) => {
    const { historialClinico } = req.params;

    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(
            `SELECT p.*, r.*
             FROM pacientes p
             LEFT JOIN responsable_de_paciente r ON p.id_responsable = r.id_responsable
             WHERE p.hist_clinico = ?`,
            [historialClinico]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
    } finally {
        connection.release(); 
    }
});

//ruta optener datos de paciente segun dni
app.get('/api/obtener-pacientes/dni/:dni', async (req, res) => {
    const { dni } = req.params; // Obtener el DNI de los parámetros
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(
            `SELECT p.*, r.*
             FROM pacientes p
             LEFT JOIN responsable_de_paciente r ON p.id_responsable = r.id_responsable
             WHERE p.dni = ?`,
            [dni]
        )
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.json(rows[0]); // Devolver el primer paciente encontrado
    }
    catch (err) {
        console.error(err);
    } finally {
        connection.release();
    }
})


//ruta para filtrar pacientes segun tipo de paciente
app.get('/api/obtener-tipo/pacientes', async (req, res) => {
    const { tipo } = req.query; // Obtener el tipo de paciente de la consulta

    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(
            `
            SELECT 
                p.*, 
                r.* -- Selecciona todas las columnas de la tabla responsable_de_paciente
            FROM pacientes p
            LEFT JOIN responsable_de_paciente r ON p.id_responsable = r.id_responsable  
            WHERE p.tipo_paciente = ?
            `,
            [tipo]
        );

        res.json(rows); // Devolver los pacientes filtrados junto con los datos del responsable
    } catch (error) {
        console.error('Error al obtener pacientes:', error);
        res.status(500).json({ message: 'Error al obtener pacientes', error: error.message });
    } finally {
        connection.release(); // Liberar la conexión
    }
});

// Endpoint para actualizar los datos del paciente**************************************
app.put("/api/actualizar/paciente/:id_paciente", async (req, res) => {
    const { id_paciente } = req.params;
    const pacienteData = req.body;

    console.log("Datos recibidos para paciente:", pacienteData); // Log de los datos recibidos

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        console.log("Actualizando datos del paciente...");
        // Actualizar datos del paciente
        const [updateResult] = await connection.execute(
            `UPDATE pacientes SET 
              dni = ?, CNV_linea = ?, hist_clinico = ?, nombres = ?, 
              ape_paterno = ?, ape_materno = ?, fecha_nacimiento = ?, 
              edad = ?, sexo = ?
              WHERE id_paciente = ?`,
            [
                pacienteData.dni || null,
                pacienteData.cnv_linea,
                pacienteData.hist_clinico,
                pacienteData.nombres,
                pacienteData.ape_paterno,
                pacienteData.ape_materno,
                pacienteData.fecha_nacimiento,
                pacienteData.edad,
                pacienteData.sexo,
                id_paciente,
            ]
        );
        console.log("Resultado de la actualización del paciente:", updateResult);

        await connection.commit();
        console.log("Transacción completada con éxito");
        res.json({ message: "Datos del paciente actualizados correctamente" });
    } catch (error) {
        await connection.rollback();
        console.error("Error detallado al actualizar los datos del paciente:", error);
        res.status(500).json({
            message: "Error al actualizar los datos del paciente",
            error: error.message,
            stack: error.stack
        });
    } finally {
        connection.release();
    }
});

// Endpoint para actualizar los datos del responsable**************************************************
app.put("/api/actualizar/responsable/:id_responsable", async (req, res) => {
    const { id_responsable } = req.params;
    const responsableData = req.body;

    console.log("Datos recibidos para responsable:", responsableData); // Log de los datos recibidos

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        console.log("Actualizando datos del responsable...");
        // Actualizar datos del responsable
        const [updateResResult] = await connection.execute(
            `UPDATE responsable_de_paciente SET
              dni_res = ?, tipo_res = ?, nombres_res = ?, 
              ape_paterno_res = ?, ape_materno_res = ?, celular1_res = ?,
              celular2_res = ?, localidad_res = ?, sector_res = ?,
              direccion_res = ?, departamento_res = ?, provincia_res = ?,
              distrito_res = ?
              WHERE id_responsable = ?`,
            [
                responsableData.dni_res,
                responsableData.tipo_res,
                responsableData.nombres_res,
                responsableData.ape_paterno_res,
                responsableData.ape_materno_res,
                responsableData.celular1_res,
                responsableData.celular2_res,
                responsableData.localidad_res,
                responsableData.sector_res,
                responsableData.direccion_res,
                responsableData.departamento_res,
                responsableData.provincia_res,
                responsableData.distrito_res,
                id_responsable,
            ]
        );
        console.log("Resultado de la actualización del responsable:", updateResResult);

        await connection.commit();
        console.log("Transacción completada con éxito");
        res.json({ message: "Datos del responsable actualizados correctamente" });
    } catch (error) {
        await connection.rollback();
        console.error("Error detallado al actualizar los datos del responsable:", error);
        res.status(500).json({
            message: "Error al actualizar los datos del responsable",
            error: error.message,
            stack: error.stack
        });
    } finally {
        connection.release();
    }
});

//********************************************************************************************* */

// Ruta para actualizar todos los pacientes 
app.put('/api/pacientes/actualizar-todos', async (req, res) => {
    const query = `
        UPDATE pacientes 
        SET 
            edad = YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')),
            tipo_paciente = CASE 
                WHEN YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) <= 11 THEN 'Niño'
                WHEN YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) >= 12 AND YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) < 18 THEN 'Adolescente'
                WHEN YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) >= 18 AND YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) <= 29 THEN 'Joven'
                WHEN YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) >= 30 AND YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) <= 59 THEN 'Adulto'
                ELSE 'Adulto Mayor'
            END
    `;

    try {
        const [results] = await pool.query(query); // Usar promesas aquí
        res.json({ message: 'Datos de todos los pacientes actualizados correctamente' });
    } catch (error) {
        console.error('Error al actualizar los datos de los pacientes:', error);
        return res.status(500).json({ error: 'Error al actualizar los datos de los pacientes' });
    }
});

// Programar el cron job para que se ejecute diariamente a medianoche
cron.schedule('0 0 * * *', async () => {
    console.log('Actualizando datos de todos los pacientes...');
    try {
        await pool.query(`UPDATE pacientes SET 
            edad = YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')),
            tipo_paciente = CASE 
                WHEN YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) <= 11 THEN 'Niño'
                WHEN YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) >= 12 AND YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) < 18 THEN 'Adolescente'
                WHEN YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) >= 18 AND YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) <= 29 THEN 'Joven'
                WHEN YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) >= 30 AND YEAR(CURDATE()) - YEAR(fecha_nacimiento) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(fecha_nacimiento, '%m%d')) <= 59 THEN 'Adulto'
                ELSE 'Adulto Mayor'
            END`);
        console.log('Datos de todos los pacientes actualizados correctamente.');
    } catch (error) {
        console.error('Error al actualizar los datos de los pacientes:', error);
    }
});

//ruta para registrar personal de salud
app.post('/api/register/personal-salud', async (req, res) => {
    const dataPersonal = req.body;

    const connection = await pool.getConnection(); // Usar el pool de conexiones
    try {
        await connection.beginTransaction(); // Iniciar transacción

        // Consulta SQL para verificar si el correo ya está registrado
        const checkEmailQuery = 'SELECT * FROM personal_salud WHERE correo = ?';
        const [results] = await connection.query(checkEmailQuery, [dataPersonal.correo]);

        // Si se encuentra un resultado, significa que el correo ya está registrado
        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }
        if (dataPersonal.especialidad === 'Nutrición' || dataPersonal.especialidad === 'Planificación' || dataPersonal.especialidad === 'Psicología' || dataPersonal.especialidad === 'Obstetricia_CPN') {
            dataPersonal.consultorio = '1';
        }
        // Consulta SQL para insertar los datos en la tabla personal_salud
        const insertQuery = `
        INSERT INTO personal_salud 
        (dni, paterno, materno, nombres, tipo_user, profesion, servicio, especial_cita, num_consultorio, condicion, celular, correo, usuario, contrasena)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const [insertResult] = await connection.query(insertQuery, [
            dataPersonal.dni,
            dataPersonal.paterno,
            dataPersonal.materno,
            dataPersonal.nombres,
            dataPersonal.tipoUser,
            dataPersonal.profesion,
            dataPersonal.servicio,
            dataPersonal.especialidad,
            dataPersonal.consultorio || null, // Usar el valor de dataPersonal.consultorio o null si es falsy
            dataPersonal.condicion,
            dataPersonal.celular,
            dataPersonal.correo,
            dataPersonal.nameUser,
            dataPersonal.contrasena
        ]);

        await connection.commit(); // Confirmar la transacción

        res.status(201).json({ message: 'Registro exitoso', id_personal: insertResult.insertId });
    } catch (error) {
        console.error('Error:', error);
        await connection.rollback(); // Revertir la transacción en caso de error
        return res.status(500).json({ message: 'Error al registrar el personal. Intenta nuevamente.' });
    } finally {
        connection.release(); // Liberar la conexión al pool
    }
});

//ruta para obtener todos los personales de salud 
app.get('/api/obtener/personal-salud', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM personal_salud');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener el personal:', error);
        res.status(500).json({ message: 'Error al obtener el personal.' });
    }
});

// Ruta para actualizar los datos personales
app.put('/api/update-personal', async (req, res) => {
    const { id_personal, dni, paterno, materno, nombres, tipo_user, profesion, servicio, especial_cita, num_consultorio, condicion, celular, correo, usuario, contrasena, estado } = req.body;

    try {
        const [result] = await pool.query(`
            UPDATE personal_salud 
            SET dni = ?, paterno = ?, materno = ?, nombres = ?, tipo_user = ?, profesion = ?, servicio = ?, especial_cita = ?, num_consultorio = ?, condicion = ?, celular = ?, correo = ?, usuario = ?, contrasena = ?, estado = ?
            WHERE id_personal = ?
        `, [dni, paterno, materno, nombres, tipo_user, profesion, servicio, especial_cita, num_consultorio, condicion, celular, correo, usuario, contrasena, estado, id_personal]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Datos actualizados correctamente' });
        } else {
            res.status(400).json({ message: 'No se pudo actualizar el registro' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta para inactivar o activar a un personal de salud
app.put('/api/personal/actualizar-estado/:id', async (req, res) => {
    const { estado } = req.body; // Obtenemos el nuevo estado del cuerpo de la solicitud
    const id = req.params.id;

    // Validar el estado y el id
    if (!['activo', 'inactivo'].includes(estado)) {
        return res.status(400).send('Estado inválido');
    }

    if (!id) {
        return res.status(400).send('ID requerido');
    }

    let connection;
    try {
        // Obtener una conexión del pool
        connection = await pool.getConnection();
        const [result] = await connection.execute('UPDATE personal_salud SET estado = ? WHERE id_personal = ?', [estado, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Personal no encontrado');
        }

        res.send('Estado actualizado con éxito');
    } catch (err) {
        console.error('Error al actualizar el estado:', err);
        res.status(500).send('Error al actualizar el estado');
    } finally {
        if (connection) connection.release(); // Liberar la conexión en lugar de cerrarla
    }
});

// Ruta para guardar la profesión y el servicio del personal de salud
app.post('/api/personal/guardar-profes-servi', async (req, res) => {
    const { profesion, servicio } = req.body;

    if (!profesion || !servicio) {
        return res.status(400).json({ message: 'La profesión y el servicio son obligatorios.' });
    }

    const connection = await pool.getConnection(); // Obtener conexión
    try {
        await connection.beginTransaction(); // Iniciar transacción

        // Verificar si la profesión ya existe
        const checkProfQuery = 'SELECT COUNT(*) AS count FROM profesiones WHERE nombre_profesion = ?';
        const [checkProfResult] = await connection.query(checkProfQuery, [profesion]);

        if (checkProfResult[0].count === 0) {
            // Insertar nueva profesión solo si no existe
            const insertProfQuery = 'INSERT INTO profesiones (nombre_profesion) VALUES (?)';
            await connection.query(insertProfQuery, [profesion]);
        }

        // Verificar si el servicio ya existe
        const checkServQuery = 'SELECT COUNT(*) AS count FROM servicios WHERE nombre_servicio = ?';
        const [checkServResult] = await connection.query(checkServQuery, [servicio]);

        if (checkServResult[0].count === 0) {
            // Insertar nuevo servicio solo si no existe
            const insertServQuery = 'INSERT INTO servicios (nombre_servicio) VALUES (?)';
            await connection.query(insertServQuery, [servicio]);
        }

        await connection.commit(); // Confirmar transacción
        res.status(200).json({ message: 'Profesión y servicio añadidos (si no existían).' });
    } catch (error) {
        console.error('Error al añadir profesión o servicio', error);
        await connection.rollback(); // Revertir transacción en caso de error
        res.status(500).json({ message: 'Error al añadir profesión o servicio.' });
    } finally {
        if (connection) connection.release(); // Liberar conexión
    }
});

// Ruta para obtener todas las profesiones
app.get('/api/obtener/profesiones', async (req, res) => {
    try {
        const query = 'SELECT * FROM profesiones';
        const [result] = await pool.query(query);
        res.json(result);
    } catch (error) {
        console.error('Error al obtener profesiones', error);
        res.status(500).json({ message: 'Error al obtener profesiones.' });
    }
});

app.get('/api/vista-personal', async (req, res) => {
    try {
        const vista = 'SELECT * FROM vista_personal_activo';
        const [result] = await pool.query(vista)
        res.json(result);
    } catch (error) {
        console.error('Error al obtener vista personal', error);
    }
})

// Ruta para obtener todos los servicios
app.get('/api/obtener/servicios', async (req, res) => {
    try {
        const query = 'SELECT * FROM servicios';
        const [result] = await pool.query(query);
        res.json(result);
    } catch (error) {
        console.error('Error al obtener servicios', error);
        res.status(500).json({ message: 'Error al obtener servicios.' });
    }
});
// Ruta para obtener los tipos de turno de personal de salud
app.get('/api/tipos-turno', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tipos_turno_personal');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los tipos de turno:', error);
        res.status(500).json({ message: 'Error al obtener los tipos de turno.' });
    }
});
//ruta para obtner fecha bloquedad para personal de salud
app.get('/api/obtener-fechas-bloqueadas', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT fecha FROM dias_bloqueados WHERE bloqueado = TRUE');
        res.json(results);
    } catch (error) {
        console.error('Error al obtener las fechas bloqueadas:', error);
        res.status(500).json({ error: 'Error al obtener las fechas bloqueadas' });
    }
});

//ruta para bloquear fechas de personal
app.post('/api/bloquear-fecha', async (req, res) => {
    const { fecha } = req.body;

    try {
        const query = 'INSERT INTO dias_bloqueados (fecha, bloqueado) VALUES (?, TRUE) ON DUPLICATE KEY UPDATE bloqueado = TRUE';
        const [results] = await pool.query(query, [fecha]);
        res.status(200).json({ message: 'Fecha bloqueada con éxito' });
    } catch (error) {
        console.error('Error al bloquear la fecha:', error);
        res.status(500).json({ error: 'Error al bloquear la fecha' });
    }
});
//Ruta para desbloquear la fecha bloqueada
app.post('/api/desbloquear-fecha', async (req, res) => {
    const { fecha } = req.body;

    try {
        const query = 'UPDATE dias_bloqueados SET bloqueado = FALSE WHERE fecha = ?';
        const [results] = await pool.query(query, [fecha]);
        res.status(200).json({ message: 'Fecha desbloqueada con éxito' });
    } catch (error) {
        console.error('Error al desbloquear la fecha:', error);
        res.status(500).json({ error: 'Error al desbloquear la fecha' });
    }
});

//ruta para obtener los turnos de de los personales
app.get('/api/obtener-turnos/personal', async (req, res) => {
    try {
        const query = `
            SELECT 
                tp.id_turno,
                tp.fecha,
                tp.id_turno_tipo,
                ttp.turno AS turno,
                ttp.clave_turno AS clave_turno,
                ps.id_personal,
                ps.dni,
                ps.paterno,
                ps.materno,
                ps.nombres,
                ps.tipo_user,
                ps.profesion,
                ps.servicio,
                ps.especial_cita,
                ps.num_consultorio,
                ps.condicion
            FROM 
                turnos_personal tp
            INNER JOIN 
                personal_salud ps ON tp.id_personal = ps.id_personal
            INNER JOIN 
                tipos_turno_personal ttp ON tp.id_turno_tipo = ttp.id_turno_tipo
        `;
        const [data] = await pool.query(query);
        res.json(data);
    } catch (e) {
        console.error('Error al obtener los turnos del personal:', e);
        res.status(500).json({ error: 'Error al obtener los turnos del personal' });
    }
});

//ruta para guardar turnos de personal
app.post('/api/asignar-turno/personal', async (req, res) => {
    const { id_personal, fecha, id_turno_tipo } = req.body;

    try {
        // Inserta o actualiza el turno en la base de datos
        await pool.query(
            `INSERT INTO turnos_personal (id_personal, fecha, id_turno_tipo)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE id_turno_tipo = VALUES(id_turno_tipo)`,
            [id_personal, id_turno_tipo, fecha]
        );

        res.status(200).json({ message: 'Turno asignado correctamente' });
    } catch (error) {
        console.error('Error al asignar turno:', error);
        res.status(500).json({ error: 'Error al asignar turno' });
    }
});


// Ruta para Loggin***************************************************
app.post('/api/sais/login', async (req, res) => {
    try {
        const { dni, contrasena } = req.body;

        // Verificar si se proporcionó el DNI y la contraseña
        if (!dni || !contrasena) {
            return res.status(400).json({ message: 'DNI y contraseña son obligatorios' });
        }

        // Buscar el usuario por DNI en la base de datos MySQL
        const [rows] = await pool.execute('SELECT * FROM personal_salud WHERE dni = ?', [dni]);

        // Verificar si el usuario existe
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos (usuario)' });
        }

        const personal = rows[0];

        // Verificar si el personal está activo
        if (personal.estado !== 'activo') {
            return res.status(403).json({ message: 'El usuario está inactivo, por favor contacte al administrador' });
        }

        // Comparar las contraseñas
        if (contrasena !== personal.contrasena) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos (contraseña)' });
        }

        console.log('Inicio de sesión exitoso');

        // Si las credenciales y el estado son correctos, enviar respuesta con datos del usuario
        return res.json({
            message: 'Inicio de sesión exitoso',
            userId: personal.id_personal,
            userPersonal: personal.nombres,
            correo: personal.correo,
            dni: personal.dni,
            tipoUser: personal.tipo_user,
            profesion: personal.profesion,
            especialCita: personal.especial_cita,
            usuario: personal.usuario
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Endpoint para crear un nuevo registro de nacimiento (POST)
app.post("/api/nacimiento", async (req, res) => {
    const {
        id_paciente,
        edad_gestacional,
        peso,
        talla,
        perimetro_cefalico,
        id_etnia,
        id_financiamiento,
        codigo_sis,
        id_programa,
    } = req.body;

    const query =
        "INSERT INTO nacimiento_paciente_ninos (ID_PACIENTE, EDAD_GESTACIONAL, PESO, TALLA, PERIMETRO_CEFALICO, ID_ETNIA, ID_FINANCIAMENTO, codigo_sis, ID_PROGRAMA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    try {
        const [result] = await pool.query(query, [
            id_paciente,
            edad_gestacional,
            peso,
            talla,
            perimetro_cefalico,
            id_etnia,
            id_financiamiento,
            codigo_sis,
            id_programa,
        ]);

        res.status(201).json({ message: "Datos de nacimiento creados exitosamente" });
    } catch (err) {
        console.error("Error al insertar datos:", err);
        res.status(500).json({ message: "Error al guardar los datos" });
    }
});

// Endpoint para actualizar un registro de nacimiento (PUT)
// CORREGIDO
app.put("/api/nacimiento/:id_paciente", async (req, res) => {
    const { id_paciente } = req.params;
    const {
        edad_gestacional,
        peso,
        talla,
        perimetro_cefalico,
        id_etnia,
        id_financiamiento,
        codigo_sis,
        id_programa,
    } = req.body;

    const query = `
      UPDATE nacimiento_paciente_ninos 
      SET 
        EDAD_GESTACIONAL = ?,
        PESO = ?,
        TALLA = ?,
        PERIMETRO_CEFALICO = ?,
        ID_ETNIA = ?,
        ID_FINANCIAMENTO = ?,
        codigo_sis = ?,
        ID_PROGRAMA = ?
      WHERE ID_PACIENTE = ?
    `;

    try {
        const [result] = await pool.query(query, [
            edad_gestacional,
            peso,
            talla,
            perimetro_cefalico,
            id_etnia,
            id_financiamiento,
            codigo_sis,
            id_programa,
            id_paciente
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        res.status(200).json({ message: "Datos de nacimiento actualizados exitosamente" });
    } catch (err) {
        console.error("Error al actualizar los datos:", err);
        res.status(500).json({ message: "Error al actualizar los datos" });
    }
});
//   PARA LISTAR LOS DATOS

app.get("/api/nacimiento/:id_paciente", async (req, res) => {
    const { id_paciente } = req.params;

    const query = `
    SELECT ID_PACIENTE, EDAD_GESTACIONAL, PESO, TALLA, PERIMETRO_CEFALICO, ID_ETNIA, ID_FINANCIAMENTO, codigo_sis, ID_PROGRAMA
    FROM nacimiento_paciente_ninos
    WHERE ID_PACIENTE = ?
  `;

    try {
        const [result] = await pool.query(query, [id_paciente]);

        if (result.length > 0) {
            res.status(200).json(result[0]);  // Devolvemos los datos si se encuentran
        } else {
            res.status(404).json({ message: "Datos de nacimiento no encontrados para este paciente" });
        }
    } catch (err) {
        console.error("Error al obtener los datos:", err);
        res.status(500).json({ message: "Error al obtener los datos de nacimiento" });
    }
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Función para enviar el correo electrónico
const sendRecoveryEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Cambiar según el servicio que uses
        auth: {
            user: 'mancillanixon7@gmail.com', // Cambia esto a tu correo
            pass: 'inoa juhe mkuu zntx' // Cambia esto a tu contraseña
        }
    });

    // Configuración del correo electrónico
    const mailOptions = {
        from: 'mancillanixon7@gmail.com', // Correo del remitente
        to: email, // Correo del destinatario
        subject: 'Recuperación de Contraseña', // Asunto del correo
        text: `Haz clic en el siguiente enlace para recuperar tu contraseña: http://localhost:3000/new-password/${token}` // Cuerpo del correo
    };

    await transporter.sendMail(mailOptions); // Enviar el correo
};

// Ruta para solicitar la recuperación de contraseña
app.post('/api/recover-password', async (req, res) => {
    const { email } = req.body; // Obtener el correo del cuerpo de la solicitud

    // Verificar si se proporcionó el correo
    if (!email) {
        return res.status(400).json({ message: 'El correo es obligatorio.' });
    }

    const connection = await pool.getConnection(); // Obtener una conexión a la base de datos
    try {
        // Verificar si el correo existe en la base de datos
        const [user] = await connection.execute('SELECT * FROM personal_salud WHERE correo = ?', [email]);

        // Si no se encuentra el usuario, enviar un error
        if (user.length === 0) {
            return res.status(404).json({ message: 'Correo no encontrado.' });
        }

        // Generar un token único para la recuperación
        const token = crypto.randomBytes(20).toString('hex');

        // Guardar el token en la base de datos (puedes crear una nueva columna en la tabla existente)
        await connection.execute('UPDATE personal_salud SET reset_token = ? WHERE correo = ?', [token, email]);

        // Enviar el correo de recuperación
        await sendRecoveryEmail(email, token);

        res.json({ message: 'Correo de recuperación enviado.' }); // Confirmar que se envió el correo
    } catch (error) {
        console.error(error); // Imprimir el error en la consola
        res.status(500).json({ message: 'Error al enviar el correo de recuperación.' }); // Enviar error
    } finally {
        connection.release(); // Liberar la conexión
    }
});

// Ruta para cambiar la contraseña usando el token
app.post('/api/reset-password/:token', async (req, res) => {
    const { token } = req.params; // Obtener el token de la URL
    const { nuevaContrasena } = req.body; // Obtener la nueva contraseña del cuerpo de la solicitud

    // Verificar si se proporcionó la nueva contraseña
    if (!nuevaContrasena) {
        return res.status(400).json({ message: 'La nueva contraseña es obligatoria.' });
    }

    const connection = await pool.getConnection(); // Obtener una conexión a la base de datos
    try {
        // Verificar si el token es válido
        const [user] = await connection.execute('SELECT * FROM personal_salud WHERE reset_token = ?', [token]);

        // Si no se encuentra el usuario, enviar un error
        if (user.length === 0) {
            return res.status(404).json({ message: 'Token no válido.' });
        }

        // Hashear la nueva contraseña
        // const hashedPassword = bcrypt.hashSync(nuevaContrasena, 8);

        // Actualizar la contraseña en la base de datos y limpiar el token
        await connection.execute('UPDATE personal_salud SET contrasena = ?, reset_token = NULL WHERE reset_token = ?', [nuevaContrasena, token]);

        res.json({ message: 'Contraseña actualizada correctamente.' }); // Confirmar que se actualizó la contraseña
    } catch (error) {
        console.error(error); // Imprimir el error en la consola
        res.status(500).json({ message: 'Error al actualizar la contraseña.' }); // Enviar error
    } finally {
        connection.release(); // Liberar la conexión
    }
});

//////////////////////////////////////////////VERIFICAR SI EL TOKEN EISTE 
// Ruta para verificar si el token es válido
app.get('/api/reset-password/:token', async (req, res) => {
    const { token } = req.params; // Obtener el token de la URL

    const connection = await pool.getConnection(); // Obtener una conexión a la base de datos
    try {
        // Verificar si el token es válido
        const [user] = await connection.execute('SELECT * FROM personal_salud WHERE reset_token = ?', [token]);

        // Si no se encuentra el usuario, enviar un error
        if (user.length === 0) {
            return res.status(404).json({ message: 'Token no válido.' });
        }

        res.json({ message: 'Token válido.' }); // Confirmar que el token es válido
    } catch (error) {
        console.error(error); // Imprimir el error en la consola
        res.status(500).json({ message: 'Error al verificar el token.' }); // Enviar error
    } finally {
        connection.release(); // Liberar la conexión
    }
});

//ruta para registrar las citas para el niño
app.post('/api/registrar/cita-nino', (req, res) => {
    const { especialidad, fecha, hora, consultorio, hisClinico, dni, apellidos, nombres, fechaNacimiento, edad, telefono, motivoConsulta, direccion, metodo, semEmbarazo, idRespons } = req.body;

    const sql = `
        INSERT INTO cita_ninhos (
            especialidad, fecha, hora, consultorio, hisClinico, dni, apellidos, nombres, fechaNacimiento, edad, telefono, motivoConsulta, direccion, metodo, semEmbarazo, id_responsable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        especialidad,
        fecha,
        hora,
        consultorio,
        hisClinico,
        dni,
        apellidos,
        nombres,
        fechaNacimiento,
        edad,
        telefono,
        motivoConsulta,
        direccion || null,
        metodo || null,
        semEmbarazo || null,
        idRespons || null
    ];

    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al registrar la cita:', error);
            return res.status(500).json({ error: 'Error al registrar la cita' });
        }

        res.status(201).json({ message: 'Cita registrada exitosamente', id: results.insertId });
    });
});

// Ruta para obtner las citas segun fecha, especialidad
app.get('/api/citas-ninhos', async (req, res) => {
    const { fecha, especialidad } = req.query;
    try {
        const [rows] = await pool.query('SELECT * FROM cita_ninhos WHERE fecha = ? AND especialidad = ? ', [fecha, especialidad]);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener citas:', error);
        res.status(500).json({ message: 'Error al obtener citas.' });
    }
});

// Route para obtener todas las citas de los niños
app.get('/api/filtrar-todas-citas-ninho', async (req, res) => {
    const query = 'SELECT * FROM cita_ninhos'; // Trae todas las citas

    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: error.message });
    }
});

//ruta  para filtrar citas de un rango de 3 dias
app.get('/api/filtrar-cita-ninho-3', async (req, res) => {
    const query = 'SELECT * FROM cita_ninhos WHERE fecha >= CURDATE() AND fecha <= DATE_ADD(CURDATE(), INTERVAL 3 DAY)';

    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: error.message });
    }
});

//ruta para obtner horarios de cita de niños
app.get('/api/horarios-cita-nino', async (req, res) => {
    const { especialidad } = req.query;

    try {
        const [horarios] = await pool.execute(
            'SELECT * FROM horario_cita_nino WHERE especialidad = ? ORDER BY turno, hora_inicio',
            [especialidad]
        );
        res.json(horarios);
    } catch (error) {
        console.error('Error al obtener los horarios:', error);
        res.status(500).json({ error: 'Error al obtener los horarios' });
    }
});


// Ruta para bloquear horas de las citas de los niños
app.post('/api/nino/bloquear-hora-cita', async (req, res) => {
    const { fecha, hora_inicio, hora_fin, consultorio, especialidad } = req.body;

    try {
        await pool.query(
            'INSERT INTO hora_cita_nino_bloqueada (fecha, hora_inicio, hora_fin, consultorio, especialidad) VALUES (?, ?, ?, ?, ?)',
            [fecha, hora_inicio, hora_fin, consultorio, especialidad]
        );
        res.status(200).json({ message: 'Hora bloqueada exitosamente' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: 'Ya existe un bloqueo para esta hora' });
        } else {
            res.status(500).json({ message: 'Error al bloquear la hora', error });
        }
    }
});
//api para consultar si el horario (hora) es bloqueda en cita niño
app.get('/api/nino/verificar-bloqueos-cita', async (req, res) => {
    try {
        const bloqueos = await pool.query('SELECT * FROM hora_cita_nino_bloqueada');
        // Ejemplo de una respuesta corregida
        res.json(bloqueos[0]); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener bloqueos', error });
    }
});


// Ruta para obtener especialidades únicas
app.get('/api/especialidad-unico-nino', async (req, res) => {
    try {
        const query = 'SELECT DISTINCT especialidad FROM horario_cita_nino'
        const [results] = await pool.query(query);
        res.json(results);
    } catch (error) {
        console.error('Error al obtener especialidades:', error);
        res.status(500).json({ error: 'Error al obtener especialidades' });
    }
});


// ENDPOINTS PARA CONSULTAR DE LA BASE DE DATOS LOS DATOS DE BD,//NACIMIENTO
// Endpoint para obtener los programas
app.get('/api/programas', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id_programa, nombre_programa FROM programa');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener programas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener los financiamientos
app.get('/api/financiamientos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id_financiamiento, nombre_financiamiento FROM financiamiento');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener financiamientos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener las etnias
app.get('/api/etnias', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id_etnia, nombre_etnia FROM etnia');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener etnias:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// Iniciar el servidor
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    await testDatabaseConnection(); // Verificar conexión al iniciar el servidor
})