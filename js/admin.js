/*       Classes         */
class Pelicula {
    id;
    nombre;
    categoria
    descripcion;
    publicado;
    imagen;
    constructor(nombre, categoria, descripcion, publicado,imagen) {
      
        this.id=this.generarID()
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.publicado = publicado;
        this.imagen=imagen;
    }
    generarID() {
        const id = Math.floor(Math.random() * 1000);
        return id;
        
    }
}
class Catalago {
    peliculas
    constructor() {
        this.peliculas = []
    }
    agregarpeliculas(pelicula) {
        this.peliculas.push(pelicula)
    }
}

/* Variables iniciales  */
const editmodal = new bootstrap.Modal(document.getElementById('modaleditar'))
const catalogo = new Catalago()
const form = document.getElementById("formulario")
const tituloInput = document.getElementById("title")
const categoriaInput = document.getElementById("Categoria")
const descripcionInput = document.getElementById("message-text")
const fechaInput = document.getElementById("date")
const img_urlInput = document.getElementById("Url-Img")
const tableBody = document.querySelector(`#cuerpoTabla`)
const form2=document.getElementById("formulario2")

//funciones que no esten en clases
function guardarPeliculas() {
    const Catalagojosn = JSON.stringify(catalogo)
    localStorage.setItem("catalogo", Catalagojosn)
}
function limpiarImputs() {
    tituloInput.value = ""
    categoriaInput.value = ""
    descripcionInput.value = ""
    fechaInput.value = ""
    img_urlInput.value = ""
}
function crearpelicula(event) {
    event.preventDefault()
    const titulo = tituloInput.value
    const categoria = categoriaInput.value
    const description = descripcionInput.value
    const fecha = fechaInput.value
    const img_url = img_urlInput.value
    const pelinueva = new Pelicula  (titulo, categoria, description, fecha,img_url)
    catalogo.agregarpeliculas(pelinueva)
    guardarPeliculas()
    limpiarImputs()
    iniciarApp()
    renderTabla()
}
function iniciarApp() {
    const catalogoString = window.localStorage.getItem("catalogo")
    const catalogoParseado = JSON.parse(catalogoString)
    catalogo.peliculas = catalogoParseado.peliculas
    renderTabla()
}
function renderTabla() {
    let trTable = "";
    catalogo.peliculas.forEach(function (pelicula, index) {
        trTable += "<tr>";
        trTable += `<td> ${pelicula.id} </td>`
        trTable += `<td><img src="${pelicula.imagen}}" alt="pelicula" width="150px"></img>  ${pelicula.nombre} </td>`
        trTable += `<td> ${pelicula.categoria} </td>`
        trTable += `<td class="text-center"> ${pelicula.descripcion} </td>`
        trTable += `<td> ${pelicula.publicado} </td>`
        trTable += `<td class="d-flex justify-content-center"><button type="button " class="btn3 btn btn-outline-warning me-2 " onclick="showmodal(${pelicula.id})">Edit</button>
        <button type="button" class="btn3 btn btn-outline-danger " onclick="eliminarPelicula('${index}')">Delete</button></td>`;
        trTable += " </tr>";
    });
    document.querySelector('#cuerpoTabla').innerHTML = trTable
}


function confirmarOperacion(){
    return confirm("¿ Desea realizar esta operacion ?")
}

function eliminarPelicula(index){
 let confirmacion = confirmarOperacion()
 if(confirmacion){
 catalogo.peliculas.splice(index,1)
renderTabla()
guardarPeliculas()
 }
}
let id_pelicula=null

// En esta funcion uso el .find para encontrar el elemento por id por eso el pelicula.id 
function showmodal(id){
    editmodal.show()   
    id_pelicula=id
// guardo el arreglo que encontre por el id en la const peliculaEncontrada
   const peliculaEncontrada = catalogo.peliculas.find(pelicula => pelicula.id === id_pelicula)
   
// Declaro los campos del nuevo modal donde se cargaran los datos
   const tituloInput2 = document.getElementById("titleEdit")
   const categoriaInput2 = document.getElementById("CategoriaEdit")
   const message_2 = document.getElementById("message_2")
   const fechaInput2 = document.getElementById("dateEdit")
   const img_urlInput2 = document.getElementById("Url-ImgEdit")

// le  paso los datos al los elementos de la ventana modal

   tituloInput2.value=peliculaEncontrada.nombre
   categoriaInput2.value=peliculaEncontrada.categoria
   message_2.value=peliculaEncontrada.descripcion
   fechaInput2.value=peliculaEncontrada.publicado
   img_urlInput2.value=peliculaEncontrada.imagen
}

function tablaeditada(event){

// Ahora me importa la posicion de los elementos 
let confiacioneditada=confirmarOperacion()
if(confiacioneditada){
const index = catalogo.peliculas.findIndex(pelicula => pelicula.id == id_pelicula )
event.preventDefault()
console.log(id_pelicula)
// Declaro los campos del nuevo modal donde se cargaran los datos
const tituloInput2 = document.getElementById("titleEdit")
const categoriaInput2 = document.getElementById("CategoriaEdit")
const message_2 = document.getElementById("message_2")
const fechaInput2 = document.getElementById("dateEdit")
const img_urlInput2 = document.getElementById("Url-ImgEdit")

catalogo.peliculas[index].nombre      =   tituloInput2.value
catalogo.peliculas[index].categoria   =   categoriaInput2.value
catalogo.peliculas[index].descripcion =   message_2.value
catalogo.peliculas[index].publicado   =   fechaInput2.value
catalogo.peliculas[index].imagen      =   img_urlInput2.value
renderTabla()
guardarPeliculas()
editmodal.hide()
}
}

//Eventos
form.addEventListener("submit", crearpelicula)
form2.addEventListener("submit", tablaeditada)
window.addEventListener("load", iniciarApp)