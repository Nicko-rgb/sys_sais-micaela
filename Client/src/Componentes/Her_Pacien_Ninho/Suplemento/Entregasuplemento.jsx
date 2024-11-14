import React, { useState, useEffect } from 'react';
import style from './Entregasuplemento.module.css';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { RiPlayReverseLargeFill } from "react-icons/ri";

function Entregasuplemento() {
  const [fechaAtencion, setFechaAtencion] = useState('');

  const location = useLocation();
  const { paciente } = location.state || {};

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Format as yyyy-mm-dd
    setFechaAtencion(today);
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFechaAtencion(selectedDate);
  };

  return (
    <div className={style.entregacontainer}>
      {paciente ? (
        <>
          <div>
            <Link to={`/panel/${paciente.hist_clinico}`} className=''>
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
                      className={style.datepicker} // Apply custom styles
                    />
                  </label>
                </div>
                <div className={style.formRow}>
                  <label>Cantidad: <input type="text" placeholder="C, J, C, B" required /></label>
                  <label>Presentación: 
                    <select>
                      <option>VA</option>
                    </select>
                  </label>
                </div>
                <button className={style.entregarbutton}>Entregar</button>
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
                      className={style.datepicker} // Apply custom styles
                    />
                  </label>
                </div>
                <div className={style.formRow}>
                  <label>Cantidad: <input type="text" placeholder="C, J, C, B" required /></label>
                  <label>Presentación: 
                    <select>
                      <option>ZN</option>
                    </select>
                  </label>
                </div>
                <button className={style.entregarbutton}>Entregar</button>
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
                      className={style.datepicker} // Apply custom styles
                    />
                  </label>
                </div>
                <div className={style.formRow}>
                  <label>Cantidad: <input type="text" placeholder="C, J, C, B" required /></label>
                  <label>Presentación: 
                    <select>
                      <option>MZ</option>
                    </select>
                  </label>
                </div>
                <button className={style.entregarbutton}>Entregar</button>
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
                      className={style.datepicker} // Apply custom styles
                    />
                  </label>
                </div>
                <div className={style.formRow}>
                  <label>Cantidad: <input type="text" placeholder="C, J, C, B" required /></label>
                  <label>Presentación: 
                    <select>
                      <option>MN</option>
                    </select>
                  </label>
                </div>
                <button className={style.entregarbutton}>Entregar</button>
              </form>
            </div>
          </div>

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
