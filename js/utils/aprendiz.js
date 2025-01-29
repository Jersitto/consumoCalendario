
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
        const response = await fetch(`${url}?accion=actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                nombre,
                documento,
                programa,
                centro,
                regional,
                rh
            })
        });
        
        if (!response.ok) {
            throw new Error("Ocurrió un error al actualizar el aprendiz");
        }
        return await response.json(); // Devuelve los datos
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
//  obtenerAprendices().then(console.log).catch(console.error); // Prueba de la función

// Exporta las funciones para que puedan ser usadas en index.js
export { obtenerAprendices, obtenerAprendizPorId, actualizarAprendiz };
