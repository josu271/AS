$(document).ready(function () {
    // Inicializar DataTable
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
        tabla.rows().every(function () {
            var data = this.data();
            total += parseFloat(data[5]);  // Índice 5 es el total
        });
        $('#totalPagar').text(total.toFixed(2));
    }

    // Evento para el botón "Agregar"
    $('#btnAgregar').on('click', function () {
        var producto = $('#Producto').val();
        var descripcion = $('#Descripcion').val();
        var categoria = $('#Categoria').val();
        var cantidad = $('#Cantidad').val();
        var precio = $('#PrecioXUnidad').val();
        var total = cantidad * precio;

        // Validación de campos
        if (producto && descripcion && categoria && cantidad && precio) {
            // Agregar fila a la tabla
            tabla.row.add([
                producto,
                descripcion,
                categoria,
                cantidad,
                precio,
                total.toFixed(2),
                `<button class="editarBtn"><i class="fas fa-edit"></i></button> <button class="borrarBtn"><i class="fas fa-trash-alt"></i></button>`
            ]).draw(false);

            actualizarTotal();  // Actualizar el total

            // Limpiar campos
            $('#Producto').val('');
            $('#Descripcion').val('');
            $('#Categoria').val('');
            $('#Cantidad').val('');
            $('#PrecioXUnidad').val('');

        } else {
            swal("Error", "Por favor, complete todos los campos.", "error");
        }
    });

    // Evento para el botón "Realizar Venta"
    $('#btnRealizarVenta').on('click', function () {
        console.log("Botón 'Realizar Venta' presionado");  // Debugging
        var totalPagar = $('#totalPagar').text();
        if (totalPagar == '0.00') {
            swal("Error", "No hay productos para realizar la venta", "error");
            return;
        }

        // Generar PDF
        const { jsPDF } = window.jspdf;
        var doc = new jsPDF();
        
        // Añadir el logo
        var logoImg = new Image();
        logoImg.src = '../img/LOGO_ANGEL (1).png'; // Asegúrate de que la ruta es correcta

        logoImg.onload = function () {
            console.log("Imagen cargada correctamente");  // Debugging
            // Añadir la imagen del logo al PDF
            doc.addImage(logoImg, 'PNG', 10, 10, 40, 40); // Ajusta las posiciones y tamaño según sea necesario

            // Añadir datos de la empresa
            doc.setFontSize(12);
            doc.text('RUC: 20603070055', 70, 20);
            doc.text('Nombre: GIGANTOGRAFIAS EL ANGEL S.A.C', 70, 30);
            doc.text('Telefono: 931-775-746', 70, 40);

            // Añadir fecha actual
            var today = new Date();
            var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            doc.text('Fecha: ' + date, 70, 50);

            // Añadir tabla de productos
            doc.autoTable({ 
                html: '#tblVenta', 
                startY: 60 
            });

            // Añadir total a pagar
            doc.text('Total a Pagar: S/.' + totalPagar, 14, doc.autoTable.previous.finalY + 10);

            // Descargar el PDF
            doc.save('Cotejo_Gigantografia_El_Angel.pdf');

            // Vaciar la tabla
            tabla.clear().draw();
            // Reiniciar el total a pagar
            $('#totalPagar').text('0.00');
            swal("Venta exitosa", "Total a pagar: S/." + totalPagar, "success");
        };

        logoImg.onerror = function () {
            console.error("Error al cargar la imagen");  // Debugging
            swal("Error", "No se pudo cargar la imagen del logo", "error");
        };
    });

    // Función para editar
    $('#tblVenta tbody').on('click', '.editarBtn', function () {
        var data = tabla.row($(this).parents('tr')).data();
        $('#Producto').val(data[0]);
        $('#Descripcion').val(data[1]);
        $('#Categoria').val(data[2]);
        $('#Cantidad').val(data[3]);
        $('#PrecioXUnidad').val(data[4]);
        tabla.row($(this).parents('tr')).remove().draw();
        actualizarTotal();
    });

    // Función para borrar
    $('#tblVenta tbody').on('click', '.borrarBtn', function () {
        tabla.row($(this).parents('tr')).remove().draw();
        actualizarTotal();
        swal("Eliminado", "Producto eliminado de la lista", "success");
    });
});
