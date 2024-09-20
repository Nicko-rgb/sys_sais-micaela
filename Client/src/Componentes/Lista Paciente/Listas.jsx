import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './lista.css';
import OpcionesD from '../HerramiPaciente/OpcionesD';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import BuscarTipo from './BuscarTipo';

const Lista = () => {
    const { tipo } = useParams(); // Obtener el tipo de paciente de la ruta
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false); // Estado para controlar si mostrar todos los registros
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

    const obtenerPacientesPorTipo = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/obtener-tipo/pacientes?tipo=${tipo}`); // Ajusta la ruta según tu API
            const data = await response.json();
            setPacientes(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener pacientes:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerPacientesPorTipo(); // Obtener pacientes al montar el componente
    }, [tipo]);

    const calcularEdad = (fechaNacimiento) => {
        const fechaNac = new Date(fechaNacimiento);
        const fechaActual = new Date();
        const diferenciaMilisegundos = fechaActual.getTime() - fechaNac.getTime();
        const diasDiferencia = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
        const anios = Math.floor(diasDiferencia / 365);
        const meses = Math.floor((diasDiferencia % 365) / 30);
        const dias = Math.floor((diasDiferencia % 365) % 30);

        if (anios > 0) {
            return `${anios} año${anios > 1 ? 's' : ''} ${meses} mes${meses > 1 ? 'es' : ''}`;
        } else if (meses > 0) {
            return `${meses} mes${meses > 1 ? 'es' : ''} ${dias} día${dias > 1 ? 's' : ''}`;
        } else {
            return `${dias} día${dias > 1 ? 's' : ''}`;
        }
    };

    // Filtrar pacientes según el estado de showAll y el término de búsqueda
    const pacientesFiltrados = pacientes
        .filter(paciente => {
            const fullName = `${paciente.nombres} ${paciente.ape_paterno} ${paciente.ape_materno}`.toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            return (
                paciente.dni.includes(searchLower) ||
                paciente.hist_clinico.includes(searchLower) ||
                fullName.includes(searchLower) ||
                (paciente.nombres_res && `${paciente.nombres_res} ${paciente.ape_paterno_res} ${paciente.ape_materno_res}`.toLowerCase().includes(searchLower))
            );
        })
        .slice(0, showAll ? pacientes.length : 10); // Mostrar solo 10 registros o todos

    return (
        <div className="listas-paciente">
            <NavLogin />
            <OpcionesD pacienteDatos={{ tipo_paciente: tipo }} />
            <main>
                <h2>Lista de Pacientes - {tipo}</h2>
                <BuscarTipo onSearch={setSearchTerm} />
                {loading ? (
                    <p>Cargando pacientes...</p>
                ) : pacientesFiltrados.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>DNI</th>
                                    <th>Hist Clínico</th>
                                    <th>Nombre</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Edad</th>
                                    <th>Sexo</th>
                                    <th>Responsable</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pacientesFiltrados.map((paciente, index) => (
                                    <tr key={index}>
                                        <td>{paciente.dni}</td>
                                        <td>
                                            <Link to={`/panel/${paciente.hist_clinico}`} className='hist-clinico'>
                                                {paciente.hist_clinico}
                                            </Link>
                                        </td>
                                        <td>{paciente.ape_paterno} {paciente.ape_materno}, {paciente.nombres}</td>
                                        <td>{new Date(paciente.fecha_nacimiento).toLocaleDateString()}</td>
                                        <td>{calcularEdad(paciente.fecha_nacimiento)}</td>
                                        <td>{paciente.sexo}</td>
                                        <td>
                                            {paciente.id_responsable ? (
                                                <>
                                                    {paciente.ape_paterno_res} {paciente.ape_materno_res}, {paciente.nombres_res}
                                                </>
                                            ) : (
                                                'Sin responsable'
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!showAll && (
                            <button onClick={() => setShowAll(true)}>Mostrar Todos</button>
                        )}
                    </>
                ) : (
                    <p>No se encontraron pacientes de este tipo.</p>
                )}
            </main>
            <NavPie />
        </div>
    );
};

export default Lista;