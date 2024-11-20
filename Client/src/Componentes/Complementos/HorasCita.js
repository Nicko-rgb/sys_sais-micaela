// Horarios de atención por especialidad
import { TbNurse } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdPsychology } from "react-icons/md";
import { FaTooth, FaCalendarAlt, FaBaby } from 'react-icons/fa';
import { LiaNutritionix } from "react-icons/lia";

const HorasCita = {
    Enfermería: {
        especialidad: 'Enfermería',
        icono: TbNurse,
        horarios: {
            mañana: [
                { hora: '07:30 - 08:15' },
                { hora: '08:15 - 09:00' },
                { hora: '09:00 - 09:45' },
                { hora: '09:45 - 10:30' },
                { hora: '10:30 - 11:15' },
                { hora: '11:15 - 12:00' },
                { AtencionEspecial: [
                        {hora: '12:00 - 12:30'},
                        {hora: '12:30 - 13:00'}
                    ] 
                }
            ],
            tarde: [
                { receso: '13:00 - 14:00' },
                { hora: '14:00 - 14:45' },
                { hora: '14:45 - 15:30' },
                { hora: '15:30 - 16:15' },
                { hora: '16:15 - 17:00' },
                { hora: '17:00 - 17:45' },
                { hora: '17:45 - 18:15' }
            ]
        }
    },
    
    Medicina: {
        especialidad: 'Medicina',
        icono: FaUserDoctor,
        horarios: {
            mañana: [
                { hora: '7:40 - 8:00' },
                { hora: '8:00 - 8:20' },
                { hora: '8:20 - 8:40' },
                { hora: '8:40 - 9:00' },
                { hora: '9:00 - 9:20' },
                { hora: '9:20 - 9:40' },
                { hora: '9:40 - 10:00' },
                { hora: '10:20 - 10:40' },
                { hora: '10:40 - 11:00' },
                { hora: '11:00 - 11:20' },
                { hora: '11:20 - 11:40' },
                {
                    AtencionEspecial: [
                        { hora: '11:40 - 12:00', },
                        { hora: '12:00 - 12:20', },
                        { hora: '12:20 - 12:30' },
                    ] 
                }
            ],
            tarde: [
                { receso: '12:30 - 13:40' },
                { hora: '13:40 - 14:00' },
                { hora: '14:00 - 14:20' },
                { hora: '14:20 - 14:40' },
                { hora: '14:40 - 15:00' },
                { hora: '15:00 - 15:20' },
                { hora: '15:20 - 15:40' },
                { hora: '15:40 - 16:00' },
                {
                    AtencionEspecial: [
                        { hora: '16:00 - 16:20', },
                        { hora: '16:20 - 16:40', },
                        { hora: '16:40 - 17:00', }
                    ] 
                }
            ]
        },
    },
    
    Nutrición: {
        especialidad: 'Nutrición',
        icono: LiaNutritionix,
        horarios: {
            mañana: [
                { hora: '08:00 - 08:30' },
                { hora: '08:30 - 09:00' },
                { hora: '09:00 - 09:30' },
                { hora: '09:30 - 10:00' },
                { hora: '10:00 - 10:30' },
                { hora: '10:30 - 11:00' },
                { hora: '11:00 - 11:30' },
                { hora: '11:30 - 12:00' },
                { hora: '12:00 - 12:30' }
            ],
            tarde: [
                { receso: '12:30 - 14:00' },
                { hora: '14:00 - 14:30' },
                { hora: '14:30 - 15:00' },
                { hora: '15:00 - 15:30' },
                { hora: '15:30 - 16:00' },
                { hora: '16:00 - 16:30 ' },
                { hora: '16:30 - 17:00 ' },
            ]
        }
    },

    Obstetricia_CPN: {
        especialidad: 'Obstetricia_CPN',
        icono: FaBaby,
        horarios: {
            mañana: [
                {
                    AtencionEspecial: [
                        { hora: '07:30 - 08:15' },
                        { hora: '08:15 - 09:00' },
                    ]
                },
                { hora: '09:00 - 09:45' },
                { hora: '09:45 - 10:30' },
                { hora: '10:30 - 11:15' },
                { hora: '11:15 - 12:00' },
                {
                    AtencionEspecial: [
                        { hora: '12:00 - 12:30' },
                        { hora: '12:30 - 13:00' },
                    ] 
                }
            ],
            tarde: [
                { receso: '13:00 - 14:00' },
                { hora: '14:00 - 14:45' },
                { hora: '14:45 - 15:30' },
                { hora: '15:30 - 16:15' },
                { hora: '16:15 - 17:00' },
                { hora: '17:00 - 17:45' },
                {
                    AtencionEspecial: [
                        { hora: '17:45 - 18:15' },
                    ]
                }
            ] 
        }
    },
    
    Odontología: {
        especialidad: 'Odontología',
        icono: FaTooth,
        horarios:{
            mañana: [
                { hora: '08:00 - 08:30' },
                { hora: '08:30 - 09:00' },
                { hora: '09:00 - 09:30' },
                { hora: '09:30 - 10:00' },
                { hora: '10:00 - 10:30' },
                { hora: '10:30 - 11:00' },
                { hora: '11:00 - 11:30' },
                { hora: '11:30 - 12:00' },
            ], 
            tarde: [
                { receso: '12:00 - 14:00' },
                { hora: '14:00 - 14:30' },
                { hora: '14:30 - 15:00' },
                { hora: '15:00 - 15:30' },
                { hora: '15:30 - 16:00' },
                { hora: '16:00 - 16:30 ' },
                { hora: '16:30 - 17:00 ' },
                { hora: '17:00 - 17:30 ' },
                { hora: '17:30 - 18:00 ' }
            ] 
        }
    },

    Planificación: {
        especialidad: 'Planificación',
        icono: FaCalendarAlt,
        horarios: {
            mañana: [
                { hora: '07:45 - 08:05' },
                { hora: '08:05 - 08:25' },
                { hora: '08:25 - 08:45' },
                { hora: '08:45 - 09:05' },
                { hora: '09:05 - 09:25' },
                { hora: '09:25 - 09:45' },
                { hora: '09:45 - 10:05' },
                { hora: '10:05 - 10:25' },
                { hora: '10:25 - 10:45' },
                { hora: '10:45 - 11:05' },
                { hora: '11:05 - 11:25' },
                { hora: '11:25 - 11:45' },
                { hora: '11:45 - 12:05' },
            ],
            tarde: [
                { receso: '12:05 - 14:00' },
                { hora: '14:00 - 14:30' },
                { hora: '14:30 - 15:00' },
                { hora: '15:00 - 15:30' },
                { hora: '15:30 - 16:00' },
                { hora: '16:00 - 16:30 ' },
                { hora: '16:30 - 17:00 ' },
                { hora: '17:00 - 17:30 ' },
                { hora: '17:30 - 18:00 ' },
            ] 
        }
    },

    Psicología: {
        especialidad: 'Psicología',
        icono: MdPsychology,
        horarios: {
            mañana: [
                { hora: '08:00 - 08:30' },
                { hora: '08:30 - 09:00' },
                { hora: '09:00 - 09:30' },
                { hora: '09:30 - 10:00' },
                { hora: '10:00 - 10:30' },
                { hora: '10:30 - 11:00' },
                { hora: '11:00 - 11:30' },
                { hora: '11:30 - 12:00' },
            ],
            tarde: [
                { receso: '12:00 - 14:00' },
                { hora: '14:00 - 14:30' },
                { hora: '14:30 - 15:00' },
                { hora: '15:00 - 15:30' },
                { hora: '15:30 - 16:00' },
                { hora: '16:00 - 16:30 ' },
                { hora: '16:30 - 17:00 ' },
                { hora: '17:00 - 17:30 ' },
                { hora: '17:30 - 18:00 ' },
            ] 
        }
    }

};

export default HorasCita;