import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './select.css'; // Asegúrate de que tu archivo CSS esté importado
import { IoAddCircle } from "react-icons/io5";

const Selected = ({ onProfesionChange, onServicioChange }) => {
    const [profesiones, setProfesiones] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [selectedProfesion, setSelectedProfesion] = useState(null);
    const [selectedServicio, setSelectedServicio] = useState(null);

    useEffect(() => {
        // Cargar profesiones y servicios desde la API
        const fetchOptions = async () => {
            try {
                const profesionResponse = await fetch('http://localhost:5000/api/obtener/profesiones');
                const servicioResponse = await fetch('http://localhost:5000/api/obtener/servicios');

                if (profesionResponse.ok && servicioResponse.ok) {
                    const profesionesData = await profesionResponse.json();
                    const serviciosData = await servicioResponse.json();
                    setProfesiones(profesionesData.map(prof => ({ value: prof.id_profesion, label: prof.nombre_profesion })));
                    setServicios(serviciosData.map(serv => ({ value: serv.id_servicio, label: serv.nombre_servicio })));
                } else {
                    console.error("Error al cargar profesiones o servicios.");
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        };

        fetchOptions();
    }, []);

    const handleProfesionChange = (selectedOption) => {
        setSelectedProfesion(selectedOption);
        onProfesionChange(selectedOption); // Llama al callback para pasar el valor seleccionado al componente padre
    };

    const handleServicioChange = (selectedOption) => {
        setSelectedServicio(selectedOption);
        onServicioChange(selectedOption); // Llama al callback para pasar el valor seleccionado al componente padre
    };

    const handleAddProfesion = async () => {
        const nuevaProfesion = prompt("Ingrese la nueva profesión:");
        if (nuevaProfesion) {
            try {
                const response = await fetch('http://localhost:5000/api/obtener/profesiones', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre_profesion: nuevaProfesion })
                });

                if (response.ok) {
                    const nuevaProfesionData = await response.json();
                    setProfesiones([...profesiones, { value: nuevaProfesionData.id_profesion, label: nuevaProfesionData.nombre_profesion }]);
                    setSelectedProfesion({ label: nuevaProfesionData.nombre_profesion, value: nuevaProfesionData.id_profesion });
                    onProfesionChange({ label: nuevaProfesionData.nombre_profesion, value: nuevaProfesionData.id_profesion });
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
            try {
                const response = await fetch('http://localhost:5000/api/obtener/servicios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre_servicio: nuevoServicio })
                });

                if (response.ok) {
                    const nuevoServicioData = await response.json();
                    setServicios([...servicios, { value: nuevoServicioData.id_servicio, label: nuevoServicioData.nombre_servicio }]);
                    setSelectedServicio({ label: nuevoServicioData.nombre_servicio, value: nuevoServicioData.id_servicio });
                    onServicioChange({ label: nuevoServicioData.nombre_servicio, value: nuevoServicioData.id_servicio });
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
                <Select
                    options={profesiones}
                    value={selectedProfesion}
                    onChange={handleProfesionChange}
                    placeholder="" // Placeholder vacío para que no se muestre texto adicional
                    isClearable // Permite limpiar la selección
                />
            </label>

            <label>
                Servicio:
                <IoAddCircle className='ico-mas' onClick={handleAddServicio} />
                <Select
                    options={servicios}
                    value={selectedServicio}
                    onChange={handleServicioChange}
                    placeholder="" // Placeholder vacío para que no se muestre texto adicional
                    isClearable // Permite limpiar la selección
                />
            </label>
        </div>
    );
};

export default Selected;