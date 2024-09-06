$(document).ready(function() {
    var tabla = $('#tblVenta').DataTable({
        "paging": false,          
        "info": false,            
        "searching": false,       
        "language": {
            "emptyTable": "No hay datos disponibles en la tabla"
        }
    });

    // Actualiza el total a pagar
    function actualizarTotal() {
        var total = 0;
        tabla.rows().every(function() {
            var data = this.data();
            total += parseFloat(data[7]);  // Índice 7 es el total
        });
        $('#totalPagar').text(total.toFixed(2));
    }

    // Evento para el botón "Agregar"
    $('#btnAgregar').on('click', function() {
        var cliente = $('#Nombre').val();
        var ruc_dni = $('#DNI').val();
        var producto = $('#Producto').val();
        var descripcion = $('#Descripcion').val();
        var categoria = $('#Categoria').val();
        var cantidad = $('#Cantidad').val();
        var precio = $('#PrecioXUnidad').val();
        var total = cantidad * precio;

        if(cliente && ruc_dni && producto && descripcion && categoria && cantidad && precio) {
            tabla.row.add([
                cliente,
                ruc_dni,
                producto,
                descripcion,
                categoria,
                cantidad,
                precio,
                total.toFixed(2),
                `<button class="editarBtn"><i class="fa-solid fa-pencil"></i></button> <button class="borrarBtn"><i class="fa-solid fa-trash"></i></button>`
            ]).draw(false);

            actualizarTotal();  // Actualizar el total

            // Limpiar campos
            $('#Producto').val('');
            $('#Descripcion').val('');
            $('#Cantidad').val('');
            $('#PrecioXUnidad').val('');
        } else {
            swal("Error", "Por favor, complete todos los campos.", "error");
        }
    });

    // Evento para el botón "Realizar Venta"
    $('#btnRealizarVenta').on('click', function() {
        // Vaciar la tabla
        tabla.clear().draw();
        // Reiniciar el total a pagar
        $('#totalPagar').text('0.00');
        swal("Venta exitosa", {
            icon: "success",
        });
    });

    // Función para editar
    $('#tblVenta tbody').on('click', '.editarBtn', function() {
        var row = tabla.row($(this).parents('tr'));
        var data = row.data();

        // Cargar los datos de la fila en los campos de entrada
        $('#Nombre').val(data[0]);
        $('#DNI').val(data[1]);
        $('#Producto').val(data[2]);
        $('#Descripcion').val(data[3]);
        $('#Categoria').val(data[4]);
        $('#Cantidad').val(data[5]);
        $('#PrecioXUnidad').val(data[6]);

        // Remover la fila seleccionada de la tabla
        row.remove().draw(false);
        actualizarTotal();  // Actualizar el total
    });

    // Función para borrar
    $('#tblVenta tbody').on('click', '.borrarBtn', function() {
        var row = tabla.row($(this).parents('tr'));
        swal({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, no podrás recuperar este registro.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                row.remove().draw(false);
                actualizarTotal();  // Actualizar el total
                swal("El registro ha sido eliminado con éxito.", {
                    icon: "success",
                });
            }
        });
    });
});
