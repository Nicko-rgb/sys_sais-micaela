import { useState, useEffect } from "react";

const EstadoSesion = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setIdUser] = useState('');
    const [userPersonal, setUserPersonal] = useState('');
    const [correo, setCorreo] = useState('');
    const [dni, setDni] = useState('');
    const [tipoUser, setTipoUser] = useState('');
    const [profesion, setProfesion] = useState('');
    const [especialCita, setEspecialCita] = useState('');
    const [usuario, setUsuario] = useState(''); 

    // Al cargar el componente, recuperamos los datos del localStorage
    useEffect(() => {
        // Verificar si hay datos de usuario almacenados en localStorage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setIsLoggedIn(true);
            setUserPersonal(userData.name || '');
            setIdUser(userData.id || '');
            setCorreo(userData.correo || '');
            setDni(userData.dni || '');
            setTipoUser(userData.tipoUser || '');
            setProfesion(userData.profesion || '');
            setEspecialCita(userData.especialCita || '');
            setUsuario(userData.usuario || '');
        }
    }, []);

    // Función para manejar el inicio de sesión y guardar los datos en localStorage
    const handleLogin = (id, name, correo, dni, tipoUser, profesion, especialCita, usuario) => {
        setIsLoggedIn(true); 
        setUserPersonal(name);
        setIdUser(id);
        setCorreo(correo);
        setDni(dni);
        setTipoUser(tipoUser);
        setProfesion(profesion);
        setEspecialCita(especialCita);
        setUsuario(usuario);

        // Guardamos todos los datos en localStorage como un solo objeto
        const userData = {
            id,
            name,
            correo,
            dni,
            tipoUser,
            profesion,
            especialCita,
            usuario
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    // Función para cerrar sesión y limpiar todos los datos del localStorage
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserPersonal('');
        setIdUser('');
        setCorreo('');
        setDni('');
        setTipoUser('');
        setProfesion('');
        setEspecialCita('');
        setUsuario('');

        // Eliminamos todos los datos del localStorage
        localStorage.removeItem('userData');
    };

    // Generamos la ruta al perfil del usuario
    const minusculaName = userPersonal.toLowerCase().replace(/\s+/g, '');
    const rutaPerfil = `/perfil/${minusculaName}/${userId}`;

    // Retornamos los datos y funciones para utilizarlos en otros componentes
    return { userId, userPersonal, correo, isLoggedIn, handleLogin, handleLogout, rutaPerfil, dni, tipoUser, profesion, especialCita, usuario };
};

export default EstadoSesion; 