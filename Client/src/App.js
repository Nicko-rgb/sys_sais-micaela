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
// import Modalnavtop from './Componentes/Navegadores/Modalnavtop';
import Cita1 from './Componentes/CitaNiño/Citas1';

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
                        <Route path="/citan/:id" element={<Cita1 />} />
                        {/* <Route path="/modal-salida" element={<Modalnavtop />} /> */}
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;