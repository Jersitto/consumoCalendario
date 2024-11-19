// Importa las funciones desde aprendiz.js
import { obtenerAprendices, obtenerAprendizPorId } from "./utils/aprendiz.js";

// Función para mostrar datos en el HTML
function mostrarDatos(data) {
    const tableBody = document.getElementById("tableBody");
    
    if (!tableBody) {
        console.error("No se encontró el elemento con id 'tableBody'.");
        return;
    }
    
    // Limpia el contenido previo de la tabla
    tableBody.innerHTML = "";

    if (data.error) {
        // Muestra un mensaje si hay un error
        const row = `<tr><td colspan="7">${data.error}</td></tr>`;
        tableBody.innerHTML = row;
        return;
    }

    // Itera sobre los datos y los agrega a la tabla
    data.forEach(aprendiz => {
        const row = `
            <tr>
                <td>${aprendiz.id}</td>
                <td>${aprendiz.nombre}</td>
                <td>${aprendiz.documento}</td>
                <td>${aprendiz.programa}</td>
                <td>${aprendiz.centro}</td>
                <td>${aprendiz.regional}</td>
                <td>${aprendiz.rh}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}



// Evento para el formulario de búsqueda por ID
document.getElementById('buscarForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el envío del formulario
    const id = document.getElementById('aprendizId').value.trim(); // Obtiene el valor y elimina espacios en blanco
    if (!id) {
        alert("Por favor ingrese un ID válido.");
        return; // Sale si el ID está vacío
    }
    try {
        const aprendizData = await obtenerAprendizPorId(id);
        mostrarDatos([aprendizData]); // Envuelve el resultado en un array
    } catch (error) {
        mostrarDatos({ error: 'No se pudo encontrar el aprendiz o hubo un problema con la solicitud.' });
    }
});


document.getElementById('listar').addEventListener('click', async ()=>{
    try {
        const aprendicesData = await obtenerAprendices(); // Llama a la función desde aprendiz.js
        mostrarDatos(aprendicesData); // Muestra los datos en el HTML
    } catch (error) {
        mostrarDatos({ error: 'No se pudo encontrar los aprendices o hubo un problema con la solicitud.' });
    }
})

