import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import style from "./Listasuplemento.module.css";
import NavLogin from "../../Navegadores/NavLogin";
import NavPie from "../../Navegadores/NavPie";
import Entregasuplemento from "./Entregasuplemento";

function Listasumplemento({ paciente, cambiarVista }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { entregas } = location.state || {};

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEntrega, setSelectedEntrega] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [updatedEntrega, setUpdatedEntrega] = useState({});

  // Función para abrir el modal de edición
  const handleEdit = (index) => {
    setSelectedEntrega(index);
    setUpdatedEntrega(entregas[index]);
    setModalOpen(true);
  };

  // Función para cerrar el modal de edición
  const closeModal = () => {
    setModalOpen(false);
    setSelectedEntrega(null);
  };

  // Función para guardar los cambios
  const saveChanges = () => {
    entregas[selectedEntrega] = updatedEntrega;
    setModalOpen(false);
  };

  // Función para abrir el modal de confirmación de eliminación
  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  // Función para cerrar el modal de confirmación de eliminación
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteIndex(null);
  };
  const calcularEdad = (fechaNacimiento) => {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();

    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = fechaActual.getTime() - fechaNac.getTime();

    // Convertir a días
    const diasDiferencia = Math.floor(
      diferenciaMilisegundos / (1000 * 60 * 60 * 24)
    );

    // Calcular años, meses y días
    const anios = Math.floor(diasDiferencia / 365);
    const meses = Math.floor((diasDiferencia % 365) / 30);
    const dias = Math.floor((diasDiferencia % 365) % 30);

    // Devolver la edad en el formato adecuado
    if (anios > 0) {
      return `${anios} año${anios > 1 ? "s" : ""} ${meses} mes${
        meses > 1 ? "es" : ""
      }`;
    } else if (meses > 0) {
      return `${meses} mes${meses > 1 ? "es" : ""} ${dias} día${
        dias > 1 ? "s" : ""
      }`;
    } else {
      return `${dias} día${dias > 1 ? "s" : ""}`;
    }
  };

  // Función para confirmar la eliminación
  const confirmDelete = () => {
    entregas.splice(deleteIndex, 1);
    setDeleteModalOpen(false);
    navigate(location.pathname, { state: { entregas, paciente } });
  };

  return (
    <div>
      <NavLogin />
      <div className={style.listasumplementocontainer}>
        {paciente ? (
          <div className={style.contentwrapper}>
            <button
              className={style.newsupplementbutton}
              onClick={() =>
                cambiarVista(<Entregasuplemento paciente={paciente} />)
              }
            >
              Nuevo Suplemento
            </button>

            <div className={style.pac}>
              <h2>LISTA DE ENTREGAS</h2>
              <h3>
                {" "}
                ( {paciente.hist_clinico}) {paciente.ape_paterno}{" "}
                {paciente.ape_materno}, {paciente.nombres}{" "}
              </h3>
            </div>
            {entregas && entregas.length > 0 ? (
              <table className={style.deliverytable}>
                <thead>
                  <tr>
                    <th>Edad</th>
                    <th>Suplemento</th>
                    <th>Cantidad</th>
                    <th>Presentación</th>
                    <th>Fecha de Atención</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {entregas.map((entrega, index) => (
                    <tr key={index}>
                      <td>{calcularEdad(paciente.fecha_nacimiento)}</td>
                      <td>{entrega.suplemento}</td>
                      <td>{entrega.cantidad}</td>
                      <td>{entrega.presentacion}</td>
                      <td>{entrega.fechaAtencion}</td>
                      <td>
                        <button
                          className={style.editbutton}
                          onClick={() => handleEdit(index)}
                        >
                          ✏️
                        </button>
                        <button
                          className={style.deletebutton}
                          onClick={() => openDeleteModal(index)}
                        >
                          ❌
                        </button>
                      </td>
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
      <NavPie />

      {/* Modal para editar */}
      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <h3>EDITAR ENTREGA</h3>
            <div className={style.inputGroup}>
              <label>
                Suplemento:
                <input
                  type="text"
                  value={updatedEntrega.suplemento}
                  onChange={(e) =>
                    setUpdatedEntrega({
                      ...updatedEntrega,
                      suplemento: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Cantidad:
                <input
                  type="number"
                  value={updatedEntrega.cantidad}
                  onChange={(e) =>
                    setUpdatedEntrega({
                      ...updatedEntrega,
                      cantidad: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Presentación:
                <input
                  type="text"
                  value={updatedEntrega.presentacion}
                  onChange={(e) =>
                    setUpdatedEntrega({
                      ...updatedEntrega,
                      presentacion: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Fecha de Atención:
                <input
                  type="date"
                  value={updatedEntrega.fechaAtencion}
                  onChange={(e) =>
                    setUpdatedEntrega({
                      ...updatedEntrega,
                      fechaAtencion: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className={style.modalActions}>
              <button className={style.savebutton} onClick={saveChanges}>
                Guardar
              </button>
              <button className={style.cancelbutton} onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para eliminar */}
      {isDeleteModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <h3>Confirmar Eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar esta entrega?</p>
            <div className={style.modalActions}>
              <button className={style.deletebuttons} onClick={confirmDelete}>
                Confirmar
              </button>
              <button className={style.cancelbutton} onClick={closeDeleteModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Listasumplemento;
