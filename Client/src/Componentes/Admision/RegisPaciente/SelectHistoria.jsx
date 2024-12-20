import React, { useState, useEffect } from 'react';
import UrlsApp from '../../UrlsApp';
import './select.css';

const SelectHistoria = ({ handleHistoria, value }) => {
    const { apiUrl } = UrlsApp();
    const [disponible, setDisponible] = useState(true);
    const [historiasRecomendadas, setHistoriasRecomendadas] = useState([]);
    const [historiaPorDefecto, setHistoriaPorDefecto] = useState('');
    const [mostrandoRecomendaciones, setMostrandoRecomendaciones] = useState(false);

    useEffect(() => {
        // Obtener la historia clínica por defecto al cargar el componente
        const fetchHistoriaPorDefecto = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/paciente/historia-clinica`);
                const data = await response.json();
                setHistoriaPorDefecto(data.historiaPorDefecto);
            } catch (error) {
                console.error('Error al obtener historia por defecto:', error);
            }
        };

        fetchHistoriaPorDefecto();
    }, [apiUrl]);

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
        const nuevaHistoria = e.target.value;
        handleHistoria(e); // Propagar cambio al componente padre

        // Si el valor es vacío, mostrar recomendaciones y no autocompletar
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

    const manejarSeleccion = (historia) => {
        setMostrandoRecomendaciones(false);
        handleHistoria({ target: { value: historia } });
        setDisponible(true)
    };

    return (
        <label className="selec-hist">
            Hist. Clínico
            <input
                className={disponible ? '' : 'rojo'}
                type="text"
                onChange={manejarCambio}
                value={value || historiaPorDefecto}
                required
                pattern="\d{5}"
                title="INGRESE HISTORIA CLINICA VALIDA DE 5 DIGITOS"
                maxLength={5}
            />
            {!disponible && mostrandoRecomendaciones && (
                <div className="disponibles">
                    <p>Historias recomendadas:</p>
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
