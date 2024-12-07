import React, { useState, useEffect } from "react";
import "./estilosGeneralControl.css";
import { Link } from "react-router-dom";
import { RiPlayReverseLargeFill } from "react-icons/ri";
import NavLogin from '../../Navegadores/NavLogin'
import NavPie from '../../Navegadores/NavPie'
import OpcionesI from "../OpcionesI";
import { useLocation } from 'react-router-dom';

const Control = () => {
    const [controlNumber, setControlNumber] = useState("");
    const [date, setDate] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [headCircumference, setHeadCircumference] = useState("");
    const [lme, setLme] = useState(false);
    const [adequateCare, setAdequateCare] = useState("A.C. Adecuada");
    const [nutritionalCounseling, setNutritionalCounseling] = useState(false);
    const [earlyStimulation, setEarlyStimulation] = useState(false);
    const [session, setSession] = useState("");
    const [nextAppointment, setNextAppointment] = useState("");
    const [selectedCare, setSelectedCare] = useState("");


    const location = useLocation();
    const { paciente } = location.state || {};// Evita errores si no hay datos


    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario
        console.log({
            controlNumber, date, weight, height, headCircumference, lme, adequateCare,
            nutritionalCounseling, earlyStimulation, session, nextAppointment,
        });
    };
    return (
        <div className="ControlPrincipal">
            <NavLogin />
            <OpcionesI paciente={paciente} />
            {paciente ? (

                <form className="control-form" onSubmit={handleSubmit}>
                    {/* <h3>{paciente.hist_clinico} {paciente.nombres} </h3> */}
                    <div>
                        <Link to={`/panel/${paciente.hist_clinico}`} className=''>
                            <RiPlayReverseLargeFill /> VOLVER
                        </Link>
                    </div>

                    <h2 className="titulo">Control CRED - Rec {paciente.hist_clinico} </h2>


                    <div className="compact-inputs">
                        <div>
                            <label>N° Control:</label>
                            <input
                                type="number"
                                value={controlNumber}
                                onChange={(e) => setControlNumber(e.target.value)}
                                className="control-controlNumber"
                            />
                        </div>
                        <div>
                            <label>Fec. Atención:</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="control-date"
                            />
                        </div>
                    </div>
                    <div className="measurements-group">
                        <div className="form-group">
                            <label>Peso (kg):</label>
                            <div className="input-select-group">
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="control-weight"
                                />
                                <select className="control-weight-status">
                                    <option value="Normal">Normal</option>
                                    <option value="Anormal">Anormal</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Talla (cm):</label>
                            <div className="input-select-group">
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="control-height"
                                />
                                <select className="control-height-status">
                                    <option value="Normal">Normal</option>
                                    <option value="Anormal">Anormal</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Perímetro Cefálico (cm):</label>
                            <div className="input-select-group">
                                <input
                                    type="number"
                                    value={headCircumference}
                                    onChange={(e) => setHeadCircumference(e.target.value)}
                                    className="control-headCircumference"
                                />
                                <select className="control-headCircumference-status">
                                    <option value="Normal">Normal</option>
                                    <option value="Anormal">Anormal</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="care-group">
                        <div className="care-row-horizontal">
                            <div className="care-item">
                                <label htmlFor="lme">L.M.E.:</label>
                                <input
                                    id="lme"
                                    type="radio"
                                    name="careOptions"
                                    value="LME"
                                    checked={selectedCare === "LME"}
                                    onChange={(e) => setSelectedCare(e.target.value)}
                                    className="control-lme"
                                />
                            </div>
                            <div className="care-item">
                                <label htmlFor="acInadecuada">A.C. Inadecuada:</label>
                                <input
                                    id="acInadecuada"
                                    type="radio"
                                    name="careOptions"
                                    value="AC Inadecuada"
                                    checked={selectedCare === "AC Inadecuada"}
                                    onChange={(e) => setSelectedCare(e.target.value)}
                                    className="control-acInadecuada"
                                />
                            </div>
                            <div className="care-item">
                                <label htmlFor="acAdecuada">A.C. Adecuada:</label>
                                <input
                                    id="acAdecuada"
                                    type="radio"
                                    name="careOptions"
                                    value="AC Adecuada"
                                    checked={selectedCare === "AC Adecuada"}
                                    onChange={(e) => setSelectedCare(e.target.value)}
                                    className="control-acAdecuada"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="fondo-row">
                        <div className="fondo-item">
                            <label htmlFor="session">Sesión:</label>
                            <input
                                id="session"
                                type="number"
                                value={session}
                                onChange={(e) => setSession(e.target.value)}
                                className="control-session"
                            />
                        </div>
                        <div className="fondo-item">
                            <label htmlFor="nextAppointment">Próx. Cita:</label>
                            <input
                                id="nextAppointment"
                                type="date"
                                value={nextAppointment}
                                onChange={(e) => setNextAppointment(e.target.value)}
                                className="control-nextAppointment"
                            />
                        </div>
                    </div>


                    <div className="form-actions">
                        <button type="submit" className="control-save">
                            Guardar
                        </button>
                        <button type="reset" className="control-reset">
                            Reset
                        </button>
                        <Link to={`/panel/${paciente.hist_clinico}`} className="control-cancel">
                            Cancelar
                        </Link>
                    </div>
                </form>
            ) : (
                <p>No hay datos..</p>
            )}
            <NavPie />
        </div>
    );
};

export default Control;