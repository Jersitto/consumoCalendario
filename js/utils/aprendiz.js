
const url = "http://localhost/API/Controlador/aprendiz.php";

// Función para obtener todos los aprendices
async function obtenerAprendices() {
    try {
        const response = await fetch(`${url}?accion=listar`);
        if (!response.ok) {
            throw new Error("Ocurrió un error al solicitar los aprendices");
        }
        return await response.json(); // Devuelve los datos
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Función para obtener un aprendiz por ID
async function obtenerAprendizPorId(id) {
    try {
        const response = await fetch(`${url}?accion=leer&id=${id}`);
        if (!response.ok) {
            throw new Error("Ocurrió un error al solicitar el aprendiz");
        }
        return await response.json(); // Devuelve los datos
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function actualizarAprendiz(id, nombre, documento, programa, centro, regional, rh) {
    try {
        const datos = {
            id: Number(id),  // Asegurar que el ID es un número
            nombre,
            documento,
            programa,
            centro,
            regional,
            rh
        };

        console.log("Enviando datos a la API:", datos);

        const response = await fetch(`${url}?accion=actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const responseText = await response.text(); // Captura la respuesta cruda de la API
        console.log("Respuesta cruda de la API:", responseText);

        if (!response.ok) {
            throw new Error(`Error en la API: ${responseText}`);
        }

        return JSON.parse(responseText); // Convertir a JSON
    } catch (error) {
        console.error("Error en la solicitud fetch:", error);
        throw error;
    }
}


//  obtenerAprendices().then(console.log).catch(console.error); // Prueba de la función

// Exporta las funciones para que puedan ser usadas en index.js
export { obtenerAprendices, obtenerAprendizPorId, actualizarAprendiz };
