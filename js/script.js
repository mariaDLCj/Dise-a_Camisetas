
let camiseta = document.getElementById("divCopiar");
let fotoCamiseta = document.getElementById("camiseta");
let copiadoReves = document.getElementById("copiadoReves");
let letra = document.getElementById("letra");
let textoCamiseta = document.getElementById("textoCamiseta");
let tituloCamiseta = document.getElementById("tituloCamiseta");
let ejeX = document.getElementById("ejeX");
let ejeY = document.getElementById("ejeY");
let radioBlanco = document.getElementById("blanco");
let radioNegro = document.getElementById("negro");

// ------------------ FUNCIONES ------------------

// CREAR TEXTO ESCRIBE HASTA 20 CARACTERES
function crearTexto() {
    let texto = tituloCamiseta.value; 
    if(texto.length < 20){
        textoCamiseta.innerHTML = texto; 
    }
}

// MUEVE EL TEXTO EN FUNCIÓN DE LOS RANGE
// USADOS COMO VALOR DE LA PROPIEDAD
function actualizarPosicion() {
    let x = ejeX.value;
    let y = ejeY.value;
    textoCamiseta.style.transform = `translate(${x}px, ${y}px)`;
}

// CAMBIA EL COLOR DE LA CAMISETA ASIGNA OTRO SRC
// CAMBIA COLOR DEL TEXTO
function color(){
    let src = radioNegro.checked ? "img/black.png" : "img/white.png";
    textoCamiseta.style.color = radioNegro.checked ? "white" : "black";
    fotoCamiseta.setAttribute("src",src);
}

// ------------------ EVENTOS ------------------

// EVENTOS DE LOS BOTONES LLAMAN A LA FUNCION COLOR
radioNegro.addEventListener("change",color);
radioBlanco.addEventListener("change", color);

// MODIFICA EL VALOR EN TIEMPO REAL Y LLAMA A LA FUNCIÓN
tituloCamiseta.oninput = crearTexto;
ejeX.oninput=actualizarPosicion;
ejeY.oninput=actualizarPosicion;

// ASIGNA LA FUNCION AL DIV QUE ESTÁ SOBRE LA CAMISETA
// DE QUE SE PUEDA ARRASTRAR LA IMAGEN SELECCIONADA
camiseta.addEventListener('drop', (event) => {
    event.preventDefault();

    // SI HAY UNA IMG CON ESTA CLASE SE ALMACENA, SIGNIFICA
    // QUE HA HABIDO UNA IMG ANTES DE LA QUE SE VA A MOVER
    // POR LO QUE SE ELIMINA, DEVUELVE UN ARRAY
    let imagenPuesta = document.getElementsByClassName("imgCopiada");
    // TAMBIÉN BORRARÁ LA DEL REVÉS, PERO SE COMPRUEBA SÓLO
    // LA IMAGEN GRANDE, YA QUE SIEMPRE VAN JUNTAS
    let imagenPuestaR = document.getElementsByClassName("imgCopiadaR");

    // AL DEVOLVER UN ARRAY SE COMPRUEBA QUE TENGA LA 1º POS
    // SI ES ASÍ HA HABIDO IMG ANTES Y SE BORRARÁ
    if (imagenPuesta.length > 0) {
        event.target.remove(imagenPuesta[0]);
        //ES NECESARIO REMOVECHILD O NO SE BORRARÁ
        copiadoReves.removeChild(imagenPuestaR[0]);
    }

    // DATA TRANSFER OBTIENE EL CONTENIDO DEL EVENTO DRAG, EN ESTE CASO
    // LO PASA EN TEXTO PLANO AL SER UN SRC Y SE ALMACENA
    let src = event.dataTransfer.getData("text/plain");
    // SE CREA UN ELEMENTO IMG Y SE LE ASIGNA EL VALOR DEL SRC 
    let imgMvoer = document.createElement("img");
    imgMvoer.setAttribute("src", src);
    // SE LE AÑADE LA CLASE CON LA POS ABSOLUTA Y SE AÑADE AL DOM
    imgMvoer.classList.add("imgCopiada");
    camiseta.appendChild(imgMvoer);

    // COLOCAR LA IMG REVES
    let srcR = event.dataTransfer.getData("text/plain");
    let imgMoverR = document.createElement("img");
    imgMoverR.setAttribute("src", srcR);
    imgMoverR.classList.add("imgCopiadaR");
    copiadoReves.appendChild(imgMoverR);
    crearTexto();
    console.log("He soltado la img");
    console.log(src);
});

// AL DIV QUE CONTENDRÁ LA IMG COPIADA SE LE ASIGNA 
// EL EVENTO DRGAOVER PARA QUE SE PUEDA SOLTAR 
// SOBRE ESE ELEMENTO LA IMG QUE SE ARRATRA
// SIN EL PREVENT NO FUNCIONA
camiseta.addEventListener('dragover', (event) => {
    event.preventDefault();
});