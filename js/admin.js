/*       Classes         */
class Pelicula {
    id;
    nombre;
    categoria
    descripcion;
    publicado;

    constructor (id,nombre,categoria,descripcion,publicado) {
        this.id=id;
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
const tableBody =document.querySelector(`#cuerpoTabla`)



//funciones que no esten en clases



function guardarPeliculas(){
    const Catalagojosn= JSON.stringify(catalago)
    // AQUI ESTABA MAL ESCRITO DECIA catal*A*go ************************************************
    localStorage.setItem("catalogo",Catalagojosn)
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

    // Faltaba agregar el ".value" a cada input sino no tomaba el valor correcto ************************************
    const titulo = tituloInput.value
    const categoria= categoriaInput.value
    const description = descripcionInput.value
    const fecha = fechaInput.value

    const pelinueva = new Pelicula(titulo,categoria,description,fecha)

    catalago.agregarpeliculas(pelinueva)

    guardarPeliculas()
    limpiarImputs()
   iniciarApp()
    
  
}

// Esta funcion cuando se ejecuta busca del localstorage el catalogo*******************************************
function iniciarApp() {
    const catalogoString = window.localStorage.getItem("catalogo")
    const catalogoParseado = JSON.parse(catalogoString)
    catalago.peliculas = catalogoParseado.peliculas

    let trTable  ="";

   catalogo.peliculas.forEach(function(pelicula,index){
        trTable +="<tr>";
        trTable += `<td> ${pelicula.id} </td>`
        trTable += `<td> ${pelicula.nombre} </td>`
        trTable += `<td> ${pelicula.categoria} </td>`
        trTable += `<td> ${pelicula.descripcion} </td>`
        trTable += `<td> ${pelicula.publicado} </td>`
        trTable+= `<td><button type="button" class="btn btn-outline-secondary" onclick="editGame('${index}')">Edit</button>`;
      trTable+=" </tr>";

    });
document.querySelector('#cuerpoTabla').innerHTML=trTable
}

//Eventos
form.addEventListener("submit", crearpelicula)

// Bien se termina de cargar toda la pagina ejecutamos la funcion que busca lo que hay en el LocalStorage*************************************
window.addEventListener("load", iniciarApp)