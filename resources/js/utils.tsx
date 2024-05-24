const parseAccountType = (type: string) => {
    switch (type) {
        case "recruiter":
            return "Reclutador";
        case "applicant":
            return "Postulante";
        default:
            return "Desconocido";
    }
};

const parseApplicationStatus = (status: string) => {
    switch (status) {
        case "accepted":
            return "Aceptado";
        case "rejected":
            return "Rechazado";
        case "pending":
            return "Pendiente";
        default:
            return "Desconocido";
    }
};

const APP_DOMAIN = "https://jobber-react-tawny.vercel.app/";
//const APP_DOMAIN = "http://localhost:8000";

export { parseAccountType, parseApplicationStatus, APP_DOMAIN };
