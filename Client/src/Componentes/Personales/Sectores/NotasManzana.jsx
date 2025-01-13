import React, { useState, useEffect } from 'react';
import './notasmz.css';
import { TbPencilPlus } from "react-icons/tb";
import { GoInfo } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import UrlsApp from '../../UrlsApp';
import axios from 'axios';
import { formatFecha } from '../../Complementos/Funciones'

const NotasManzana = ({ manzana }) => {
    const [openForm, setOpenForm] = useState(false);
    const { apiUrl } = UrlsApp();
    const [notas, setNotas] = useState([]);
    const [nota, setNota] = useState('');
    const [fechaRecordar, setFechaRecordar] = useState('');
    const [msg, setMsg] = useState({ text: '', type: '' });
    const [msgD, setMsgD] = useState({ text: '', type: '' });

    // Obtener las notas desde la base de datos
    const getNotas = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/obtener/notas-manzana`);
            setNotas(response.data);
        } catch (error) {
            console.error('Error al obtener notas:', error);
        }
    };

    useEffect(() => {
        getNotas();
    }, []);

    useEffect(() => {
        setMsg({ text: '', type: '' })
    }, [manzana]);

    // Filtrar notas por manzana actual
    const notasFiltradas = notas.filter(
        (n) =>
            n.id_manzana === manzana.id &&
            n.manzana === manzana.mz
    );

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg({ text: 'Registrando...', type: 'success' });

        const datos = {
            id_manzana: manzana.id,
            codigo: manzana.text.split('\n')[0],
            manzana: manzana.mz,
            nota,
            fechaRecordar,
        };

        try {
            const response = await axios.post(`${apiUrl}/api/registrar/nota-manzana`, datos);
            setMsg({ text: response.data.message, type: 'success' });
            getNotas();
        } catch (error) {
            console.error('Error al registrar la nota:', error);
            setMsg({ text: 'Error al registrar la nota.', type: 'error' });
        }
    };

    // Funcion para borrar nota de manzana 
    const handleDelete = async (idNota) => {
        try {
            const response = await axios.delete(`${apiUrl}/api/eliminar/nota-manzana/${idNota}`);
            setMsgD({ text: response.data.message, type: 'success' });    
            setTimeout(() => {
                setMsgD({ text: '', type: '' });
            }, 2000);
            getNotas();
        } catch (error) {
            console.error('Error al eliminar la nota:', error);
            setMsgD({ text: `Error al eliminar la nota.`, type: 'error' });
            setTimeout(() => {
                setMsgD({ text: '', type: '' }); 
            }, 2000);
        }
    };
    

    // Cancelar la operación y limpiar el formulario
    const handleCancel = () => {
        setOpenForm(false);
        setNota('');
        setFechaRecordar('');
        setMsg({ text: '', type: '' });
    };

    return (
        <div className="notasmz">
            <h3>Notas de Manzana</h3>

            {notasFiltradas.length === 0 ? (
                <p className="nota-info"><GoInfo /> No hay notas para esta manzana</p>
            ) : (
                <div className='boxs'>
                    {notasFiltradas.map((n) => (
                        <div key={n.id_notas_manzana} className='box'>
                            <CgNotes className='ico' />
                            <RiDeleteBin6Line onClick={() => handleDelete(n.id_notas_manzana)} className='delete' title='Eliminar' />
                            <p className="nota-text">{n.nota}</p>
                            <p className="fecha">
                                {n.fecha_recordatorio ? formatFecha(n.fecha_recordatorio) : '---'}
                            </p>
                        </div>
                    ))}
                    <p className={`msg ${msgD.type}`}>{msgD.text}</p>
                </div>
            )}

            {!openForm && (
                <button className="btn-nota" onClick={() => setOpenForm(true)}>
                    <TbPencilPlus /> Agregar Nota
                </button>
            )}
            <form onSubmit={handleSubmit} className={`${openForm ? 'open' : ''}`}>
                <textarea
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    placeholder="Escribe una nota para esta manzana..."
                    required
                />
                <label>
                    Agregar Fecha de Recordatorio
                    <input
                        type="date"
                        value={fechaRecordar}
                        onChange={(e) => setFechaRecordar(e.target.value)}
                    />
                </label>
                <p className={`msg ${msg.type}`}>{msg.text}</p>
                <div className="btns">
                    {msg.type === 'success' ?
                        <button type="button" onClick={handleCancel} className="btn-save">Aceptar</button>
                        :
                        <>
                            <button type="button" onClick={handleCancel} className="btn-cancela">Cancelar</button>
                            <button type="submit" className="btn-save">Guardar</button>
                        </>
                    }
                </div>
            </form>
        </div>
    );
};

export default NotasManzana;
