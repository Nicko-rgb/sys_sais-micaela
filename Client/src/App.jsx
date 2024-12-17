import './main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Componentes/Login/Login';
import Panel from './Componentes/Panel/Panel'
import PanelNiño from './Componentes/PanelPaciente/PanelNiño';
import DatosPaciente from './Componentes/PanelPaciente/DatosPaciente';
import Listas from './Componentes/Lista Paciente/Listas';
import PanelCita from './Componentes/CitaNiño/PanelCita';
import Cita1 from './Componentes/CitaNiño/Citas1';
import Sectores from './Componentes/Personales/Sectores/Sectores';
import Personal from './Componentes/Personales/Personal';
import ResetPassword from "./Componentes/Login/ResetPassword/ResetPasssord"
import ContactAdmi from './Componentes/ContactAdministrador/contactAdmi';
import Restablecer from "./Componentes/Login/ResetPassword/Verificacion_Restablecer/Restablecer"
import Perfil from './Componentes/Perfil User/Perfil';
import VisitaDomiciliaria from './Componentes/Her_Pacien_Ninho/Control/visitadomiciliaria';
import HistorialVisitas from './Componentes/Her_Pacien_Ninho/Control/historialvisitas';
import Control from './Componentes/Her_Pacien_Ninho/Control/control';
import Seguimientonutricional from './Componentes/Her_Pacien_Ninho/Control/seguimientonutricional';
import ListarControles from './Componentes/Her_Pacien_Ninho/Control/listarcontroles';
import ActualizarControles from './Componentes/Her_Pacien_Ninho/Control/actualizarControles';
import ExportExcel from './Componentes/Personales/Turnos/Excel';

import Actualizarsuplemento from './Componentes/Her_Pacien_Ninho/Suplemento/actualizarsuplemento';
import EvaluacionPsicomotor from './Componentes/Her_Pacien_Ninho/Psicomotor/EvaluacionPsicomotor'
import HistorialPsicomotor from './Componentes/Her_Pacien_Ninho/Psicomotor/HistorialPsicomotor';

import TamizajeDozaje from './Componentes/Her_Pacien_Ninho/Tamizaje/TamizajeDozaje';
import HistorialTamizaje from './Componentes/Her_Pacien_Ninho/Tamizaje/HistorialTamizaje';
import Entregasuplemento from './Componentes/Her_Pacien_Ninho/Suplemento/Entregasuplemento';
import ListaSuplemento from './Componentes/Her_Pacien_Ninho/Suplemento/Listasumplemento';

import VacunarNino from './Componentes/Her_Pacien_Ninho/vacuna/VacunarNino'


function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/panel" element={<Panel />} />
                    <Route path="/panel-niño" element={<PanelNiño />} />
                    <Route path="/panel/:historialClinico" element={<DatosPaciente />} />
                    <Route path="/list/:tipo" element={<Listas />} />
                    <Route path="/panel-cita" element={<PanelCita />} />
                    <Route path='/cita-niño/:especialidad' element={<Cita1 />} />
                    <Route path="/personal-salud" element={<Personal />} />
                    <Route path="/maps-sais" element={<Sectores />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/contact-administrador" element={<ContactAdmi />} />
                    <Route path="/new-password/:token" element={<Restablecer />} />
                    <Route path="/perfil/:name/:id" element={<Perfil />} />
                    <Route path="/visita/:id" element={<VisitaDomiciliaria />} />
                    <Route path="/historialvisita/:id_paciente" element={<HistorialVisitas />} />
                    <Route path="/control/:historialClinico" element={<Control />} />
                    <Route path="/seguimiento" element={<Seguimientonutricional />} />
                    <Route path="/listarcontroles" element={<ListarControles />} />
                    <Route path="/actualizarcontroles/:historialClinico" element={<ActualizarControles />} />
                    <Route path="/control/:historialClinico" element={<Control />} />
                    <Route path="/seguimiento/:historialClinico" element={<Seguimientonutricional />} />
                    <Route path="/listarcontroles" element={<ListarControles />} />
                    <Route path="/actualizarcontroles" element={<ActualizarControles />} />
                    {/* <Route path="/historialControles" element={<HistorialControles />} /> */}
                    {/* <Route path="/modal-salida" element={<Modalnavtop />} /> */}
                    <Route path="/exportar-turno" element={<ExportExcel />} />
                    <Route path="/tamizaje/:historialClinico" element={<TamizajeDozaje />} />
                    <Route path="/historialtamizaje/:historialClinico" element={<HistorialTamizaje />} />
                    <Route path="/Entregasuplementos/:historialClinico" element={<Entregasuplemento />} />
                    <Route path="/Listasuplementos/:historialClinico" element={<ListaSuplemento />} />
                    <Route path="/Actualizarsuplemento/:historialClinico" element={<Actualizarsuplemento />} />
                    <Route path="/EvaluacionPsicomotor/:historialClinico" element={<EvaluacionPsicomotor />} />
                    <Route path="/HistorialPsicomotor/:historialClinico" element={<HistorialPsicomotor />} />
                    <Route path="/VacunarNino/:historialClinico" element={<VacunarNino />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;