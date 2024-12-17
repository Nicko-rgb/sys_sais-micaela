import React, { useState } from 'react';
import styles from './BloqDesbloqDia.module.css'; // Importar el módulo CSS

const BloqDesbloqDia = ({ isModalOpen, modalAction, selectedHorario, handleModalAction, closeModal, formatTime }) => {
    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

    // Manejar la acción del modal y mostrar el mensaje de éxito
    const handleActionWithSuccess = async () => {
        await handleModalAction(); // Ejecutar la acción (bloquear/desbloquear)
        setSuccessMessage(
            modalAction === 'block' 
                ? 'La hora ha sido bloqueada exitosamente.' 
                : 'La hora ha sido desbloqueada exitosamente.'
        );
        setTimeout(() => {
            setSuccessMessage(''); // Limpiar el mensaje después de 2 segundos
            closeModal(); // Cerrar el modal
        }, 1500); // 1.5 segundo de demora...
    };

    return (
        <div>
            {/* Modal de confirmación */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>
                            {modalAction === 'block' ? '¿Estás seguro de que deseas bloquear esta hora?' : '¿Estás seguro de que deseas desbloquear esta hora?'}
                        </h2>
                        <p>{`Horario: ${formatTime(selectedHorario.hora_inicio)} - ${formatTime(selectedHorario.hora_fin)}`}</p>
                        <div className={styles.modalActions}>
                            <button
                                className={styles.button}
                                onClick={handleActionWithSuccess}
                            >
                                {modalAction === 'block' ? 'Bloquear' : 'Desbloquear'}
                            </button>
                            <button
                                className={`${styles.button} ${styles.buttonCancel}`}
                                onClick={closeModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mensaje de éxito */}
            {successMessage && (
                <div className={`${styles.modalOverlay} ${styles.successMessageOverlay}`}>
                    <div className={styles.modalContent}>
                        <h3 className={styles.successMessage}>{successMessage}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BloqDesbloqDia;