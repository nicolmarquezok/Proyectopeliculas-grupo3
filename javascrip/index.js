const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href = 'Proyectopeliculas-grupo3\pages\admin.html'
}

const logout = document.querySelector('#admin')

logout.addEventListener('click', ()=>{
    alert('Hasta pronto!')
    localStorage.removeItem('login_success')
    window.location.href = '\pages\admin.html'
})