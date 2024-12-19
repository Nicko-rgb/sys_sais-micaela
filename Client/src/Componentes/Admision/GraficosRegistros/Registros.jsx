import './registro.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { formatFecha } from '../../Complementos/Funciones'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Registros = () => {
    const [data, setData] = useState([]);
    const [intervalo, setIntervalo] = useState('semana'); // Visualización predeterminada
    const [año, setAño] = useState(new Date().getFullYear());
    const [semana, setSemana] = useState(getCurrentWeekNumber());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:5000/api/pacientes/estadisticas`, {
                    params: { intervalo, año, semana }
                });
                setData(response.data);
            } catch (err) {
                console.error(err);
                setError(err.response ? err.response.data.error : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [intervalo, año, semana]);

    const handleIntervalChange = (event) => {
        setIntervalo(event.target.value);
    };

    const handlePreviousWeek = () => {
        if (semana === 1) {
            setSemana(52);
            setAño(año - 1);
        } else {
            setSemana(semana - 1);
        }
    };

    const handleNextWeek = () => {
        if (semana === 52) {
            setSemana(1);
            setAño(año + 1);
        } else {
            setSemana(semana + 1);
        }
    };

    // Genera las fechas de la semana
    const getDatesForWeek = (year, week) => {
        const startOfWeek = new Date(year, 0, 1 + (week - 1) * 7);
        const dayOffset = startOfWeek.getDay() === 0 ? -6 : 1 - startOfWeek.getDay(); // Ajusta para que comience el lunes
        startOfWeek.setDate(startOfWeek.getDate() + dayOffset);
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return date.toLocaleDateString(); // Devuelve la fecha en formato local
        });
    };

    const weekDates = getDatesForWeek(año, semana);
    const currentDate = new Date();

    const chartData = {
        labels: intervalo === 'semana'
            ? weekDates
            : [
                'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
            ],
        datasets: [
            {
                label: 'PACIENTES REGISTRADOS',
                data: intervalo === 'semana'
                    ? weekDates.map(date => {
                        const dateObj = new Date(date.split('/').reverse().join('-')); // Convierte a formato 'YYYY-MM-DD'
                        if (dateObj > currentDate) return null; // Si es una fecha futura, asigna null
                        const found = data.find(item =>
                            new Date(item.fecha).toLocaleDateString() === date
                        );
                        return found ? found.total : 0;
                    })
                    : Array.from({ length: 12 }, (_, index) => {
                        // Compara el índice del mes con el mes actual
                        if (index > currentDate.getMonth()) return null;
                        const found = data.find(item => item.mes === index + 1);
                        return found ? found.total : 0;
                    }),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
            },
        ],
    };

    const maxYValue = Math.max(10, ...data.map(item => item.total));

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    callback: function (value, index) {
                        if (intervalo === 'semana') {
                            const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
                            const dayName = dayNames[index]; // Obtiene el nombre del día
                            const date = weekDates[index]; // Obtiene la fecha correspondiente
                            return [`${dayName}`, `${date}`]; // Retorna un arreglo con dos líneas
                        }
                        return this.getLabelForValue(value); // Devuelve el valor predeterminado para meses
                    },
                    color: 'black',
                    font: {
                        size: 11,
                    }
                },
            },

            y: {
                grid: {
                    color: 'rgba(255, 99, 132, 0.2)',
                },
                beginAtZero: true,
                max: maxYValue,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        return Number.isInteger(value) ? value : '';
                    },
                    color: 'black'
                }
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'black',
                    font: {
                        size: 12,
                        family: 'poppins'
                    },
                },
            },
        },

    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    // Obtener el mes del primer día de la semana
    const firstWeekDate = new Date(weekDates[0].split('/').reverse().join('-'));
    const monthName = firstWeekDate.toLocaleString('default', { month: 'long' });

    return (
        <div className='grafico'>
            <h3>Estadística de Registro de Pacientes</h3>
            <div className="fechas">
                {intervalo === 'semana' ?
                    <h4>{monthName} {año} </h4> :
                    <h4>Año {año}</h4>
                }
                <select onChange={handleIntervalChange} value={intervalo}>
                    <option value="semana">Por Semana</option>
                    <option value="mes">Por Mes</option>
                </select>
            </div>
            <div style={{ position: 'relative', height: '30vh', width: '430px' }}>
                <Line data={chartData} options={options} />
            </div>
            {data.length === 0 && <p>No se encontraron datos para el intervalo seleccionado.</p>}
            {intervalo === 'semana' ?
                <div className='btns'>
                    <button onClick={handlePreviousWeek}><IoIosArrowBack /> Semana Anterior</button>
                    <button onClick={handleNextWeek}> Semana Siguiente<IoIosArrowForward /></button>
                </div>
                :
                <div className='btns'>
                    <button onClick={() => setAño(año - 1)}><IoIosArrowBack /> Año Anterior</button>
                    <button onClick={() => setAño(año + 1)}>  Año Siguiente<IoIosArrowForward /></button>
                </div>
            }
        </div>
    );
};

const getCurrentWeekNumber = () => {
    const date = new Date();
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export default Registros;
