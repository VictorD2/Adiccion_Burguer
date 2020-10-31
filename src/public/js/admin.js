// CARTA

//Editar Producto
const botonesEditProduct = document.getElementsByClassName('editProducto'); //Todos los botones edit de la tabla
for (var i = 0; i < botonesEditProduct.length; i++) {
    let idProducto = botonesEditProduct[i].classList[4]; //La id de los productos
    botonesEditProduct[i].addEventListener("click", () => { //Se les asigna un evento a cada boton
        var inputsCarta = document.getElementsByClassName(idProducto); //Los 3 inputs {Nombre, Precio, Detalles} y elboton editar
        for (var i = 0; i < 3; i++) {
            inputsCarta[i].removeAttribute("disabled"); //Remueve el atributo disabled
        }
        document.getElementById("formb" + idProducto).removeChild(inputsCarta[3]); //Se quita el boton editar
        var botonSubmit = document.createElement("button"); //Crea un boton
        botonSubmit.innerHTML = '<i class = "fas fa-save"> </i>'; //Se le agrega el icono
        botonSubmit.classList.add("btn"); //Clase
        botonSubmit.classList.add("btn-purple"); //Clase
        botonSubmit.addEventListener("click", () => { //Evento click
            var form = document.getElementById("form" + idProducto); //El form de esa fila
            form.submit();
        });
        document.getElementById("formb" + idProducto).appendChild(botonSubmit); //Se agrega el boton submit (el boton guardar)
    });
}

//Eliminar Producto
const botonesDeleteProduct = document.getElementsByClassName('delete'); //Todos los botones delete de la tabla
for (var i = 0; i < botonesDeleteProduct.length; i++) {
    let idProducto = botonesDeleteProduct[i].classList[4]; //Id del producto
    botonesDeleteProduct[i].addEventListener("click", () => {
        var btnYes = document.getElementById('yes'); //El boton si de la modal delete
        btnYes.addEventListener("click", () => { //Se le asigna un evento
            window.location.href = "/Carta/delete/" + idProducto; //Redirige a este enlace
        });
    });
}

// --------------------------------------------

//USUARIO

//Poner una contraseña por defecto
const inputsOrigen = document.getElementsByClassName('passw');
for (var i = 0; i < inputsOrigen.length; i++) {
    inputsOrigen[i].addEventListener("keyup", () => {
        var inputPassword = document.getElementById('passwordCreate');
        inputPassword.setAttribute('value', inputsOrigen[0].value + inputsOrigen[1].value);
    });
}

//Poner valores en el formulario de editar de usuario
const botonesEditUsuario = document.getElementsByClassName("editUserButton"); //Botones Editar Usuario
const inputsEditar = document.getElementsByClassName("editInput"); //Inputs de la ventana modal editar usuario
for (let i = 0; i < botonesEditUsuario.length; i++) {
    botonesEditUsuario[i].addEventListener("click", () => {
        let id = botonesEditUsuario[i].classList[3];
        let values = document.getElementsByClassName("fila" + id);
        for (var j = 0; j < inputsEditar.length; j++) {
            inputsEditar[j].setAttribute('value', values[j].textContent);
        }
        //Asignar valor al combobox
        var comboBoxCargo = document.getElementById("comboBoxCargo");
        var cargoTabla = document.getElementById('cargoTabla' + id).textContent;
        if (cargoTabla == " Administrador") {
            comboBoxCargo.options.selectedIndex = 0;
        } else if (cargoTabla == " Cocinero") {
            comboBoxCargo.options.selectedIndex = 1;
        } else if (cargoTabla == " Repartidor") {
            comboBoxCargo.options.selectedIndex = 2;
        } else if (cargoTabla == " Despachador") {
            comboBoxCargo.options.selectedIndex = 3;
        } else if (cargoTabla == " Almacen") {
            comboBoxCargo.options.selectedIndex = 4;
        }
    });
}

//Borrar Usuario
const botonesDeleteUser = document.getElementsByClassName('deleteUserButton'); //Todos los botones Delete
for (var i = 0; i < botonesDeleteUser.length; i++) {
    let id = botonesDeleteUser[i].classList[3];
    botonesDeleteUser[i].addEventListener("click", () => {
        let btnYesUserDelete = document.getElementById('yesUserDelete'); //El boton si de la modal delete user
        btnYesUserDelete.addEventListener("click", () => { //Se le asigna un evento
            console.log(id);
            window.location.href = "/Usuarios/delete/" + id; //Redirige a este enlace
        });
    });
}