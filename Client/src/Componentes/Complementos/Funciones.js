
// Funncion para formatear la fecha en "DD-MM-YYYY"
export const formatFecha = (dateString) => {
    let day, month, year;

    // Verificar si el formato es DD/MM/YYYY
    if (dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length !== 3) {
            throw new Error('Formato de fecha inválido. Debe ser DD/MM/YYYY');
        }
        day = parts[0].padStart(2, '0'); // Asegura que el día tenga dos dígitos
        month = parts[1].padStart(2, '0'); // Asegura que el mes tenga dos dígitos
        year = parts[2]; // El año ya debería estar en el formato correcto
    }
    // Verificar si el formato es YYYY-MM-DD o YYYY-MM-DD HH:mm:ss
    else if (dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
        const parts = dateString.split(' ')[0].split('-'); // Solo tomamos la parte de la fecha
        if (parts.length !== 3) {
            throw new Error('Formato de fecha inválido. Debe ser YYYY-MM-DD o YYYY-MM-DD HH:mm:ss');
        }
        year = parts[0];
        month = parts[1];
        day = parts[2];  
    }
    // Verificar si el formato es ISO 8601
    else if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
        const parts = dateString.split('T')[0].split('-'); // Obtener solo la parte de la fecha
        if (parts.length !== 3) {
            throw new Error('Formato de fecha inválido. Debe ser ISO 8601');
        }
        year = parts[0];
        month = parts[1];
        day = parts[2];
    } else {
        throw new Error('Formato de fecha desconocido. Debe ser DD/MM/YYYY, YYYY-MM-DD o ISO 8601');
    }

    // Retornar la fecha en el nuevo formato DD-MM-YYYY
    return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
}

// Otras funciones