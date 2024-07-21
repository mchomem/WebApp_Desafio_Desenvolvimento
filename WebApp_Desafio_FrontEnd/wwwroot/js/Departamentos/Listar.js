$(document).ready(function () {

    var table = $('#dataTables-Departamentos').DataTable({
        paging: false,
        ordering: false,
        info: false,
        searching: false,
        processing: true,
        serverSide: true,
        ajax: config.contextPath + 'Departamentos/Datatable',
        columns: [
            {
                data: 'ID'
                , width: '50px'
            },
            {
                data: 'Descricao'
                , title: 'Descrição'
            },
        ],
    });

    $('#dataTables-Departamentos tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    // Implementação de duplo click no elemento TR da table.
    $('#dataTables-Departamentos tbody').on('dblclick', 'tr', function () {
        var data = table.row(this).data();
        window.location.href = config.contextPath + 'Departamentos/Editar/' + data.ID;
    });

    $('#btnRelatorio').click(function () {
        window.location.href = config.contextPath + 'Departamentos/Report';
    });

    $('#btnAdicionar').click(function () {
        window.location.href = config.contextPath + 'Departamentos/Cadastrar';
    });

    $('#btnEditar').click(function () {
        var data = table.row('.selected').data();

        if (data == undefined) {
            Swal.fire({
                title: "Atenção",
                text: 'Selecione um registro da listagem para editá-lo e clique no botão Editar ou clique duas vezes com botão esquerdo do mouse sobre o registro!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
        }

        window.location.href = config.contextPath + 'Departamentos/Editar/' + data.ID;
    });

    $('#btnExcluir').click(function () {

        let data = table.row('.selected').data();

        if (data == undefined) {
            Swal.fire({
                title: "Atenção",
                text: 'Selecione um registro da listagem para excluí-lo!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
        }

        let idRegistro = data.ID;

        if (!idRegistro || idRegistro <= 0) {
            return;
        }

        if (idRegistro) {
            Swal.fire({
                title: "Atenção",
                text: "Tem certeza de que deseja excluir " + data.Assunto + " ?",
                type: "warning",
                showCancelButton: true,
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: config.contextPath + 'Departamentos/Excluir/' + idRegistro,
                        type: 'DELETE',
                        contentType: 'application/json',
                        error: function (result) {
                            Swal.fire({
                                title: "Erro",
                                text: result,
                                confirmButtonText: 'OK',
                                icon: 'error'
                            });
                        },
                        success: function (result) {
                            Swal.fire({
                                type: result.Type,
                                title: result.Title,
                                text: result.Message,
                            }).then(function () {
                                table.draw();
                            });
                        }
                    });
                } else {
                    console.log("Cancelou a exclusão.");
                }
            });
        }
    });
});
