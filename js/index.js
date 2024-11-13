// Importa las funciones desde aprendiz.js
import { obtenerAprendices, obtenerAprendizPorId } from "./utils/aprendiz.js";

// Función para mostrar datos en el HTML
function mostrarDatos(data) {
    const dataContainer = document.getElementById("data");
    dataContainer.innerHTML = JSON.stringify(data, null, 2);
}

// Evento para el formulario de búsqueda por ID
document.getElementById('buscarForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el envío del formulario
    const id = document.getElementById('aprendizId').value; // Obtiene el ID ingresado
    try {
        const aprendizData = await obtenerAprendizPorId(id); // Llama a la función desde aprendiz.js
        mostrarDatos(aprendizData); // Muestra los datos en el HTML
    } catch (error) {
        mostrarDatos({ error: 'No se pudo encontrar el aprendiz o hubo un problema con la solicitud.' });
    }
});
