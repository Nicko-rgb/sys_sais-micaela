import { useState, useEffect } from 'react';
import axios from 'axios';
import UrlsApp from '../UrlsApp';

const Store = () => {
    const {apiUrl} = UrlsApp()
    // Logica para obtener a los personales de salud
    const [personalSalud, setPersonalSalud] = useState([])
    const [profesionFiltro, setProfesionFiltro] = useState([])
    const [condicionFiltro, setCondiconFiltro] = useState([])
    const [cargando, setCargando] = useState(true);

    const fetchPersonalSalud = async () => {
        setCargando(true)
        try {
            const response = await fetch(`${apiUrl}/api/obtener/personal-salud`);
            const data = await response.json();
            setPersonalSalud(data);

            // Filtrar tipos de profesion unicos
            const preofesionUnicos = Array.from(new Set(data.map(personal => personal.profesion)));
            setProfesionFiltro(preofesionUnicos);
            //filtrar tipo e condicion unicos
            const condicionUnicos = Array.from(new Set(data.map(personal => personal.condicion)));
            setCondiconFiltro(condicionUnicos);

        } catch (error) {
            console.error('Error al obtener el personal:', error);
        } finally {
            setCargando(false)
        }
    };

    // Para obtener los tipos de turno de personal de salud
    const [tiposDeTurno, setTiposDeTurno] = useState([])
    const fetchTiposDeTurno = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tipos-turno');
            const data = await response.json();
            setTiposDeTurno(data);
        } catch (error) {
            console.error('Error al obtener los tipos de turnos:', error);
        }
    };


    //para obtener horarios de citas bloqueadas
    const [blockedRows, setBlockedRows] = useState([]);
    const fetchBlockedRows = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/nino/verificar-bloqueos-cita');
            setBlockedRows(response.data);
        } catch (error) {
            console.error('Error al obtener filas bloqueadas:', error);
        }
    };


    //para obtener todas las citas de ninos
    const [citas, setCitas] = useState([]);
    const fetchCitas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/filtrar-todas-citas-ninho')
            setCitas(response.data);
        } catch (error) {
            console.error('Error al obtener citas:', error);
        }
    }

    const [turnosPersonal, setTurnosPersonal] = useState([])
    const fetchTurnosPersonal = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/obtener-turnos/personal');
            setTurnosPersonal(response.data);
        } catch (error) {
            console.error('Error al obtener turnos de personal:', error);
        }
    }

    //para obtener profesion y servicio de personal de salud
    const [profesiones, setProfesiones] = useState([]);
    const [servicios, setServicios] = useState([]);
    const fetchOptionsProfesServi = async () => {
        try {
            const profesionResponse = await fetch('http://localhost:5000/api/obtener/profesiones');
            const servicioResponse = await fetch('http://localhost:5000/api/obtener/servicios');

            if (profesionResponse.ok && servicioResponse.ok) {
                const profesionesData = await profesionResponse.json();
                const serviciosData = await servicioResponse.json();
                setProfesiones(profesionesData);
                setServicios(serviciosData);
            } else {
                console.error("Error al cargar profesiones o servicios.");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };


    //Obtner especialidades de citas
    const [especialidades, setEspecialidades] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/especialidad-unico-nino')
            .then(response => {
                setEspecialidades(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los horarios:", error);
            });
    }, []);

    // obtener datos de sector asignado a personal
    const [sectorPer, setSectorPer] = useState([]);
    const fetchSectorPer = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/personal/obtener-sector-asignado');
            setSectorPer(response.data);    
        } catch (error) {
            console.error('Error al obtener los datos del sector:', error);
        }
    }

    // Carga de datos 
    useEffect(() => {
        fetchPersonalSalud();
        const intervalId = setInterval(fetchPersonalSalud, 5000);
        fetchTiposDeTurno()
        fetchBlockedRows()
        fetchTurnosPersonal()
        fetchOptionsProfesServi()
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        fetchSectorPer()
        fetchCitas();
        const intervalId = setInterval(() => {
            fetchCitas();
            fetchSectorPer()
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const obtenerDescripcionTurno = (clave_turno) => {
        switch (clave_turno) {
            case 'M':
                return 'Mañana';
            case 'T':
                return 'Tarde';
            case 'MT':
                return 'Mañana y Tarde';
            case 'GD':
                return 'Guardia Diurna';
            case 'GDD':
                return 'Guardia Devolución';
            case 'MVD':
                return 'Mañana Visita Domiciliaria';
            case 'TVD':
                return 'Tarde Visita Domiciliaria';
            case 'MVSF':
                return 'Mañana Visita Salud Familiar';
            case 'TVSF':
                return 'Tarde Visita Salud Familiar';
            case 'L':
                return 'Libre';
            default:
                return 'Indefinido';
        };
    };
    // Definición de colores para cada tipo de turno
    const coloresTurno = {
        'M': 'lightgreen',
        'T': '#64B5F6',
        'MT': '#81C784',
        'GD': '#FFD54F',
        'GDD': '#BA68C8',
        'MVD': '#FFAB91',
        'TVD': '#4DB6AC',
        'MVSF': 'gray',
        'TVSF': '#FFF176',
        'L': '#A1887F'
    };
    

    return {
        apiUrl,
        personalSalud,
        profesionFiltro,
        condicionFiltro,
        tiposDeTurno,
        coloresTurno,
        cargando,
        obtenerDescripcionTurno,
        blockedRows,
        citas,
        turnosPersonal,
        profesiones,
        servicios,
        especialidades,
        sectorPer,
    }
}

export default Store