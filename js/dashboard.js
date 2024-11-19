document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const menuItems = document.querySelectorAll('.menu-item');
    const submenuItems = document.querySelectorAll('.submenu-item');
 
    // Función para colapsar/expandir la barra lateral
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
 
    // Función para mostrar/ocultar submenús
    menuItems.forEach(item => {
        item.addEventListener('click', () => {-
            // Toggle active class
            item.classList.toggle('active');
           
            // Encontrar el submenu siguiente
            const submenu = item.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('active');
            }
        });
    });
 
    // Función para mostrar contenido
    submenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const sectionId = item.getAttribute('data-section');
           
            // Ocultar todas las secciones
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
           
            // Mostrar la sección seleccionada
            const selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.classList.add('active');
            }
        });
    });
});