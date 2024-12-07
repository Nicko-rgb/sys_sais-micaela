import React, { useEffect } from "react";
import styles from "./ModalExito.module.css"; // Importa los estilos como módulo

const ModalExito = ({ mensaje, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Llama a la función de cierre después de 1 segundo
        }, 1000);

        return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }, [onClose]);

    return (
        <div className={styles["modal-overlay"]}>
            <div className={styles["modal-contenido"]}>
                <p>{mensaje}</p>
            </div>
        </div>
    );
};

export default ModalExito;
