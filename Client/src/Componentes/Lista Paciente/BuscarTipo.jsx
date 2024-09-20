import React, { useState } from 'react';
import './buscarT.css';
import { MdPersonSearch } from 'react-icons/md';

const BuscarTipo = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Llama a la función de búsqueda en el padre
    };

    return (
        <div className="buscar-tipo">
            <MdPersonSearch className='ico-buscar' />
            <input
                type="text"
                placeholder="Ingrese Cód, HC, Nombre o Responsable a Buscar"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default BuscarTipo; 