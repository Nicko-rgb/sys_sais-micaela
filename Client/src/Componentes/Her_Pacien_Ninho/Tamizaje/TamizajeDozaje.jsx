import React, { useState } from 'react';
import styles from './TamizajeDozaje.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { MdOutlineManageHistory } from "react-icons/md";
import NavLogin from '../../Navegadores/NavLogin';
import NavPie from '../../Navegadores/NavPie';


const TamizajeDozaje = () => {
    const [fechaResultado1, setFechaResultado1] = useState('');
    const [resultado1, setResultado1] = useState('');
    const [fechaAtencion1, setFechaAtencion1] = useState('');

    const [fechaResultado2, setFechaResultado2] = useState('');
    const [resultado2, setResultado2] = useState('');
    const [fechaAtencion2, setFechaAtencion2] = useState('');

    const [fechaResultado3, setFechaResultado3] = useState('');
    const [resultado3, setResultado3] = useState('');
    const [fechaAtencion3, setFechaAtencion3] = useState('');

    const [fechaResultado4, setFechaResultado4] = useState('');
    const [resultado4, setResultado4] = useState('');
    const [fechaAtencion4, setFechaAtencion4] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { paciente } = location.state || {}; // Evita errores si no hay datos

    const handleGuardar = () => {
        alert('Datos guardados');
    };

    const handleSolicitar = () => {
        alert('Solicitud realizada');
    };

    const HistorialTamizaje = () => {
        navigate(`/historialtamizaje/${paciente.hist_clinico}`, { state: { paciente } })
    }

    return (
        <div>
            <NavLogin />
            <div className={styles.contGeneral}>
                {paciente ? (
                    <>
                        <div>
                            <Link to={`/panel/${paciente.hist_clinico}`} className={styles.btnVolver}>
                                <RiPlayReverseLargeFill /> VOLVER
                            </Link>
                        </div>
                        <div className={styles.titHist}>
                            <h3>control ({paciente.hist_clinico}) - {paciente.ape_paterno} {paciente.ape_materno}, {paciente.nombres} </h3>
                            <button onClick={HistorialTamizaje}><MdOutlineManageHistory /> Ver Historial</button>
                        </div>
                        <div className={styles.contCartas}>
                            {/* Dozaje de Hemoglobina */}
                            <div className={styles.cartas}>
                                <div className={styles.header}>
                                    <i className="icon-star"></i> Dozaje de Hemoglobina
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.message}>Registre Tamizaje o Solicite.</div>
                                    <div className={styles.formGroup}>
                                        <label>Fec. Resultado:</label>
                                        <input
                                            type="date"
                                            value={fechaResultado1}
                                            onChange={(e) => setFechaResultado1(e.target.value)}
                                        />
                                        <span className={styles.separator}>-</span>
                                        <label>Resultado:</label>
                                        <input
                                            type="text"
                                            value={resultado1}
                                            onChange={(e) => setResultado1(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Fecha de Atención:</label>
                                        <input
                                            type="date"
                                            value={fechaAtencion1}
                                            onChange={(e) => setFechaAtencion1(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.buttonGroup}>
                                        <button onClick={handleGuardar} className={styles.guardarButton}>Guardar</button>
                                        <button onClick={handleSolicitar} className={styles.solicitarButton}>Solicitar</button>
                                    </div>
                                </div>
                            </div>

                            {/* Parásitosis Seriado */}
                            <div className={styles.cartas}>
                                <div className={styles.header}>
                                    <i className={styles.iconstar}>X</i> Parásitosis Seriado
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.message}>Registre Tamizaje o Solicite.</div>
                                    <div className={styles.formGroup}>
                                        <label>Fec. Resultado:</label>
                                        <input
                                            type="date"
                                            value={fechaResultado2}
                                            onChange={(e) => setFechaResultado2(e.target.value)}
                                        />
                                        <span className={styles.separator}>-</span>
                                        <label>Resultado:</label>
                                        <div className={styles.radioGroup}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="Negativo"
                                                    checked={resultado2 === 'Negativo'}
                                                    onChange={(e) => setResultado2(e.target.value)}
                                                />
                                                Negativo
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="Positivo"
                                                    checked={resultado2 === 'Positivo'}
                                                    onChange={(e) => setResultado2(e.target.value)}
                                                />
                                                Positivo
                                            </label>
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Fecha de Atención:</label>
                                        <input
                                            type="date"
                                            value={fechaAtencion2}
                                            onChange={(e) => setFechaAtencion2(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.buttonGroup}>
                                        <button onClick={handleGuardar} className={styles.guardarButton}>Guardar</button>
                                        <button onClick={handleSolicitar} className={styles.solicitarButton}>Solicitar</button>
                                    </div>
                                </div>
                            </div>

                            {/* Parásitosis Graham */}
                            <div className={styles.cartas}>
                                <div className={styles.header}>
                                    <i className="icon-star"></i> Parásitosis Graham
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.message}>Registre Tamizaje o Solicite.</div>
                                    <div className={styles.formGroup}>
                                        <label>Fec. Resultado:</label>
                                        <input
                                            type="date"
                                            value={fechaResultado3}
                                            onChange={(e) => setFechaResultado3(e.target.value)}
                                        />
                                        <span className={styles.separator}>-</span>
                                        <label>Resultado:</label>
                                        <div className={styles.radioGroup}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="Negativo"
                                                    checked={resultado3 === 'Negativo'}
                                                    onChange={(e) => setResultado3(e.target.value)}
                                                />
                                                Negativo
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="Positivo"
                                                    checked={resultado3 === 'Positivo'}
                                                    onChange={(e) => setResultado3(e.target.value)}
                                                />
                                                Positivo
                                            </label>
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Fecha de Atención:</label>
                                        <input
                                            type="date"
                                            value={fechaAtencion3}
                                            onChange={(e) => setFechaAtencion3(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.buttonGroup}>
                                        <button onClick={handleGuardar} className={styles.guardarButton}>Guardar</button>
                                        <button onClick={handleSolicitar} className={styles.solicitarButton}>Solicitar</button>
                                    </div>
                                </div>
                            </div>

                            {/* Salud Mental */}
                            <div className={styles.cartas}>
                                <div className={styles.header}>
                                    <i className="icon-star"></i> Salud Mental
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.message}>Registre Tamizaje o Solicite.</div>
                                    <div className={styles.formGroup}>
                                        <label>Fec. Resultado:</label>
                                        <input
                                            type="date"
                                            value={fechaResultado4}
                                            onChange={(e) => setFechaResultado4(e.target.value)}
                                        />
                                        <span className={styles.separator}>-</span>
                                        <label>Resultado:</label>
                                        <div className={styles.radioGroup}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="Negativo"
                                                    checked={resultado4 === 'Negativo'}
                                                    onChange={(e) => setResultado4(e.target.value)}
                                                />
                                                Negativo
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="Positivo"
                                                    checked={resultado4 === 'Positivo'}
                                                    onChange={(e) => setResultado4(e.target.value)}
                                                />
                                                Positivo
                                            </label>
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Fecha de Atención:</label>
                                        <input
                                            type="date"
                                            value={fechaAtencion4}
                                            onChange={(e) => setFechaAtencion4(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.buttonGroup}>
                                        <button onClick={handleGuardar} className={styles.guardarButton}>Guardar</button>
                                        <button onClick={handleSolicitar} className={styles.solicitarButton}>Solicitar</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                ) : (
                    <p>No hay datos</p>
                )}
            </div>
            <NavPie></NavPie>
        </div>


    );
};

export default TamizajeDozaje;