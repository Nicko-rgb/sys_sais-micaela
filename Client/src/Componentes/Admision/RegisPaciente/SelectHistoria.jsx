import React, { useState, useEffect } from 'react';
import UrlsApp from '../../UrlsApp';
import './select.css';

const SelectHistoria = ({ setHistoria }) => {
    const { apiUrl } = UrlsApp();
    const [disponible, setDisponible] = useState(true);
    const [historiasRecomendadas, setHistoriasRecomendadas] = useState([]);
    const [historia, setHistoriaLocal] = useState(''); // Estado local del valor del input
    const [mostrandoRecomendaciones, setMostrandoRecomendaciones] = useState(false);

    useEffect(() => {
        // Obtener la historia clínica por defecto al cargar el componente
        const fetchHistoriaPorDefecto = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/paciente/historia-clinica`);
                const data = await response.json();
                setHistoriaLocal(data.historiaPorDefecto);
                setHistoria(data.historiaPorDefecto); // Enviar al componente padre
            } catch (error) {
                console.error('Error al obtener historia por defecto:', error);
            }
        };

        fetchHistoriaPorDefecto();
    }, [apiUrl, setHistoria]);

    const validarHistoria = async (historia) => {
        try {
            const response = await fetch(`${apiUrl}/api/paciente/historia-clinica?historia=${historia}`);
            const data = await response.json();

            if (data.existe) {
                setDisponible(false);
                setHistoriasRecomendadas(data.historiasRecomendadas);
                setMostrandoRecomendaciones(true);
            } else {
                setDisponible(true);
                setMostrandoRecomendaciones(false);
            }
        } catch (error) {
            console.error('Error al validar historia clínica:', error);
        }
    };

    const manejarCambio = (e) => {
        const nuevaHistoria = e.target.value.replace(/\D/g, '').slice(0, 5); // Solo números, máximo 5 dígitos
        setHistoriaLocal(nuevaHistoria); // Actualizar estado local
        setHistoria(nuevaHistoria); // Enviar valor al componente padre

        // Si el campo queda vacío, mostrar recomendaciones
        if (!nuevaHistoria) {
            setDisponible(false);
            setMostrandoRecomendaciones(true);
            return;
        }

        // Validar historias inválidas como 0, 00, 000, etc.
        if (/^0+$/.test(nuevaHistoria)) {
            setDisponible(false);
            setMostrandoRecomendaciones(true);
            return;
        }

        if (nuevaHistoria.length === 5 && nuevaHistoria !== '00000') {
            validarHistoria(nuevaHistoria);
        } else {
            setDisponible(true); // Asumir disponible si no tiene 5 dígitos
            setMostrandoRecomendaciones(false);
        }
    };

    const manejarSeleccion = (historiaSeleccionada) => {
        setHistoriaLocal(historiaSeleccionada); // Actualizar estado local
        setHistoria(historiaSeleccionada); // Enviar valor al componente padre
        setMostrandoRecomendaciones(false);
        setDisponible(true);
    };

    return (
        <label className="selec-hist">
            Hist. Clínico
            <input
                className={disponible ? '' : 'rojo'}
                type="text"
                onChange={manejarCambio}
                value={historia} // Vinculado al estado local
                required
                pattern="\d{5}"
                title="INGRESE HISTORIA CLINICA VÁLIDA DE 5 DÍGITOS"
                maxLength={5}
            />
            {!disponible && mostrandoRecomendaciones && (
                <div className="disponibles">
                    <p>Recomendadas</p>
                    {historiasRecomendadas.map((historia) => (
                        <li key={historia} onClick={() => manejarSeleccion(historia)}>
                            {historia}
                        </li>
                    ))}
                </div>
            )}
        </label>
    );
};

export default SelectHistoria;
