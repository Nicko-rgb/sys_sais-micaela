// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Importar mysql2
const bcrypt = require('bcryptjs');
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
                    responsable.celular1Res,
                    responsable.celular2Res,
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
                pacienteData.discapacidad,
                pacienteData.celular1,
                pacienteData.celular2,
                pacienteData.localidad,
                pacienteData.sector,
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
app.get('/api/pacientes/:historialClinico', async (req, res) => {
    const { historialClinico } = req.params; // Obtener el historial clínico de los parámetros de la ruta

    const connection = await pool.getConnection();
    try {
        // Consulta para obtener el paciente y su responsable
        const [rows] = await connection.execute(
            `SELECT p.*, r.*
             FROM pacientes p
             LEFT JOIN responsable_de_paciente r ON p.id_responsable = r.id_responsable
             WHERE p.hist_clinico = ?`,
            [historialClinico]
        );

        // Verificar si se encontró el paciente
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        res.json(rows[0]); // Devolver el primer paciente encontrado (incluyendo datos del responsable)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los datos del paciente', error: error.message });
    } finally {
        connection.release(); // Liberar la conexión
    }
});


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

//ruta para registrar personal de salud
app.post('/api/register/personal-salud', async (req, res) => {
    const dataPersonal = req.body;

    // Validar que todos los campos estén presentes
    if (!dataPersonal.dni || !dataPersonal.paterno || !dataPersonal.materno || !dataPersonal.nombres ||
        !dataPersonal.tipoUser || !dataPersonal.profesion || !dataPersonal.servicio ||
        !dataPersonal.celular || !dataPersonal.correo || !dataPersonal.nameUser || !dataPersonal.contrasena) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

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

        // Consulta SQL para insertar los datos en la tabla personal_salud
        const insertQuery = 'INSERT INTO personal_salud (dni, paterno, materno, nombres, tipo_user, profesion, servicio, especial_cita, condicion, celular, correo, usuario, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const [insertResult] = await connection.query(insertQuery, [
            dataPersonal.dni,
            dataPersonal.paterno,
            dataPersonal.materno,
            dataPersonal.nombres,
            dataPersonal.tipoUser,
            dataPersonal.profesion,
            dataPersonal.servicio,
            dataPersonal.especialidad,
            dataPersonal.condicion,
            dataPersonal.celular,
            dataPersonal.correo,
            dataPersonal.nameUser,
            dataPersonal.contrasena // Almacena la contraseña hasheada
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

/////////////////////////////////////////////////////////////

// Ruta para Loggin  
app.post('/api/sais/login', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body); // Agrega este log
        const { username, contrasena } = req.body;

        // Verificar si se proporcionó el nombre de usuario y la contraseña
        if (!username || !contrasena) {
            return res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
        }

        // Buscar el usuario por nombre de usuario en la base de datos MySQL
        const [rows] = await pool.execute('SELECT * FROM personal_salud WHERE usuario = ?', [username]);

        // Verificar si el usuario existe
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos (usuario)' });
        }

        const personal = rows[0];

        // Comparar directamente la contraseña ingresada con la almacenada en la base de datos
        console.log('Contraseña ingresada:', contrasena);
        console.log('Contraseña almacenada:', personal.contrasena); // Asegúrate de que este campo sea correcto

        // Comparar directamente las contraseñas
        if (contrasena !== personal.contrasena) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos (contraseña)' });
        }

        // Si las credenciales son correctas, enviar respuesta con datos del usuario
        return res.json({
            message: 'Inicio de sesión exitoso',
            userId: personal.id_personal,
            userPersonal: personal.nombres,
            correo: personal.correo,
            dni: personal.dni,
            tipoUser: personal.tipoUser,
            profesion: personal.profesion,
            especialCita: personal.especial_cita,
            usuario: personal.usuario
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
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
// Endpoint para registrar una cita
app.post('/api/registrar/cita-nino', (req, res) => {
    const { especialidad, fecha, hora, consultorio, hisClinico, dni, apellidos, nombres, fechaNacimiento, edad, telefono, motivoConsulta, direccion, metodo, semEmbarazo } = req.body;

    const sql = `
        INSERT INTO cita_ninhos (
            especialidad, fecha, hora, consultorio, hisClinico, dni, 
            apellidos, nombres, fechaNacimiento, edad, telefono, 
            motivoConsulta, direccion, metodo, semEmbarazo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
        semEmbarazo || null
    ];

    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al registrar la cita:', error);
            return res.status(500).json({ error: 'Error al registrar la cita' });
        }
        
        res.status(201).json({ message: 'Cita registrada exitosamente', id: results.insertId });
    });
});
// Fin de la ruta para registrar las citas para el niño


// Iniciar el servidor
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    await testDatabaseConnection(); // Verificar conexión al iniciar el servidor
});