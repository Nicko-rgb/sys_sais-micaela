import React from "react";
import Listasuplemento from "./Listasuplemento";

function ListaSuplementosPage() {
  const suplementosEntregados = JSON.parse(localStorage.getItem("suplementosEntregados")) || [];

  return (
    <div>
      <h1>Lista de Suplementos Entregados</h1>
      <Listasuplemento
        suplementos={suplementosEntregados}
        editarSuplemento={() => {}}
        eliminarSuplemento={() => {}}
      />
    </div>
  );
}

export default ListaSuplementosPage;
