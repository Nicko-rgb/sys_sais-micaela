import React, { useState, useEffect } from 'react';
import Store from '../../Store/Store_Cita_Turno';
import axios from 'axios';
import './formsector.css'
import { GoInfo } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoPersonAddOutline } from "react-icons/io5";
import UrlsApp from '../../UrlsApp';

const FormSector = ({ manzana }) => {
    const { personalSalud, sectorPer } = Store();
    const [dni, setDni] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const { apiUrl } = UrlsApp()

    // Handle input change and fetch professional by DNI
    const handleInputChange = (e) => {
        const value = e.target.value;
        setDni(value);

        if (value.length === 8) {
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

    // Submit assigned professional
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: 'Asignando...', type: 'succes' })
        if (!result) {
            setMessage({ text: 'Por favor, selecciona un profesional válido.', type: 'error' });
            return;
        }

        const data = {
            id_sector: manzana.id,
            manzana: manzana.mz,
            codigo: manzana.text.split('\n')[0],
            numero: manzana.text.split('\n')[1],
            descripcion: manzana.text.split('\n').slice(2).join(' '),
            id_personal: result?.id_personal,
        };

        try {
            const response = await axios.post(`${apiUrl}/api/personal/asigna-sector`, data);
            setMessage({ text: response.data.message, type: 'success' });
        } catch (error) {
            console.error(error);
            setMessage({ text: 'Error al asignar.', type: 'error' });
        }
    };

    // Para borrar un profesional asignado
    const deletePerson = async (id) => {
        setMessage({ text: 'Borrando...', type: '' });

        try {
            await axios.delete(`${apiUrl}/api/delete/sector-persona/${id}`);
            setMessage({ text: 'Personal borrado del sector.', type: 'success' });
        } catch (error) {
            console.error('Error al eliminar el personal:', error);
            setMessage({ text: 'Error al eliminar.', type: 'error' });
        }
    };

    const confirmDelete = (person) => {
        setIsDeleting(true);
        setSelectedPerson(person);
        setMessage({ text: '', type: '' });
        setIsInputVisible(false)
        setDni('')
        setResult(null)
    };

    const cancelTodo = () => {
        setIsDeleting(false);
        setSelectedPerson(null);
        setIsInputVisible(false)
        setMessage({ text: '', type: '' });
        setDni('')
        setResult(null)
    };

    const assignedPersonnel = sectorPer.filter(
        (data) => data.id_sector === manzana.id && data.manzana === manzana.mz
    );

    useEffect(() => {
        setMessage({ text: '', type: '' });
    }, [manzana]);

    return (
        <div className="form-sector">
            <h3>Informacion de Manzana</h3>
            <div className="datos-sector">
                <p>Código <span>{manzana.text.split('\n')[0]}</span></p>
                <p style={{ borderLeft: 'none' }}>Número <span>{manzana.text.split('\n')[1]}</span></p>
                <p style={{ borderLeft: 'none' }}>Manzana <span>{manzana.mz}</span></p>
            </div>

            <h5 style={{fontWeight: '600'}}>Personales Asignados</h5>
            {assignedPersonnel.length > 0 ? (
                <table className="person-table">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Apellidos y Nombres</th>
                            <th>DNI</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedPersonnel.map((person, index) => (
                            <tr key={index}>
                                <td className='tbl-num'>{index + 1}</td>
                                <td>{person.paterno} {person.materno} {person.nombres}</td>
                                <td>{person.dni}</td>
                                <td className='accion'>
                                    <RiDeleteBin6Line className='delete' title='Eliminar' onClick={() => confirmDelete(person)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className='no-p'><GoInfo /> No hay ningún asignado para esta manzana.</p>
            )}

            <form onSubmit={handleSubmit}>
                {isInputVisible ? (
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
                            <p className='loading'>Buscando...</p>
                        ) : result?.estado === 'activo' && result ? (
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
                        )}

                        {message.text && (
                            <div className="b-msg">
                                <p className={`msg ${message.type === 'success' ? 'msg-success' : 'msg-error'}`}>
                                    {message.text}
                                </p>
                            </div>
                        )}

                        <div className="btns">
                            {message.type === 'success' ?
                                <button className="btn-save" type="button" onClick={cancelTodo}>Aceptar</button>
                                :
                                <>
                                    <button className="btn-cancela" type="button" onClick={cancelTodo}>Cancelar</button>
                                    <button className="btn-save" type="submit">Asignar</button>
                                </>
                            }
                        </div>
                    </>
                ) : (
                    <button className='btn-new' type='button' onClick={() => setIsInputVisible(true)}><IoPersonAddOutline className='ico' />Añadir Nuevo</button>
                )}
            </form>

            {isDeleting && (
                <div className="borrar">
                    <p>¿Seguro que quieres borrar a <span>{selectedPerson.paterno} {selectedPerson.materno} {selectedPerson.nombres}</span>?</p>
                    <div className="b-msg">
                        <p className={`msg ${message.type === 'success' ? 'msg-success' : 'msg-error'}`}>
                            {message.text}
                        </p>
                    </div>
                    <div className="btns">
                        {message.type === 'success' ?
                            <button className="btn-save" onClick={cancelTodo}>Aceptar</button>
                            :
                            <>
                                <button className="btn-cancela" onClick={cancelTodo}>Cancelar</button>
                                <button className="btn-delete" onClick={() => deletePerson(selectedPerson.id_sector_personal)}>Borrar</button>
                            </>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormSector;
