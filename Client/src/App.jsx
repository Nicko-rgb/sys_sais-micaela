import './main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Componentes/Login/Login';
import Admision from './Componentes/Admision/Admision'
import ServicioNino from './Componentes/PanelPaciente/Ninho/ServicioNino';
import PanelPaciente from './Componentes/PanelPaciente/PanelPaciente';
import Listas from './Componentes/Lista Paciente/Listas';
import PanelCita from './Componentes/Citas/PanelCita';
import Cita1 from './Componentes/Citas/Citas1';
import Sectores from './Componentes/Personales/Sectores/Sectores';
import Personal from './Componentes/Personales/Personal';
import ResetPassword from "./Componentes/Login/ResetPassword/ResetPasssord"
import ContactAdmi from './Componentes/ContactAdministrador/contactAdmi';
import Restablecer from "./Componentes/Login/ResetPassword/Verificacion_Restablecer/Restablecer"
import Perfil from './Componentes/Personales/Perfil Personal/Perfil';
import ExportExcel from './Componentes/Personales/Turnos/Excel';

// import Control from './Componentes/Her_Pacien_Ninho/Control/control';
// import Seguimientonutricional from './Componentes/Her_Pacien_Ninho/Control/seguimientonutricional';
// import HistorialControles from './Componentes/Her_Pacien_Ninho/Control/historialcontroles';
// import ActualizarControles from './Componentes/Her_Pacien_Ninho/Control/actualizarControles';
// import VisitaDomiciliaria from './Componentes/Her_Pacien_Ninho/Control/visitadomiciliaria';
// import HistorialVisitas from './Componentes/Her_Pacien_Ninho/Control/historialvisitas';

<<<<<<< HEAD
import TamizajeDozaje from './Componentes/Her_Pacien_Ninho/Tamizaje/TamizajeDozaje';
import HistorialTamizaje from './Componentes/Her_Pacien_Ninho/Tamizaje/HistorialTamizaje';
import Entregasuplemento from './Componentes/Her_Pacien_Ninho/Suplemento/Entregasuplemento';
import ListaSuplemento from './Componentes/Her_Pacien_Ninho/Suplemento/Listasumplemento';
import ControlList from './Componentes/Her_Pacien_Ninho/ControlOpcionesD/ControlList';
=======
// import Entregasuplemento from './Componentes/Her_Pacien_Ninho/Suplemento/Entregasuplemento';
// import ListaSuplemento from './Componentes/Her_Pacien_Ninho/Suplemento/Listasumplemento';
// import Actualizarsuplemento from './Componentes/Her_Pacien_Ninho/Suplemento/actualizarsuplemento';
>>>>>>> main

// import ListarControles from './Componentes/Her_Pacien_Ninho/Control/listarcontroles';

// import EvaluacionPsicomotor from './Componentes/Her_Pacien_Ninho/Psicomotor/EvaluacionPsicomotor'
// import HistorialPsicomotor from './Componentes/Her_Pacien_Ninho/Psicomotor/HistorialPsicomotor';

// import TamizajeDozaje from './Componentes/Her_Pacien_Ninho/Tamizaje/TamizajeDozaje';
// import HistorialTamizaje from './Componentes/Her_Pacien_Ninho/Tamizaje/HistorialTamizaje';

// import VacunarNino from './Componentes/Her_Pacien_Ninho/vacuna/VacunarNino'
// import HistorialVacunas from './Componentes/Her_Pacien_Ninho/vacuna/HistorialVacunas';


function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
<<<<<<< HEAD
                    <Route path="/controlList" element={<ControlList />} />
                    <Route path="/panel" element={<Panel />} />
                    <Route path="/panel-niño" element={<PanelNiño />} />
                    <Route path="/panel/:historialClinico" element={<DatosPaciente />} />
=======
                    <Route path="/admision" element={<Admision />} />
                    <Route path="/servicios-niño" element={<ServicioNino />} />
                    <Route path="/panel/:historialClinico" element={<PanelPaciente />} />
>>>>>>> main
                    <Route path="/list/:tipo" element={<Listas />} />
                    <Route path="/panel-cita" element={<PanelCita />} />
                    <Route path='/cita-niño/:especialidad' element={<Cita1 />} />
                    <Route path="/personal-salud" element={<Personal />} />
                    <Route path="/maps-sais" element={<Sectores />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/contact-administrador" element={<ContactAdmi />} />
                    <Route path="/new-password/:token" element={<Restablecer />} />
                    <Route path="/perfil/:name/:id" element={<Perfil />} />
                    <Route path="/exportar-turno" element={<ExportExcel />} />
                    
                    {/* <Route path="/visita/:historialClinico" element={<VisitaDomiciliaria />} />
                    <Route path="/historialvisita/:id_paciente" element={<HistorialVisitas />} />
                    <Route path="/control/:historialClinico" element={<Control />} />
                    <Route path="/seguimiento" element={<Seguimientonutricional />} />
                    <Route path="/listarcontroles" element={<ListarControles />} />
                    <Route path="/actualizarcontroles/:historialClinico" element={<ActualizarControles />} />
                    <Route path="/control/:historialClinico" element={<Control />} />
                    <Route path="/seguimiento/:historialClinico" element={<Seguimientonutricional />} />
                    <Route path="/historialControles/:historialClinico" element={<HistorialControles />} />
                    <Route path="/listarcontroles" element={<ListarControles />} />
                    <Route path="/actualizarcontroles" element={<ActualizarControles />} /> */}
                    {/* <Route path="/historialControles" element={<HistorialControles />} /> */}
                    {/* <Route path="/modal-salida" element={<Modalnavtop />} /> */}
                    {/* <Route path="/tamizaje/:historialClinico" element={<TamizajeDozaje />} />
                    <Route path="/historialtamizaje/:historialClinico" element={<HistorialTamizaje />} />
                    <Route path="/Entregasuplementos/:historialClinico" element={<Entregasuplemento />} />
                    <Route path="/Listasuplementos/:historialClinico" element={<ListaSuplemento />} />
                    <Route path="/Actualizarsuplemento/:historialClinico" element={<Actualizarsuplemento />} />
                    <Route path="/EvaluacionPsicomotor/:historialClinico" element={<EvaluacionPsicomotor />} />
                    <Route path="/HistorialPsicomotor/:historialClinico" element={<HistorialPsicomotor />} />
                    <Route path="/VacunarNino/:historialClinico" element={<VacunarNino />} />
                    <Route path="/HistorialVacunas/:historialClinico" element={<HistorialVacunas />} /> */}

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;