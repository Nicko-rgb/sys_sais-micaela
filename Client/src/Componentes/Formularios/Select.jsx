import React, { useState, useEffect } from 'react';
import './select.css'; // Asegúrate de que tu archivo CSS esté importado
import { IoAddCircle } from "react-icons/io5";

const Selected = ({ onProfesionChange, onServicioChange }) => {
    const [profesiones, setProfesiones] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [selectedProfesion, setSelectedProfesion] = useState('');
    const [selectedServicio, setSelectedServicio] = useState('');

    useEffect(() => {
        // Función para cargar profesiones y servicios
        const fetchOptions = async () => {
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
    
        // Intervalo para ejecutar el polling
        const intervalId = setInterval(fetchOptions, 1000);
    
        // Llama una vez al montar el componente
        fetchOptions();
    
        // Limpia el intervalo al desmontar el componente
        return () => clearInterval(intervalId);
    }, []);
    

    const handleProfesionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedProfesion(selectedOption);
        const profesionObj = profesiones.find((prof) => prof.id_profesion === parseInt(selectedOption));
        if (profesionObj) onProfesionChange(profesionObj);
    };

    const handleServicioChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedServicio(selectedOption);
        const servicioObj = servicios.find((serv) => serv.id_servicio === parseInt(selectedOption));
        if (servicioObj) onServicioChange(servicioObj);
    };

    const handleAddProfesion = async () => {
        const nuevaProfesion = prompt("Ingrese la nueva profesión:");
        if (nuevaProfesion) {
            const profesionMayus = nuevaProfesion.toUpperCase();
            try {
                const response = await fetch('http://localhost:5000/api/personal/guardar-profes-servi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ profesion: profesionMayus })
                });

                if (response.ok) {
                    const nuevaProfesionData = await response.json();
                    setProfesiones([...profesiones, nuevaProfesionData]);
                    setSelectedProfesion(nuevaProfesionData.id_profesion);
                    onProfesionChange(nuevaProfesionData);
                } else {
                    alert("Error al agregar la profesión.");
                }
            } catch (error) {
                console.error("Error de red:", error);
                alert("Error de red al agregar la profesión.");
            }
        }
    };

    const handleAddServicio = async () => {
        const nuevoServicio = prompt("Ingrese el nuevo servicio:");
        if (nuevoServicio) {
            const servicioEnMayusculas = nuevoServicio.toUpperCase();
            try {
                const response = await fetch('http://localhost:5000/api/personal/guardar-profes-servi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ servicio: servicioEnMayusculas })
                });

                if (response.ok) {
                    const nuevoServicioData = await response.json();
                    setServicios([...servicios, nuevoServicioData]);
                    setSelectedServicio(nuevoServicioData.id_servicio);
                    onServicioChange(nuevoServicioData);
                } else {
                    alert("Error al agregar el servicio.");
                }
            } catch (error) {
                console.error("Error de red:", error);
                alert("Error de red al agregar el servicio.");
            }
        }
    };

    return (
        <div className="selected">
            <label>
                Profesión:
                <IoAddCircle className='ico-mas' onClick={handleAddProfesion} />
                <select value={selectedProfesion} onChange={handleProfesionChange}>
                    <option value="">Seleccione una profesión</option>
                    {profesiones.map((prof) => (
                        <option key={prof.id_profesion} value={prof.id_profesion}>
                            {prof.nombre_profesion}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Servicio:
                <IoAddCircle className='ico-mas' onClick={handleAddServicio} />
                <select value={selectedServicio} onChange={handleServicioChange}>
                    <option value="">Seleccione un servicio</option>
                    {servicios.map((serv) => (
                        <option key={serv.id_servicio} value={serv.id_servicio}>
                            {serv.nombre_servicio}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default Selected;
