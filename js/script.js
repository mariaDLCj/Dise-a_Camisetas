
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
//ONINPUT PONER EL TEXTO = A ONINPUT Y LLAMAR A LA FUNCION SIN ()

function crearTexto() {
    let texto = tituloCamiseta.value; 

    if(texto.length < 20){
        textoCamiseta.innerHTML = texto; 
    }
}

function actualizarPosicion() {
    let x = ejeX.value;
    let y = ejeY.value;
    textoCamiseta.style.transform = `translate(${x}px, ${y}px)`;
}

function color(){
    
    let src = radioNegro.checked ? "../img/black.png" : "../img/white.png";
    textoCamiseta.style.color = radioNegro.checked ? "white" : "black";
    fotoCamiseta.setAttribute("src",src);
}

radioNegro.addEventListener("change",color);
radioBlanco.addEventListener("change", color);

tituloCamiseta.oninput = crearTexto;
ejeX.oninput=actualizarPosicion;
ejeY.oninput=actualizarPosicion;

camiseta.addEventListener('drop', (event) => {
    event.preventDefault();

    // SI HAY UNA IMG CON ESTA CLASE SE ALMACENA, SIGNIFICA
    // QUE HA HABIDO UNA IMG ANTES DE LA QUE SE VA A MOVER
    let imagenPuesta = document.getElementsByClassName("imgCopiada");
    let imagenPuestaR = document.getElementsByClassName("imgCopiadaR");

    // AL DEVOLVER UN ARRAY SE COMPRUEBA QUE TENGA LA 1º POS
    if (imagenPuesta.length > 0) {
        event.target.remove(imagenPuesta[0]);
        //ES NECESARIO REMOVECHILD O NO SE BORRARÁ
        copiadoReves.removeChild(imagenPuestaR[0]);
    }

    let src = event.dataTransfer.getData("text/plain");
    let imgMvoer = document.createElement("img");
    imgMvoer.setAttribute("src", src);
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

camiseta.addEventListener('dragover', (event) => {
    event.preventDefault();
});