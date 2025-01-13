import React, { useState, useEffect } from 'react';
import './config.css';
import { TiInfoLarge } from "react-icons/ti";
import UrlsApp from '../../UrlsApp'
import { TbDatabaseX, TbPackageExport, TbPencilCancel } from "react-icons/tb";
import { IoReloadOutline } from "react-icons/io5";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Definir los colores por defecto
const defaultColors = {
    deporte: '#38a700',
    educacion: '#ff7f7f',
    espacimiento: '#ffff00',
    estado: '#ff2d7f',
    iglesia: '#ff72df',
    industria: '#ffaa00',
    mercado: '#d7d79e',
    salud: '#00c5ff',
    viviendas: '#90ee90',
    hidrografia: '#1e90ff',
    calles: '#808080',
    mz2021: '#ffffff',
};

// Componente Config
const Config = () => {
    const {apiUrl} = UrlsApp()
    // Inicializar el estado con los colores desde localStorage o valores por defecto
    const [colorState, setColorState] = useState(() => {
        const savedColors = localStorage.getItem('colors');
        return savedColors ? JSON.parse(savedColors) : defaultColors;
    });

    // Manejar cambios en los inputs
    const handleColorChange = (key, value) => {
        setColorState(prevColors => {
            const updatedColors = {
                ...prevColors,
                [key]: value,
            };
            // Guardar los cambios en localStorage
            localStorage.setItem('colors', JSON.stringify(updatedColors));
            return updatedColors;
        });
    };

    // Función para reestablecer colores a los valores originales
    const handleReset = () => {
        setColorState(defaultColors); // Restablecer al objeto colors importado desde Coordenadas.js
        localStorage.setItem('colors', JSON.stringify(defaultColors)); // Actualizar localStorage
    };

    // Funcion para exportar datos
    const handleExport = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/manzana/export-notas`);
            const data = await response.json();

            // Crear una hoja de trabajo
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Notas Manzana');

            // Generar archivo Excel
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

            // Descargar el archivo
            saveAs(blob, 'notas_manzana.xlsx');
        } catch (error) {
            console.error('Error al exportar los datos:', error);
        }
    };

    return (
        <div className='configmz'>
            <h3>Configuración</h3>
            <p className='prf'>
                Configuración del plano de la jurisdicción del EESS
                Centro de Salud de Micaela Bastidas
            </p>

            <div className="colors-mapa">
                <p>Cambiar Colores del mapa</p>
                <div className="boxs">
                    {Object.keys(colorState).map((key) => (
                        <div className='box' key={key}>
                            <label>{key}:</label>
                            <div>
                                <input
                                    type="color"
                                    value={colorState[key]}
                                    onChange={(e) => handleColorChange(key, e.target.value)}
                                />
                                <div
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        backgroundColor: colorState[key],
                                        border: '1px solid #000'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="restablece">
                    <IoReloadOutline onClick={handleReset} />
                    <div className="etiqueta">Reestablecer</div>
                </div>
            </div>

            <p className="info"><TiInfoLarge />Algunas Acciones son altamente peligrosas</p>
            <div className="btns">
                <button><TbDatabaseX />Eliminar Datos</button>
                <button><TbPencilCancel />Eliminar Notas</button>
                <button>Guardar</button>
                <button>Cerrar</button>
                <button onClick={handleExport}><TbPackageExport />Exportar Datos del Mapa</button>
            </div>
        </div>
    );
}

// Exportar el objeto colors para usar en otros componentes
export const getColors = () => {
    const savedColors = localStorage.getItem('colors');
    return savedColors ? JSON.parse(savedColors) : defaultColors;
};

export default Config;
