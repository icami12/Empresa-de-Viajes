document.addEventListener("DOMContentLoaded", function() {
    const clases = [
        { id: 1, nombre: "Económica" },
        { id: 2, nombre: "Ejecutivo" }
    ];
    const ubicaciones = [
        { id: 1, nombre: "Ventanilla" },
        { id: 2, nombre: "Centro" },
        { id: 3, nombre: "Pasillo" }
    ];

    function filtrarCamposSegunClase() {
        const selectClaseValor = document.getElementById('clase');
        const selectUbicacion = document.getElementById('ubicacion');

        function cargarSelect(selectElemento, opciones) {
            selectElemento.innerHTML = '<option value="">Seleccione una opción</option>';
            opciones.forEach(opcion => {
                const option = document.createElement("option");
                option.textContent = opcion.nombre;
                option.value = opcion.id;
                selectElemento.appendChild(option);
            });
        }

        cargarSelect(selectClaseValor, clases);

        selectClaseValor.addEventListener('change', () => {
            const valorDeClase = parseInt(selectClaseValor.value);
            if (valorDeClase === 2) {
                const valoresFiltrados = ubicaciones.filter(ubicacion => ubicacion.id !== 2);
                cargarSelect(selectUbicacion, valoresFiltrados);
            } else {
                cargarSelect(selectUbicacion, ubicaciones);
            }

            // Actualizar rangos del campo de cantidad de pasajes
            const campoPasaje = document.getElementById('cantidadPasajes');
            if (valorDeClase === 2) {
                campoPasaje.setAttribute('min', 1);
                campoPasaje.setAttribute('max', 8);
            } else {
                campoPasaje.setAttribute('min', 9);
                campoPasaje.setAttribute('max', 50);
            }
        });
    }
    filtrarCamposSegunClase();

    function cargarDatosDeLocalStorage() {
        const origen = localStorage.getItem('origen');
        const destino = localStorage.getItem('destino');
        const fechaVuelo = localStorage.getItem('fecha_vuelo');

        document.getElementById('origenVuelo').value = origen;
        document.getElementById('destinoVuelo').value = destino;
        document.getElementById('fechaVuelo').value = fechaVuelo;

        // Deshabilitar los campos
        document.getElementById('origenVuelo').disabled = true;
        document.getElementById('destinoVuelo').disabled = true;
        document.getElementById('fechaVuelo').disabled = true;
    }

    cargarDatosDeLocalStorage();

    document.getElementById('abrirModalBtn').addEventListener('click', () => {
        const inputCantPasajes = document.getElementById('cantidadPasajes');
        const cantDePasajes = parseInt(inputCantPasajes.value);
        const selectClase = parseInt(document.getElementById('clase').value);

        if (selectClase === 2) {
            if (cantDePasajes > 0 && cantDePasajes < 9) {
                abrirModalDeRegistro(cantDePasajes);
            } else {
                alert('La cantidad de pasajeros debe estar entre 1 y 8 para Clase Ejecutiva');
            }
        } else {
            if (cantDePasajes > 8 && cantDePasajes < 51) {
                abrirModalDeRegistro(cantDePasajes);
            } else {
                alert('La cantidad de pasajeros debe estar entre 9 y 50 para Clase Económica');
            }
        }
    });

    function abrirModalDeRegistro(cantidad) {
        const modal = new bootstrap.Modal(document.getElementById('pasajerosModal'));
        const formPasajeros = document.getElementById('formPasajeros');
        formPasajeros.innerHTML = ''; // Limpiar campos

        // Generando campos de entrada para cada pasajero
        for (let i = 1; i <= cantidad; i++) {
            const div = document.createElement('div');
            div.classList.add('mb-3');
            div.innerHTML = `
                <label for="pasajero${i}" class="form-label">Pasajero ${i}</label><br>
                <label for="${i}apellido" class="form-label">Apellido</label>
                <input type="text" name="${i}apellido" id="${i}apellido" class="form-control" maxlength="100" required>
                <label for="${i}nombre" class="form-label">Nombre</label>
                <input type="text" name="${i}nombre" id="${i}nombre" class="form-control" maxlength="100" required>
                <label for="${i}dni" class="form-label">DNI</label>
                <input type="number" name="${i}dni" id="${i}dni" class="form-control" min="8" required>
                <label for="${i}fNacimiento" class="form-label">Fecha de Nacimiento</label>
                <input type="date" name="${i}fNacimiento" id="${i}fNacimiento" class="form-control">
                <label>Sexo:</label><br>
                <div class="form-check form-check-inline">
                    <input type="radio" name="${i}sexo" id="${i}fem" class="form-check-input" value="F">
                    <label for="${i}fem" class="form-check-label">F</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" name="${i}sexo" id="${i}masc" class="form-check-input" value="M">
                    <label for="${i}masc" class="form-check-label">M</label>
                </div><br>
                <label for="${i}nroSilla" class="form-label">Selección de Nro de Silla</label>
                <input type="number" name="${i}nroSilla" id="${i}nroSilla" class="form-control">
            `;
            formPasajeros.appendChild(div);
        }

        // Abrir el modal
        modal.show();
    }

    function crearListaDeReservas() {
        const cantPasajes = parseInt(document.getElementById('cantidadPasajes').value);
        const origen = localStorage.getItem('origen');
        const destino = localStorage.getItem('destino');
        let org, dest;
        if(origen == 1 ){
            org = "Córdoba";
        }
        if(origen == 2){
            org = "Mendoza";
        }
        if (origen == 3) {
            org = "Tucumán";
        }
        if(destino == 1 ){
            dest = "Córdoba";
        }
        if(destino == 2){
            dest = "Mendoza";
        }
        if (destino == 3) {
            dest = "Tucumán";
        }
        const vuelo = {
            origen: org,
            destino: dest,
            fecha: new Date(document.getElementById('fechaVuelo').value),
        };
        const reservas = [];

        for (let i = 1; i <= cantPasajes; i++) {
            const reserva = {
                apellidoNombre: document.getElementById(`${i}apellido`).value + ' ' + document.getElementById(`${i}nombre`).value,
                dni: parseInt(document.getElementById(`${i}dni`).value),
                vuelo: vuelo,
                clase: document.getElementById('clase').options[document.getElementById('clase').selectedIndex].text,
                asiento: document.getElementById(`${i}nroSilla`).value,
            };
            reservas.push(reserva);
        }

        return reservas;
    }

/*     document.getElementById('reset-form').addEventListener('click', () => {
        form.reset();
    });
 */
    document.getElementById('guardarPasajeros').addEventListener('click', () => {
        const reservas = crearListaDeReservas();
        mostrarReservas(reservas);
        const modal = bootstrap.Modal.getInstance(document.getElementById('pasajerosModal'));
        modal.hide();
    });

    function mostrarReservas(reservas) {
        const tablaReservas = document.getElementById('tablaReservas').getElementsByTagName('tbody')[0];
        tablaReservas.innerHTML = ''; // Limpiar tabla

        reservas.forEach(reserva => {
            const row = tablaReservas.insertRow();
            row.insertCell(0).textContent = reserva.apellidoNombre;
            row.insertCell(1).textContent = reserva.dni;
            row.insertCell(2).textContent = reserva.vuelo.origen;
            row.insertCell(3).textContent = reserva.vuelo.destino;
            row.insertCell(4).textContent = reserva.vuelo.fecha.toLocaleDateString();
            row.insertCell(5).textContent = reserva.clase;
            row.insertCell(6).textContent = reserva.asiento;
        });
    }

    function abrirModalReservas() {
        const modalTrigger = document.getElementById('abrirModalBtn2');
        modalTrigger.addEventListener('click', () => {
            const reservaModal = new bootstrap.Modal(document.getElementById('reservasModal'));
            reservaModal.show();
        });
    }
    abrirModalReservas();
});