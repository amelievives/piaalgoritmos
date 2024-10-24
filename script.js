document.addEventListener('DOMContentLoaded', function() {
    const numeroContrato =localStorage.getItem('numeroContrato');
    if (numeroContrato){
        document.getElementById('mostrarNumeroContrato').textContent=numeroContrato;
    }
});
function esNumero(str) { 
    return /^\d+$/.test(str);
}

function convertirAInt(str) {
    return parseInt(str);
}

function convertirADouble(str) {
    return parseFloat(str);
}

function mostrarAlerta(mensaje,tipo = 'success') {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = 'alert';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.prepend(alerta);
    setTimeout(() => {
        alerta.classList.remove('show');
        alerta.classList.add('hide');
        setTimeout(() => alerta.remove(), 500);
    }, 3000);
}

function mostrarTablaAmortizacion(plazo, tasa, credito, enganche, fechaInicial) {
    let html = "<table class='table table-amortizacion' style='width: 70%;'><thead><tr><th>Periodo</th><th>Fecha de Pago</th><th>Cuota</th><th>Interés</th><th>Capital</th><th>Saldo</th></tr></thead><tbody>";
    let saldo = credito - enganche; 
    let fechaPago = new Date(fechaInicial); 
    let cuota = (saldo * (tasa/100/12)) / (1-Math.pow(1 +(tasa/100/12),-plazo));

    for (let periodo = 1; periodo <= plazo; ++periodo) {
        let interes = saldo * (tasa/100/12); 
        let capital = cuota - interes; 
        saldo -= capital; 
        fechaPago.setMonth(fechaPago.getMonth() + 1);

        html += `<tr>
            <td>${periodo}</td>
            <td>${fechaPago.toLocaleDateString()}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${interes.toFixed(2)}</td>
            <td>${capital.toFixed(2)}</td>
            <td>${saldo.toFixed(2)}</td>
        </tr>`;
    }
    html += "</tbody></table>";
    document.getElementById("tablaAmortizacion").innerHTML = html;
}

function generarTablaAmortizacion() {
    console.log("La función generarTablaAmortizacion se está ejecutando.");

    let credito = convertirADouble(document.getElementById("credito").innerText.substring(1));
    let enganche = convertirADouble(document.getElementById("enganche").innerText.substring(1));
    let iva = convertirADouble(document.getElementById("iva").innerText.slice(0, -1));
    let tasa = convertirADouble(document.getElementById("tasa").innerText.slice(0, -1));
    let plazo = convertirAInt(document.getElementById("plazo").innerText);
    let fechaInicial = document.getElementById('start').value; 

    let creditoConIva=credito+(credito*(iva/100));
    mostrarTablaAmortizacion(plazo,tasa,creditoConIva,enganche,fechaInicial);
}


function abrirDialogoCredito() {
    const dialog = new bootstrap.Modal(document.getElementById('dialog'), { keyboard: false });
    dialog.show();
    document.getElementById('guardarCredito').addEventListener('click', function() {
        const nuevoCredito = document.getElementById('nuevoCredito').value;
        if (esNumero(nuevoCredito)) {
            document.getElementById("credito").innerText = `$${nuevoCredito}`;
            mostrarAlerta('Crédito actualizado correctamente', 'success');
            dialog.hide();
        } else {
            mostrarAlerta('Error: Solo se permiten números.', 'danger');
        }
    });
}

function abrirDialogoEnganche() {
    const dialogEnganche = new bootstrap.Modal(document.getElementById('dialogEnganche'), { keyboard: false });
    dialogEnganche.show();
    document.getElementById('guardarEnganche').addEventListener('click', function() {
        const nuevoEnganche = document.getElementById('nuevoEnganche').value;
        if (esNumero(nuevoEnganche)) {
            document.getElementById("enganche").innerText = `$${nuevoEnganche}`;
            mostrarAlerta('Enganche actualizado correctamente', 'success');
            dialogEnganche.hide();
        } else {
            mostrarAlerta('Error: Solo se permiten números.', 'danger');
        }
    });
}

function abrirDialogoTasa() {
    const dialogTasa = new bootstrap.Modal(document.getElementById('dialogTasa'), { keyboard: false });
    dialogTasa.show();
    document.getElementById('guardarTasa').addEventListener('click', function() {
        const nuevoTasa = document.getElementById('nuevoTasa').value;
        if (esNumero(nuevoTasa)) {
            document.getElementById("tasa").innerText = `${nuevoTasa}%`;
            mostrarAlerta('Tasa actualizada correctamente','success');
            dialogTasa.hide();
        } else {
            mostrarAlerta('Error: Solo se permiten números.', 'danger');
        }
    });
}

function abrirDialogoPlazo() {
    const dialogPlazo = new bootstrap.Modal(document.getElementById('dialogPlazo'), { keyboard: false });
    dialogPlazo.show();
    document.getElementById('guardarPlazo').addEventListener('click', function() {
        const nuevoPlazo = document.getElementById('nuevoPlazo').value;
        if (esNumero(nuevoPlazo) && convertirAInt(nuevoPlazo) <= 60) {
            document.getElementById("plazo").innerText = nuevoPlazo;
            mostrarAlerta('Plazo mensual actualizado correctamente', 'success');
            dialogPlazo.hide();
        } else {
            mostrarAlerta('Error: El plazo debe ser un número hasta 60.', 'danger');
        }
    });
}

function modificarCredito() { 
    abrirDialogoCredito();
 }
function modificarEnganche() 
{ 
    abrirDialogoEnganche(); }
function modificarTasa() 
{ 
    abrirDialogoTasa(); }
function modificarPlazo() 
{ 
    abrirDialogoPlazo();
 }
