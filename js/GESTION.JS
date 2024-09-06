$(document).ready(function() {
    // Inicializa la tabla con DataTables
    var table = $('#miTabla').DataTable({
        // Oculta el selector de longitud de entradas y la barra de búsqueda
        "dom": 't',  // Solo muestra la tabla
        "paging": true,  // Mantiene la paginación
        "lengthChange": false,  // Desactiva el selector "Mostrar entradas"
        "language": {
            "emptyTable": "No hay datos disponibles",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });

    // Funcionalidad de búsqueda por Nombre
    $('#btnBuscar').on('click', function() {
        var valorNombre = $('#buscar').val(); // Obtiene el valor de la caja de texto
        table.column(1).search(valorNombre).draw(); // Busca en la columna del Nombre (columna 1)
    });

    // Funcionalidad para eliminar usando SweetAlert
    $('#miTabla tbody').on('click', '.btnEliminar', function() {
        var row = $(this).closest('tr'); // Encuentra la fila a la que pertenece el botón
        var nombre = row.find('td:nth-child(2)').text(); // Extrae el nombre de la fila

        // Confirmación con SweetAlert
        swal({
            title: "¿Estás seguro?",
            text: "Vas a eliminar a " + nombre,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                // Elimina la fila
                table.row(row).remove().draw();
                swal("Usuario " + nombre + " eliminado correctamente", {
                    icon: "success",
                });
            }
        });
    });
});
