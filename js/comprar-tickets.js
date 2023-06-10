// Valor del ticket sin descuento
const precioTicket = 200;

// Descuentos
let descuentoEstudiante = 80; // 80% de descuento para Estudiante
let descuentoTrainee    = 50; // 50% de descuento para Trainee
let descuentoJunior     = 15; // 15% de descuento para Junior

// Elementos
let nombre          = document.getElementById("nombre");
let apellido        = document.getElementById("apellido");
let mail            = document.getElementById("mail");
let cantidadTickets = document.getElementById("cantidadTickets");
let categoria       = document.getElementById("categoriaSelect");

// Para quitar el error a los form
function quitarClaseError() {
    let x = document.querySelectorAll(".form-control, .form-select");
    let i;
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove('is-invalid');
    }
}

//Calcular total a pagar
function total_a_pagar() {
    quitarClaseError();

    // Verificar si los campos están llenados
    if (nombre.value === "") {
        alert("Por favor, escribe tu nombre.");
        nombre.classList.add("is-invalid");
        nombre.focus();
        return;
    }

    if (apellido.value === "" ) {
        alert("Por favor, escribe tu apellido.");
        apellido.classList.add("is-invalid");
        apellido.focus();
        return;
    }

    if (mail.value === "") {
        alert("Por favor, escribe un email.");
        mail.classList.add("is-invalid");
        mail.focus();
        return;
    }

    // Para la validez del correo electrónico
    const emailValido = mail => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    }

    if (!emailValido(mail.value)) {
        alert("El correo electrónico no es valido");
        mail.classList.add("is-invalid");
        mail.focus();
        return;
    }

    // Verificar cantidad de tickets, cantidad mínima es 1
    if ( (cantidadTickets.value == 0) || (isNaN(cantidadTickets.value)) ) {
        alert("La cantidad de Tickets debe ser mayor o igual a 1");
        cantidadTickets.classList.add("is-invalid");
        cantidadTickets.focus();
        return;
    }
// Verificar categoria
    if (categoria.value == "") {
        alert("Por favor, debe elegir una categoría.");
        categoria.classList.add("is-invalid");
        categoria.focus();
        return;
    }

    // Multiplicar precio por cantidad de tickets
    let totalValorTickets = (cantidadTickets.value) * precioTicket;

    // Aplicando descuentos
    if (categoria.value == 0) {
        totalValorTickets = totalValorTickets ;
    }
    if (categoria.value == 1) {
        totalValorTickets = totalValorTickets - (descuentoEstudiante / 100 * totalValorTickets);
    }
    if (categoria.value == 2) {
        totalValorTickets = totalValorTickets - (descuentoTrainee / 100 * totalValorTickets);
    }
    if (categoria.value == 3) {
        totalValorTickets = totalValorTickets - (descuentoJunior / 100 * totalValorTickets);
    }

    // Para insertar el valor en el HTML
    totalPago.innerHTML = totalValorTickets;
}

// Botón Resumen, recibe un Listener en la funcion para calcular la cantidad  de tickets y categoría
btnResumen.addEventListener('click', total_a_pagar);

// Botón Borrar
function reset_total_a_pagar() {
    quitarClaseError();
    totalPago.innerHTML = "";
}
btnBorrar.addEventListener('click', reset_total_a_pagar);