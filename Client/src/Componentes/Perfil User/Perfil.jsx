import React from 'react'
import './perfil.css'
import EstadoSesion from '../Complementos/EstadoSesion'

const Perfil = () => {
    const {userPersonal, userId} = EstadoSesion()
  return (
    <div className='perfil-user'>
        <h1>Perfil</h1>
        <h2>Nombre de usuario: {userPersonal}</h2>
    </div>
  )
}


export default Perfil