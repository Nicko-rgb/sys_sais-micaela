import React, { useState, useEffect } from "react";
import styles from "./Control.module.css";
import { Link } from "react-router-dom";
import { RiPlayReverseLargeFill } from "react-icons/ri";
import NavLogin from "../../Navegadores/NavLogin";
import NavPie from "../../Navegadores/NavPie";
import OpcionesI from "../OpcionesI";
import { useLocation } from "react-router-dom";

const Control = ({paciente} ) => {
    const [controlNumber, setControlNumber] = useState("");
    const [date, setDate] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [headCircumference, setHeadCircumference] = useState("");
    const [selectedCare, setSelectedCare] = useState("");
    const [session, setSession] = useState("");
    const [nextAppointment, setNextAppointment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            controlNumber,
            date,
            weight,
            height,
            headCircumference,
            selectedCare,
            session,
            nextAppointment,
        });
    };

    return (
        <div className={styles.ControlPrincipal}>
            <NavLogin />
            {paciente ? (
                <>
                    <div className={styles.btn}>
                        <Link to={`/panel/${paciente?.hist_clinico || ''}`} className={styles.volver_link}>
                            <RiPlayReverseLargeFill /> VOLVER
                        </Link>
                    </div>


                    <form className={styles.controlForm} onSubmit={handleSubmit}>

                        <h2 className={styles.titulo}>Control CRED - Rec {paciente.hist_clinico}</h2>

                        <div className={styles.compactInputs}>
                            <div>
                                <label>N° Control:</label>
                                <input
                                    type="number"
                                    value={controlNumber}
                                    onChange={(e) => setControlNumber(e.target.value)}
                                    className={`${styles.controlControlNumber} ${styles.smallInput}`}
                                />
                            </div>
                            <div>
                                <label>Fec. Atención:</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className={`${styles.controlDate} ${styles.smallInput}`}
                                />
                            </div>
                        </div>

                        <div className={styles.measurementsGroup}>
                            <div className={styles.measurementItem}>
                                <label>Peso (kg):</label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className={styles.controlWeight}
                                />
                            </div>
                            <div className={styles.measurementItem}>
                                <label>Talla (cm):</label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className={styles.controlHeight}
                                />
                            </div>
                            <div className={styles.measurementItem}>
                                <label>Perímetro Cefálico (cm):</label>
                                <input
                                    type="number"
                                    value={headCircumference}
                                    onChange={(e) => setHeadCircumference(e.target.value)}
                                    className={styles.controlHeadCircumference}
                                />
                            </div>
                        </div>

                        <div className={styles.careGroup}>
                            <div className={styles.careRowHorizontal}>
                                <div className={styles.careItem}>
                                    <label htmlFor="lme">L.M.E.:</label>
                                    <input
                                        id="lme"
                                        type="radio"
                                        name="careOptions"
                                        value="LME"
                                        checked={selectedCare === "LME"}
                                        onChange={(e) => setSelectedCare(e.target.value)}
                                        className={styles.controlLme}
                                    />
                                </div>
                                <div className={styles.careItem}>
                                    <label htmlFor="acInadecuada">A.C. Inadecuada:</label>
                                    <input
                                        id="acInadecuada"
                                        type="radio"
                                        name="careOptions"
                                        value="AC Inadecuada"
                                        checked={selectedCare === "AC Inadecuada"}
                                        onChange={(e) => setSelectedCare(e.target.value)}
                                        className={styles.controlAcInadecuada}
                                    />
                                </div>
                                <div className={styles.careItem}>
                                    <label htmlFor="acAdecuada">A.C. Adecuada:</label>
                                    <input
                                        id="acAdecuada"
                                        type="radio"
                                        name="careOptions"
                                        value="AC Adecuada"
                                        checked={selectedCare === "AC Adecuada"}
                                        onChange={(e) => setSelectedCare(e.target.value)}
                                        className={styles.controlAcAdecuada}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.fondoRow}>
                            <div className={styles.fondoItem}>
                                <label htmlFor="session">Sesión:</label>
                                <input
                                    id="session"
                                    type="number"
                                    value={session}
                                    onChange={(e) => setSession(e.target.value)}
                                    className={`${styles.controlSession} ${styles.smallInput}`}
                                />
                            </div>
                            <div className={styles.fondoItem}>
                                <label htmlFor="nextAppointment">Próx. Cita:</label>
                                <input
                                    id="nextAppointment"
                                    type="date"
                                    value={nextAppointment}
                                    onChange={(e) => setNextAppointment(e.target.value)}
                                    className={`${styles.controlNextAppointment} ${styles.smallInput}`}
                                />
                            </div>
                        </div>

                        <div className={styles.formActions}>


                            <Link to={`/panel/${paciente.hist_clinico}`} className={styles.controlCancel}>
                                Cancelar
                            </Link>
                            <button type="reset" className={styles.controlReset}>
                                Reset
                            </button>
                            <button type="submit" className={styles.controlSave}>
                                Guardar
                            </button>
                        </div>
                    </form>
                </>

            ) : (
                <p>No hay datos..</p>
            )}
            <NavPie />
        </div>
    );
};

export default Control;