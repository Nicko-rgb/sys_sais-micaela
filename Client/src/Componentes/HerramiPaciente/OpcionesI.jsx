import React, { useState } from 'react';
import './opciones.css';
import { MdOutlineAppRegistration } from "react-icons/md";
import { PiNotePencil } from "react-icons/pi";
import { TbMedicineSyrup } from "react-icons/tb";
import { MdOutlineBloodtype } from "react-icons/md";
import { IoBody } from 'react-icons/io5'; 
import { MdOutlineVaccines } from "react-icons/md";

const OpcionesI = () => {
  return (
    <section className="opciones-right">
      <div className="cabeza">
        <p>Menú de Opciones</p>
      </div>
      <div className="opciones4">
        <details name='opcion' className="opcion-item">
          <summary><MdOutlineAppRegistration className='icon' />DATOS</summary>
          <p>GENERAL</p>
          <p>TARJETA DE CONTROL</p>
          <p>EDITAR DATOS</p>
        </details>
        <details name='opcion' className="opcion-item">
          <summary><PiNotePencil className='icon' />CONTROL</summary>
          <p>CONTROL NIÑO</p>
          <p>HIST DE CONTROLES</p>
          <p>VISITA DOMICILIARIA</p>
          <p>HIST DE VISITA</p>
        </details>
        <details name='opcion' className="opcion-item">
          <summary><TbMedicineSyrup className='icon' />SUPLEMENTOS</summary>

        <p>Entrega Suplemento</p>
        <p> Historial Suplemento</p> 
        <p>Actualizar Suplementos</p>
        </details>
        <details name='opcion' className="opcion-item">
          <summary><MdOutlineBloodtype className='icon' />TAMISAJE</summary>
          <p>Tamizaje-Dozaje</p>
        <p> Historial Tamizaje</p>
        </details>
        <details name='opcion' className="opcion-item">
          <summary> <IoBody className='icon' />PSICOMOTOR</summary>
          <p>Evaluacion Psicomotor</p>
          <p> Historial Psicomotor</p>
        </details> 
        <details name='opcion' className="opcion-item">
          <summary><MdOutlineVaccines className='icon' />VACUNA</summary>
          <p>Vacunar Niño</p>
          <p> Historial Vacunas</p>
          <p> Vacunas Faltantes</p>
        </details>
      </div>
    </section>
  );
};

export default OpcionesI;
