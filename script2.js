function playSound() {
    var sound = document.getElementById('audio');
    sound.play();
}

 function guardarContrato() {
            const numeroContrato = document.getElementById('numeroContratoInput').value;
            if (esNumeroEntero(numeroContrato)) {
                localStorage.setItem('numeroContrato', numeroContrato);
                window.location.href = 'calculadora.html'; // Redirige a la calculadora después de guardar el número de contrato
            } else {
                abrirDialogoContrato();
            }
        }
        function esNumeroEntero(valor) {
            return /^\d+$/.test(valor);
        }
        function abrirDialogoContrato() {
            const dialogContrato = new bootstrap.Modal(document.getElementById('dialogContrato'), {
                keyboard: false
            });
            dialogContrato.show();
        }

        document.getElementById('numeroContratoInput').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                guardarContrato();
            }
        });
