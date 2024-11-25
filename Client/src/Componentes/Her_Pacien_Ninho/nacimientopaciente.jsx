import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./editarpas.css";

const NacimientoPaciente = ({ pacienteId, onClose }) => {
    const [birthData, setBirthData] = useState({
        id_paciente: pacienteId,
        edad_gestacional: "",
        dni: "",
        peso: "",
        talla: "",
        perimetro_cefalico: "",
        id_etnia: null, // Cambia a null en lugar de ""
        id_financiamiento: "",
        codigo_sis: "",
        id_programa: "",
    });
    // añadir un estado de generacion de codigo
    const [codigoSis, setCodigoSis] = useState("");
    // funcion de cambiar los cambios del codio
    const handleCodigoSisChange = (e) => {
        const { value } = e.target;
        setCodigoSis(value);
    }


    const [etnias, setEtnias] = useState([]);
    const [financiamientos, setFinanciamientos] = useState([]);
    const [programas, setProgramas] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Controlar si se está editando
    // EFECTO PARA LISTAR LOS DATOS DEL PACIENTE 
    // Generate the code automaticamente
    const generateCodigoSis = (idFinanciamiento, dni) => {
        return `340-${idFinanciamiento}-${dni}`;
    };
    useEffect(() => {
        if (birthData.id_financiamiento && birthData.dni) {
            const generatedCode = generateCodigoSis(birthData.id_financiamiento, birthData.dni);
            setCodigoSis(generatedCode);
        }
    }, [birthData.id_financiamiento, birthData.dni]);

    // Este useEffect carga datos de etnias, financiamientos y programas, además de los datos de nacimiento si pacienteId existe.
    useEffect(() => {
        fetchData();
        if (pacienteId) {
            fetchNacimientoData();
        }
    }, [pacienteId]);

    // Carga datos de selectores
    const fetchData = async () => {
        try {
            const resFinanciamiento = await fetch(
                "http://localhost:5000/api/financiamientos"
            );
            const financiamientosData = await resFinanciamiento.json();
            setFinanciamientos(financiamientosData);

            const resEtnia = await fetch("http://localhost:5000/api/etnias");
            const etniasData = await resEtnia.json();
            setEtnias(etniasData);

            const resPrograma = await fetch("http://localhost:5000/api/programas");
            const programasData = await resPrograma.json();
            setProgramas(programasData);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    };

    // Carga datos de nacimiento para edición si pacienteId existe
    const fetchNacimientoData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/nacimiento/${pacienteId}`
            );
            console.log(response.data); // Verifica la respuesta aquí
            if (response.data) {
                setBirthData({
                    id_paciente: response.data.ID_PACIENTE,
                    edad_gestacional: response.data.EDAD_GESTACIONAL,
                    peso: response.data.PESO,
                    talla: response.data.TALLA,
                    perimetro_cefalico: response.data.PERIMETRO_CEFALICO,
                    id_etnia: response.data.ID_ETNIA,
                    id_financiamiento: response.data.ID_FINANCIAMENTO,
                    codigo_sis: response.data.codigo_sis,
                    id_programa: response.data.ID_PROGRAMA
                });
                setIsEditing(true); // Si ya hay datos, es una edición
            }
        } catch (error) {
            console.error("Error al cargar los datos de nacimiento:", error);
        }
    };

    // Actualiza el estado de los datos de nacimiento cuando cambia el input
    const handleBirthDataChange = (e) => {
        const { name, value } = e.target;
        console.log(`Campo cambiado: ${name}, Nuevo valor: ${value}`); // Verifica que el evento se dispare correctamente
        setBirthData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Envía los datos al servidor, ya sea para crear o editar
    const handleBirthDataSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos a enviar:", birthData); // Verifica los datos que se envían
        try {
            if (isEditing) {
                const response = await axios.put(
                    `http://localhost:5000/api/nacimiento/${pacienteId}`,
                    birthData
                );
                console.log("Datos actualizados exitosamente", response.data);
            } else {
                const response = await axios.post(
                    "http://localhost:5000/api/nacimiento",
                    birthData
                )
            }
            alert("Datos guardados correctamente");
            onClose(); // Cerrar el modal o componente después de guardar
        } catch (error) {
            console.error("Error:", error);
            alert(error.response?.data?.message || "Error al guardar los datos");
        }
    };

    return (
        <section className="container-editar-nacimiento section-active">
            <h3>DATOS DE NACIMIENTO</h3>
            <form onSubmit={handleBirthDataSubmit}>
                <div className="datos-cortos">
                    <label>
                        Edad Gestacional:
                        <input
                            type="text"
                            name="edad_gestacional"
                            value={birthData.edad_gestacional}
                            onChange={handleBirthDataChange}
                            onKeyDown={(e) => {
                                if (
                                    !/^\d$/.test(e.key) &&
                                    e.key !== "Backspace" &&
                                    e.key !== "Tab" &&
                                    e.key !== "Enter" &&
                                    e.key !== "."
                                ) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </label>
                    <label>
                        Peso:
                        <input
                            type="text"
                            name="peso"
                            value={birthData.peso}
                            onChange={handleBirthDataChange}
                            onKeyDown={(e) => {
                                if (
                                    !/^\d$/.test(e.key) &&
                                    e.key !== "Backspace" &&
                                    e.key !== "Tab" &&
                                    e.key !== "Enter" &&
                                    e.key !== "."
                                ) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </label>
                    <label>
                        Talla:
                        <input
                            type="text"
                            name="talla"
                            value={birthData.talla}
                            onChange={handleBirthDataChange}
                            onKeyDown={(e) => {
                                if (
                                    !/^\d$/.test(e.key) &&
                                    e.key !== "Backspace" &&
                                    e.key !== "Tab" &&
                                    e.key !== "Enter" &&
                                    e.key !== "."
                                ) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </label>
                    <label>
                        P. Cefálico:
                        <input
                            type="text"
                            name="perimetro_cefalico"
                            value={birthData.perimetro_cefalico}
                            onChange={handleBirthDataChange}
                            onKeyDown={(e) => {
                                if (
                                    !/^\d$/.test(e.key) &&
                                    e.key !== "Backspace" &&
                                    e.key !== "Tab" &&
                                    e.key !== "Enter" &&
                                    e.key !== "."
                                ) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </label>
                </div>

                <div className="datos-cortos">
                    <label>
                        Etnia:
                        {etnias.length > 0 && (
                            <Select
                                name="id_etnia"
                                value={
                                    etnias.find((etnia) => etnia.id_etnia === birthData.id_etnia)
                                        ? {
                                            value: birthData.id_etnia,
                                            label: etnias.find(
                                                (etnia) => etnia.id_etnia === birthData.id_etnia
                                            ).nombre_etnia,
                                        }
                                        : null
                                }
                                onChange={(selectedOption) =>
                                    handleBirthDataChange({
                                        target: { name: "id_etnia", value: selectedOption.value },
                                    })
                                }
                                options={etnias.map((etnia) => ({
                                    value: etnia.id_etnia,
                                    label: etnia.nombre_etnia,
                                }))}
                                placeholder="Seleccione una etnia"
                                isSearchable={true}
                            />
                        )}
                    </label>
                </div>

                <div className="datos-cortos">
                    <label>
                        Financiamiento:
                        <Select
                            name="id_financiamiento"
                            value={
                                financiamientos.find(
                                    (f) => f.id_financiamiento === birthData.id_financiamiento
                                )
                                    ? {
                                        value: birthData.id_financiamiento,
                                        label: financiamientos.find(
                                            (f) =>
                                                f.id_financiamiento === birthData.id_financiamiento
                                        ).nombre_financiamiento,
                                    }
                                    : null
                            }
                            onChange={(selectedOption) =>
                                handleBirthDataChange({
                                    target: {
                                        name: "id_financiamiento",
                                        value: selectedOption.value,
                                    },
                                })
                            }
                            options={financiamientos.map((f) => ({
                                value: f.id_financiamiento,
                                label: f.nombre_financiamiento,
                            }))}
                            placeholder="Seleccione un financiamiento"
                            isSearchable={true}
                        />
                    </label>

                    <label>
                        Código SIS:
                        <input
                            type="text"
                            name="codigo_sis"
                            value={codigoSis}
                            onChange={handleCodigoSisChange}
                        />
                    </label>
                </div>

                <div>
                    <label className="datos-cortos">
                        Programa:
                        <Select
                            name="id_programa"
                            value={
                                programas.find((p) => p.id_programa === birthData.id_programa)
                                    ? {
                                        value: birthData.id_programa,
                                        label: programas.find(
                                            (p) => p.id_programa === birthData.id_programa
                                        ).nombre_programa,
                                    }
                                    : null
                            }
                            onChange={(selectedOption) =>
                                handleBirthDataChange({
                                    target: { name: "id_programa", value: selectedOption.value },
                                })
                            }
                            options={programas.map((p) => ({
                                value: p.id_programa,
                                label: p.nombre_programa,
                            }))}
                            placeholder="Seleccione un programa"
                            isSearchable={true}
                        />
                    </label>
                </div>

                <div className="box-botones">
                    <button className="save" type="submit">Guardar Cambios</button>
                    <button className="cancel" type="button" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </form>
        </section>
    );
};

export default NacimientoPaciente;