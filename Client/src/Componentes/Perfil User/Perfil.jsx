
import React from "react";
import EstadoSesion from "../Complementos/EstadoSesion";
import AdminPanel from "../Login/TiposUsuarios/admin/admi";
import JefePanel from "../Login/TiposUsuarios/jefe/jefe"
import PersonalPanel from "../Login/TiposUsuarios/responsable/responsable";;

const Perfil = () => {
  const { userPersonal, userId, tipoUser } = EstadoSesion();

  const renderPanel = () => {
    switch (tipoUser) {
      case "Admin":
        return <AdminPanel userId={userId} />;
      case "Jefe":
        return <JefePanel userId={userId} />;
      case "Responsable":
        return <PersonalPanel userId={userId} />;
      default:
        return <p>Tipo de usuario no reconocido</p>;
    }
  };

  return (
    <div className="perfil-user">
      <h2>Nombre de usuario: {userPersonal}</h2>
      <h2>Tipo de usuario: {tipoUser}</h2>
      <main>{renderPanel()}</main>
    </div>
  );
};

export default Perfil;
