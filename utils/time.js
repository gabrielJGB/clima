export const  formatearFecha = (fechaString) => {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    const fecha = new Date(fechaString);
    const hoy = new Date();
    
    
    const diferenciaMs = fecha.setHours(0,0,0,0) - hoy.setHours(0,0,0,0);
    const diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24);

    const diaSemana = diasSemana[fecha.getDay()];
    const diaMes = fecha.getDate();
    

    if (diferenciaDias === 0) {
        return `Hoy, ${diaSemana.toLowerCase()} ${diaMes}`;
    } else if (diferenciaDias === -1) {
        return `Ayer, ${diaSemana.toLowerCase()} ${diaMes}`;
    } else if (diferenciaDias === 1) {
        return `Mañana, ${diaSemana.toLowerCase()} ${diaMes}`;
    } else {
        return `${diaSemana} ${diaMes}`;
    }
}

export const formatHeaderDate = (dateString) => {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const dateParts = dateString.split("/");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; 
    const day = parseInt(dateParts[2], 10);

    const date = new Date(year, month, day);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const monthName = months[month];

    return `${dayOfWeek} ${day} de ${monthName} de ${year}`;
}


