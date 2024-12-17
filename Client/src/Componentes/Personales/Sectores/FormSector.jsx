import React, { useState, useEffect } from 'react';
import Store from '../../Store/Store_Cita_Turno';
import axios from 'axios';
import { GoInfo } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

const FormSector = ({ manzana, closeForm }) => {
    const { personalSalud } = Store();
    const [dni, setDni] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [msgEr, setMsgEr] = useState('')
    const [showInput, setShowInput] = useState(false);
    const [borrar, setBorrar] = useState(false)
    const [ selectPerson, setSelectPeron] = useState(null)
    const { sectorPer } = Store();

    // Handle changes in the input field
    const handleInputChange = (e) => {
        const value = e.target.value;
        setDni(value);

        if (value) {
            setLoading(true);
            const found = personalSalud.find((persona) => persona.dni === value);

            setTimeout(() => {
                setResult(found || null);
                setLoading(false);
            }, 1000);
        } else {
            setResult(null);
        }
    };

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) e.preventDefault();
    };

    // Submit data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('Asignando...')
        if (!result) {
            setMsg('Por favor, selecciona un profesional válido.');
            return;
        }

        const data = {
            id_sector: manzana.id,
            manzana: manzana.mz,
            codigo: manzana.text.split('\n')[0],
            numero: manzana.text.split('\n')[1],
            descripcion: manzana.text.split('\n').slice(2).join(' '),
            id_personal: result?.id_personal
        };

        try {
            const response = await axios.post('http://localhost:5000/api/personal/asigna-sector', data);
            setMsg(response.data.message);
        } catch (error) {
            console.error(error);
            setMsg('Error al asignar.');
        }
    };

    const deletePerson = async (id) => {
        setMsgEr('')
        setMsg('Borrando....')
        try {
            const response = await fetch(`http://localhost:5000/api/delete/sector-persona/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            setMsg('Personal Borrado del sector.');
        } catch (error) {
            setMsg('')
            setMsgEr('Error al Eliminar.')
            console.error('Error al eliminar el personal:', error);
        }
    }
    
    const handleDelete = (person) => {
        setBorrar(true)
        setSelectPeron(person)
    }

    const handleCloseDelete = () => {
        setBorrar(false)
        setSelectPeron(null)|
        setMsg('')
        setMsgEr('')
    }

    // Find assigned personnel for this sector
    const dataFind = sectorPer.filter(
        (data) =>
            data.id_sector === manzana.id &&
            data.manzana === manzana.mz
    );

    useEffect(() => {
        setMsg('')
    }, [manzana]);

    return (
        <div className="form-sector">
            <h3>Asignar un Profesional</h3>
            <div className="datos">
                <p>Código
                    <span>{manzana.text.split('\n')[0]}</span>
                </p>
                <p style={{ borderLeft: 'none' }}>Número
                    <span>{manzana.text.split('\n')[1]}</span>
                </p>
                <p style={{ borderLeft: 'none' }}>Manzana
                    <span>{manzana.mz}</span>
                </p>
            </div>
            <h5>Personales Asignados</h5>
            <div className="data-person">
                {dataFind.length > 0 ? (
                    dataFind.map((person, index) => (
                        <div key={index} className="item">
                            <RiDeleteBin6Line className='delete' onClick={() => handleDelete(person) } />
                            <li key={person.id_personal}>
                                {person.paterno} {person.materno} {person.nombres} - {person.dni}
                            </li>
                        </div>
                    ))
                ) : (
                    <p className='no-p'><GoInfo /> No hay ningún asignado para esta manzana.</p>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                {showInput ? (
                    <>
                        <label>
                            Ingrese DNI para asignar:
                            <input
                                type="text"
                                placeholder="DNI"
                                value={dni}
                                onChange={handleInputChange}
                                maxLength={8}
                                onKeyPress={handleKeyPress}
                            />
                        </label>
                        {loading ? (
                            <p className='loading'>Buscando....</p>
                        ) : (
                            result?.estado === 'activo' && result ? (
                                <div className="result">
                                    <p style={{ borderTop: 'none' }}>Nombres:  <span>{result.paterno} {result.materno} {result.nombres}</span></p>
                                    <p>Profesión: <span> {result.profesion}</span></p>
                                    <p>Servicio: <span>{result.servicio} </span> </p>
                                    <p style={{ borderBottom: 'solid #b0b0b0 1px' }}>DNI: <span> {result.dni} </span></p>
                                </div>
                            ) : (
                                dni.length === 8 && !loading && (
                                    <p className='loading' style={{ color: 'rgb(253, 104, 104)' }}>No se encontró ningún profesional con este DNI.</p>
                                )
                            )
                        )}
                    </>
                ) : (
                    <button type='button' onClick={() => setShowInput(true)}>Añadir Nuevo</button> // Show input when clicked
                )}
                <div className="b-msg">
                    <p className='msg'>{msg}</p>
                </div>
                <div className="btns">
                    <button className="btn-cancela" type="button" onClick={closeForm}>Cancelar</button>
                    <button className="btn-save" type="submit">Guardar</button>
                </div>
            </form>
            {borrar && (
                <div className="borrar">
                    <p>Seguro que quieres borrar a <span>{selectPerson.paterno}{selectPerson.materno} { selectPerson.nombres} </span> </p>
                    <p className='msg'>{msg} </p>
                    <p className='msgEr'>{msgEr} </p>
                    <div className="btns">
                        <button className="btn-cancela" type="button" onClick={() => handleCloseDelete()}>Cancelar</button>
                        <button className='btn-delete' onClick={() => deletePerson(selectPerson.id_sector_personal)}>Borrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormSector;
