// Importa las funciones desde aprendiz.js
import { obtenerAprendices, obtenerAprendizPorId, actualizarAprendiz } from "./utils/aprendiz.js";

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

function mostrarId(data) {
    const tableBodyBusqueda = document.getElementById("tableBodyBusqueda");
    const busquedaAprendiz = document.getElementById("busquedaAprendiz");

    if (!tableBodyBusqueda) {
        console.error("No se encontró el elemento con id 'tableBodyBusqueda'.");
        return;
    }

    //limpia contenido previo
    tableBodyBusqueda.innerHTML = "";

    if (data.error) {
        // Si hay un error, muestra el mensaje en la tabla
        tableBodyBusqueda.innerHTML = `<tr><td colspan="7">${data.error}</td></tr>`;
        busquedaAprendiz.style.display = "block"; // Asegura que se muestre la tabla
        return;
    }

    // Agrega el aprendiz encontrado a la tabla
    const row = `
        <tr>
            <td>${[data.id]}</td>
            <td>${[data.nombre]}</td>
            <td>${[data.documento]}</td>
            <td>${[data.programa]}</td>
            <td>${[data.centro]}</td>
            <td>${[data.regional]}</td>
            <td>${[data.rh]}</td>
        </tr>
    `;
    tableBodyBusqueda.innerHTML = row;
    busquedaAprendiz.style.display = "block"; // Muestra la tabla si estaba oculta
}
//funcion para mostrar datos en el formulario de actualizacion
function actualizarAprendizForm(data) {
    const form = document.getElementById("actualizarForm");
    const formId = document.getElementById("id");
    const formNombre = document.getElementById("nombre");
    const formDocumento = document.getElementById("documento");
    const formPrograma = document.getElementById("programa");
    const formCentro = document.getElementById("centro");
    const formRegional = document.getElementById("regional");
    const formRh = document.getElementById("rh");

    if (!form) {
        console.error("No se encontró el elemento con id 'actualizarForm'.");
        return;
    }

    if (data.error) {
        // Si hay un error, muestra el mensaje en el formulario
        form.innerHTML = `<p>${data.error}</p>`;
        return;
    }

    // Muestra los datos en el formulario
    formId.value = data.id;
    formNombre.value = data.nombre;
    formDocumento.value = data.documento;
    formPrograma.value = data.programa;
    formCentro.value = data.centro;
    formRegional.value = data.regional;
    formRh.value = data.rh;
}

// Evento para el formulario de actualización
document.getElementById('actualizarForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        id: document.getElementById('id').value,
        nombre: document.getElementById('nombre').value,
        documento: document.getElementById('documento').value,
        programa: document.getElementById('programa').value,
        centro: document.getElementById('centro').value,
        regional: document.getElementById('regional').value,
        rh: document.getElementById('rh').value
    };

    try {
        const resultado = await actualizarAprendiz(formData);
        actualizarAprendizForm(resultado);
        alert('Aprendiz actualizado exitosamente');
        location.reload();
    } catch (error) {
        alert('Error al actualizar el aprendiz');
    }
});



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
        mostrarId(aprendizData); // Pass the object directly
    } catch (error) {
        mostrarId({ error: 'No se pudo encontrar el aprendiz o hubo un problema con la solicitud.' });
    }
});


document.getElementById('listar').addEventListener('click', async () => {
    try {
        const aprendicesData = await obtenerAprendices(); // Llama a la función desde aprendiz.js
        mostrarDatos(aprendicesData); // Muestra los datos en el HTML
    } catch (error) {
        mostrarDatos({ error: 'No se pudo encontrar los aprendices o hubo un problema con la solicitud.' });
    }
})

