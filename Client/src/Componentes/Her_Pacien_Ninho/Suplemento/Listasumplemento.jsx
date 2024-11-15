import React from 'react';
import { useLocation } from 'react-router-dom';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Listasumplemento() {
  const location = useLocation();
  const { entregas, paciente } = location.state || {};  // Recibir las entregas y paciente del estado de la ruta

  return (
    <div>
      {paciente ? (
        <div>
          {/* Aquí usamos Link para navegar de vuelta sin pasar estado adicional */}
          <Link to={`/panel/${paciente.hist_clinico}`}>
            <RiPlayReverseLargeFill /> VOLVER
          </Link>
          <h2>Lista de Entregas</h2>
          {entregas && entregas.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Suplemento</th>
                  <th>Cantidad</th>
                  <th>Presentación</th>
                  <th>Fecha de Atención</th>
                </tr>
              </thead>
              <tbody>
                {entregas.map((entrega, index) => (
                  <tr key={index}>
                    <td>{entrega.suplemento}</td>
                    <td>{entrega.cantidad}</td>
                    <td>{entrega.presentacion}</td>
                    <td>{entrega.fechaAtencion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay entregas registradas.</p>
          )}
        </div>
      ) : (
        <p>No hay datos..</p>
      )}
    </div>
  );
}

export default Listasumplemento;
