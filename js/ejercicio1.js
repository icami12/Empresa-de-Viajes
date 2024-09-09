document.addEventListener("DOMContentLoaded", function() {
    // Deshabilitar fechas anteriores a la actual
    function deshabilitarFechaAnterior() {
        const fechaActual = new Date().toISOString().split('T')[0];
        document.getElementById('fechaVuelo').setAttribute("min", fechaActual);
    }
    deshabilitarFechaAnterior();

    // Función para eliminar opción del campo destino
    const provincias = [
        { id: 1, nombre: "Córdoba" },
        { id: 2, nombre: "Mendoza" },
        { id: 3, nombre: "Tucumán" }
    ];

    function eliminarDeCampoDestino() {
        const selectOrigen = document.getElementById('origen');
        const selectDestino = document.getElementById('destino');

        function cargarProvincias(selectProvincia, opcionesSelect) {
            selectProvincia.innerHTML = '<option value="">Seleccione una provincia</option>';
            opcionesSelect.forEach(provincia => {
                const opcion = document.createElement("option");
                opcion.textContent = provincia.nombre;
                opcion.value = provincia.id;
                // Agregar opción al select
                selectProvincia.appendChild(opcion);
            });
        }
        cargarProvincias(selectOrigen, provincias);

        selectOrigen.addEventListener('change', () => {
            const idSeleccionado = parseInt(selectOrigen.value);
            const opcionesFiltradas = provincias.filter(provincia => provincia.id !== idSeleccionado);
            cargarProvincias(selectDestino, opcionesFiltradas);
        });
    }
    eliminarDeCampoDestino();

    document.getElementById('form-busqueda').addEventListener('submit', function(e) {
        
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const fechaVuelo = document.getElementById('fechaVuelo').value;

        console.log(origen);
        console.log(destino);
        // Guardar en localStorage
        localStorage.setItem('origen', origen);
        localStorage.setItem('destino', destino);
        localStorage.setItem('fecha_vuelo', fechaVuelo);
    });
});