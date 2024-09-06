function pagAdmin(){
    window.location.href = "../html/RegistroV.html";
    return false;
}

function crearUsuario() {
    // Limpiar formulario
    document.getElementById('crearUsuarioForm').reset();

    // Mostrar mensaje de confirmación
    swal("Éxito", "Usuario creado", "success");
}