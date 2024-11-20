import React, { useState, useEffect } from 'react';
import style from './Entregasuplemento.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Entregasuplemento() {
  const [fechaAtencion, setFechaAtencion] = useState('');
  const [entregas, setEntregas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { paciente } = location.state || {};

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFechaAtencion(today);
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFechaAtencion(selectedDate);
  };

  const handleEntrega = (suplemento, cantidad, presentacion) => {
    if (!cantidad || !presentacion || cantidad.trim() === '' || presentacion.trim() === '') {
      setModalMessage('Por favor complete el campo cantidad y presentación.');
      setShowModal(true);
      return;
    }

    const nuevaEntrega = {
      suplemento,
      cantidad,
      presentacion,
      fechaAtencion
    };

    // Guarda la entrega en el estado
    setEntregas([...entregas, nuevaEntrega]);

    setModalMessage(Entrega de ${suplemento} realizada con éxito.);
    setShowModal(true);
    setIsRedirecting(true);
  };


  const handleModalClose = () => {
    setShowModal(false);
    if (isRedirecting) {

      navigate(/Listasuplemento/${paciente.hist_clinico}, { state: { paciente, entregas } });
    }
  };


  return (
    <div className={style.entregacontainer}>
      {paciente ? (
        <>
          <div>
            <Link to={/panel/${paciente.hist_clinico}}>
              <RiPlayReverseLargeFill /> VOLVER
            </Link>
            <div className={style.nompaci}>
              <h3>{paciente.hist_clinico} - {paciente.ape_paterno} {paciente.ape_materno}  {paciente.nombres} </h3>
            </div>
          </div>

          <div className={style.cardscontainer}>
            {/* Card 1: VITAMINA A */}
            <div className={style.card}>
              <h3>VITAMINA A</h3>
              <div className={style.alert}>Puede entregar estos suplementos!</div>
              <form className={style.form}>
                <div className={style.formRow}>
                  <label>N° Entrega: <input type="number" value="1" readOnly /></label>
                  <label>Fec. Atención:
                    <input
                      type="date"
                      value={fechaAtencion}
                      onChange={handleDateChange}
                      max={new Date().toISOString().split('T')[0]} // Restrict to today or previous dates
                      className={style.datepicker}
                    />
                  </label>
                </div>
                <div className={style.formRow}>
                  <label>Cantidad: <input id="cantidadVA" type="text" placeholder="C, J, C, B" required /></label>
                  <label>Presentación:
                    <select id="presentacionVA">
                      <option>VA</option>
                    </select>
                  </label>
                </div>
                <button
                  className={style.entregarbutton}
                  type="button"
                  onClick={() => {
                    const cantidad = document.getElementById("cantidadVA").value;
                    const presentacion = document.getElementById("presentacionVA").value;
                    handleEntrega('VITAMINA A', cantidad, presentacion);
                  }}
                >
                  Entregar
                </button>
              </form>
            </div>

            {/* Card 2: Zinc */}
            <div className={style.card}>
              <h3>Zinc</h3>
              <div className={style.alert}>Puede entregar estos suplementos!</div>
              <form className={style.form}>
                <div className={style.formRow}>
                  <label>N° Entrega: <input type="number" value="1" readOnly /></label>
                  <label>Fec. Atención:
                    <input
                      type="date"
                      value={fechaAtencion}
                      onChange={handleDateChange}
                      max={new Date().toISOString().split('T')[0]} // Restrict to today or previous dates
                      className={style.datepicker}
                    />
                  </label>
                </div>
                <div className={style.formRow}>
                  <label>Cantidad: <input id="cantidadZN" type="text" placeholder="C, J, C, B" required /></label>
                  <label>Presentación:
                    <select id="presentacionZN">
                      <option>ZN</option>
                    </select>
                  </label>
                </div>
                <button
                  className={style.entregarbutton}
                  type="button"
                  onClick={() => {
                    const cantidad = document.getElementById("cantidadZN").value;
                    const presentacion = document.getElementById("presentacionZN").value;
                    handleEntrega('Zinc', cantidad, presentacion);
                  }}
                >
                  Entregar
                </button>
              </form>
            </div>

            {/* Card 3: Antiparasitario */}
            <div className={style.card}>
              <h3>Antiparasitario</h3>
              <div className={style.alert}>Puede entregar estos suplementos!</div>
              <form className={style.form}>
                <div className={style.formRow}>
                  <label>N° Entrega: <input type="number" value="1" readOnly /></label>
                  <label>Fec. Atención:
                    <input
                      type="date"
                      value={fechaAtencion}
                      onChange={handleDateChange}
                      max={new Date().toISOString().split('T')[0]} // Restrict to today or previous dates
                      className={style.datepicker}
                    />
                  </label>
                </div>
                <div className={style.formRow}>
                  <label>Cantidad: <input id="cantidadMZ" type="text" placeholder="C, J, C, B" required /></label>
                  <label>Presentación:
                    <select id="presentacionMZ">
                      <option>MZ</option>
                    </select>
                  </label>
                </div>
                <button
                  className={style.entregarbutton}
                  type="button"
                  onClick={() => {
                    const cantidad = document.getElementById("cantidadMZ").value;
                    const presentacion = document.getElementById("presentacionMZ").value;
                    handleEntrega('Antiparasitario', cantidad, presentacion);
                  }}
                >
                  Entregar
                </button>
              </form>
            </div>

            {/* Card 4: Suplemento 24m-35m */}
            <div className={style.card}>
              <h3>Suplemento 24m-35m</h3>
              <div className={style.alert}>Puede entregar estos suplementos!</div>
              <form className={style.form}>
                <div className={style.formRow}>
                  <label>N° Entrega: <input type="number" value="1" readOnly /></label>
                  <label>Fec. Atención:
                    <input
                      type="date"
                      value={fechaAtencion}
                      onChange={handleDateChange}
                      max={new Date().toISOString().split('T')[0]} // Restrict to today or previous dates
                      className={style.datepicker}
                    />
                  </label>
                </div>
                <div className={style.formRow}>
                  <label>Cantidad: <input id="cantidadMN" type="text" placeholder="C, J, C, B" required /></label>
                  <label>Presentación:
                    <select id="presentacionMN">
                      <option>MN</option>
                      <option>HP</option>
                      <option>SF</option>
                      <option>TA</option>
                    </select>
                  </label>
                </div>
                <button
                  className={style.entregarbutton}
                  type="button"
                  onClick={() => {
                    const cantidad = document.getElementById("cantidadMN").value;
                    const presentacion = document.getElementById("presentacionMN").value;
                    handleEntrega('Suplemento 24m-35m', cantidad, presentacion);
                  }}
                >
                  Entregar
                </button>
              </form>
            </div>
          </div>

          {/* Modal de Confirmación */}
          {showModal && (
            <div className={style.modal}>
              <div className={style.modalContent}>
                <p>{modalMessage}</p>
                <button onClick={handleModalClose} className={style.closeModal}>Cerrar</button>
              </div>
            </div>
          )}

          <div className={style.info}>
            <p><strong>INFORMACIÓN:</strong></p>
            <p>Cantidad: Número de insumos entregados (Cajas, Jarabes, Blister, Capsulas)</p>
            <p>Presentación: MN (Micronutrientes - Chispitas), SF (Sulfato Ferroso), HP (Hierro Polimaltozado), MZ (Mebendazol), VA (Vitamina A)</p>
          </div>

        </>
      ) : (
        <p>No hay datos..</p>
      )}
    </div>
  );
}

export default Entregasuplemento;