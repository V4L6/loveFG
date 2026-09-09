 /* =========================
   CONFIGURACIÓN
========================= */

// Tiempo entre cada "te amo"
const VELOCIDAD = 20;

// Tiempo que los 1000 "te amo"
// permanecen en pantalla antes de regresar
// a la terminal.
const TIEMPO_ANTES_DE_TERMINAR = 7000;


/* =========================
   ELEMENTOS
========================= */

const inicio =
    document.getElementById("inicio");

const programa =
    document.getElementById("programa");

const botonEmpezar =
    document.getElementById("botonEmpezar");

const contador =
    document.getElementById("contador");

const progreso =
    document.getElementById("progreso");

const corazon =
    document.getElementById("corazon");

const estadoTexto =
    document.getElementById("estadoTexto");

const mensajeTerminado =
    document.getElementById("mensajeTerminado");

const terminalFinal =
    document.getElementById("terminalFinal");

const comando =
    document.getElementById("comando");

const errorComando =
    document.getElementById("errorComando");


/* =========================
   ESPERA
========================= */

function esperar(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}


/* =========================
   CREAR "TE AMO"
========================= */

function crearTeAmo(numero) {

    const texto =
        document.createElement("span");

    texto.classList.add("te-amo");

    texto.textContent = "Te amo";

    /*
        En computadora:
        12 columnas.

        En celular:
        6 columnas.
    */

    const columnas =
        window.innerWidth <= 600
            ? 6
            : 12;

    const indice =
        numero - 1;

    const columna =
        (indice % columnas) + 1;

    const fila =
        Math.floor(indice / columnas) + 1;

    texto.style.gridColumn =
        columna;

    texto.style.gridRow =
        fila;

    corazon.appendChild(texto);

}


/* =========================
   COMENZAR
========================= */

async function comenzar() {

    // Ocultar pantalla inicial
    inicio.classList.add("oculto");

    // Mostrar programa
    programa.classList.remove("oculto");


    // Reiniciar todo
    corazon.innerHTML = "";

    contador.textContent =
        "0 / 1000";

    progreso.style.width =
        "0%";

    estadoTexto.textContent =
        "Ejecutando...";

    mensajeTerminado.classList.add("oculto");

    terminalFinal.classList.add("oculto");

    errorComando.textContent = "";

    comando.value = "";


    /*
        Generamos los 1000
        "Te amo".
    */

    for (let i = 1; i <= 1000; i++) {

        crearTeAmo(i);


        /*
            El contador avanza
            exactamente junto con
            cada "Te amo".
        */

        contador.textContent =
            `${i} / 1000`;


        /*
            La barra representa
            exactamente el porcentaje
            completado.
        */

        progreso.style.width =
            `${(i / 1000) * 100}%`;


        await esperar(VELOCIDAD);

    }


    /*
        Ya terminaron los 1000.

        Los dejamos en pantalla
        durante unos segundos.
    */

    estadoTexto.textContent =
        "1000 te amo ♥";


    await esperar(
        TIEMPO_ANTES_DE_TERMINAR
    );


    /*
        Ahora sí regresamos
        a la terminal.
    */

    estadoTexto.textContent =
        "Proceso terminado ♥";


    mensajeTerminado.classList.remove(
        "oculto"
    );


    /*
        Mostramos el lugar donde
        él puede escribir "x".
    */

    terminalFinal.classList.remove(
        "oculto"
    );


    /*
        Ponemos automáticamente
        el cursor en el comando.
    */

    comando.focus();

}


/* =========================
   BOTÓN A VER
========================= */

botonEmpezar.addEventListener(
    "click",
    comenzar
);


/* =========================
   COMANDO "x"
========================= */

comando.addEventListener(
    "keydown",
    function(event) {

        /*
            Solo reaccionamos
            cuando presiona Enter.
        */

        if (event.key !== "Enter") {
            return;
        }


        const valor =
            comando.value
                .trim()
                .toLowerCase();


        /*
            Si escribió x:
            reiniciamos.
        */

        if (valor === "x") {

            errorComando.textContent = "";

            comenzar();

            return;
        }


        /*
            Si escribe otra cosa.
        */

        errorComando.textContent =
            'Comando no reconocido. Escribe "x" y presiona Enter.';

        comando.value = "";

    }
);