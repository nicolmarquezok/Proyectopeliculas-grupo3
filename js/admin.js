/*       Classes         */
class Pelicula {
    nombre;
    categoria
    descripcion;
    publicado;

    constructor (nombre,categoria,descripcion,publicado) {
        this.nombre=nombre;
        this.categoria=categoria
        this.descripcion=descripcion
        this.publicado=publicado
    }
}
 class Catalago{
    peliculas
     
    constructor(){
        this.peliculas=[]
    }
    agregarpeliculas(pelicula){
    this.peliculas.push(pelicula)
    }
 }
/* Variables iniciales  */
 const catalago = new Catalago()
const form = document.getElementById("formulario")
const tituloInput = document.getElementById("title")
const categoriaInput = document.getElementById("Categoria")
const descripcionInput = document.getElementById("message-text")
const fechaInput = document.getElementById("date")
const img_urlInput = document.getElementById("Url-Img")


//funciones que no esten en clases

function guardarPeliculas(){
    const Catalagojosn= JSON.stringify(catalago)
    localStorage.setItem("catalago",Catalagojosn)
}


function limpiarImputs(){
    tituloInput.value=""
    categoriaInput.value=""
    descripcionInput.value=""
    fechaInput.value=""
    img_urlInput.value=""
}

function crearpelicula(event) {
    event.preventDefault()

    const titulo = tituloInput
    const categoria= categoriaInput
    const description = descripcionInput
    const fecha = fechaInput

    const pelinueva = new Pelicula(titulo,categoria,description,fecha)

    catalago.agregarpeliculas(pelinueva)

    guardarPeliculas()
    limpiarImputs()
}

//Eventos
form.addEventListener("submit", crearpelicula)