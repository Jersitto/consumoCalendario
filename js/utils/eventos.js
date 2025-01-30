// traer los enventos   
const url = "http://localhost/API/Controlador/evento.php";

// Función para obtener todos los eventos
async function obtenerEventos() {
    try {
        const response = await fetch(`${url}?accion=listar`);
        if (!response.ok) {
            throw new Error("Ocurrió un error al solicitar los eventos");
        }
        return await response.json(); // Devuelve los datos
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}




export { obtenerEventos };

