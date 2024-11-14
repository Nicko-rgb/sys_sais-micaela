import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Componentes/Login/Login';
import Panel from './Componentes/Panel/Panel'
import PanelNiño from './Componentes/PanelPaciente/PanelNiño';
import DatosPaciente from './Componentes/PanelPaciente/DatosPaciente';
import Listas from './Componentes/Lista Paciente/Listas';
import PanelCita from './Componentes/CitaNiño/PanelCita';
import Personal from './Componentes/Personales/Personal';
import ResetPassword from "./Componentes/Login/ResetPassword/ResetPasssord"
import { AuthProvider } from './Componentes/Complementos/AuthContext';
import ContactAdmi from './Componentes/ContactAdministrador/contactAdmi';
import Restablecer from "./Componentes/Login/ResetPassword/Verificacion_Restablecer/Restablecer"
import Perfil from './Componentes/Perfil User/Perfil';
import Visitadomiciliaria from './Componentes/Her_Pacien_Ninho/Control/visitadomiciliaria';
import HistorialVisitas from './Componentes/Her_Pacien_Ninho/Control/historialvisitas';
import Control from './Componentes/Her_Pacien_Ninho/Control/control';
// import HistorialControles from './Componentes/Her_Pacien_Ninho/Control/historialcontroles';
// import Modalnavtop from './Componentes/Navegadores/Modalnavtop';
import Seguimientonutricional from './Componentes/Her_Pacien_Ninho/Control/seguimientonutricional';
import ListarControles from './Componentes/Her_Pacien_Ninho/Control/listarcontroles';
import ActualizarControles from './Componentes/Her_Pacien_Ninho/Control/actualizarControles';
import ExportExcel from './Componentes/Personales/Turnos/Excel';
import Entregasuplemento from './Componentes/Her_Pacien_Ninho/Suplemento/Entregasuplemento';








function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/panel" element={<Panel />} />
                        <Route path="/panel-niño" element={<PanelNiño />} />
                        <Route path="/panel/:historialClinico" element={<DatosPaciente />} />
                        <Route path="/list/:tipo" element={<Listas />} />
                        <Route path="/panel-cita" element={<PanelCita />} />
                        <Route path="/personal-salud" element={<Personal />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/contact-administrador" element={<ContactAdmi />} />
                        <Route path="/new-password/:token" element={<Restablecer />} />
                        <Route path="/perfil/:name/:id" element={<Perfil />} />
                        <Route path="/visita" element={<Visitadomiciliaria />} />
                        <Route path="/historialvisita" element={<HistorialVisitas />} />
                        <Route path="/control/:historialClinico" element={<Control/>} />
                        <Route path="/seguimiento" element={<Seguimientonutricional/>} />
                        <Route path="/listarcontroles" element={<ListarControles/>} />
                        <Route path="/actualizarcontroles" element={<ActualizarControles/>} />
                        {/* <Route path="/historialControles" element={<HistorialControles />} /> */}
                        {/* <Route path="/modal-salida" element={<Modalnavtop />} /> */}
                        <Route path="/exportar-turno" element={<ExportExcel />} />
                       <Route path= "/Entregasuplemento/:historialClinico" element ={<Entregasuplemento/>}/>
                        
                        
                    </Routes>
                </AuthProvider> 
            </BrowserRouter>
        </div>
    );
}

export default App;