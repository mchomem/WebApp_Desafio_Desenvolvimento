$(document).ready(function () {

    var table = $('#dataTables-Chamados').DataTable({
        paging: false,
        ordering: false,
        info: false,
        searching: false,
        processing: true,
        serverSide: true,
        ajax: config.contextPath + 'Chamados/Datatable',
        columns: [
            { data: 'ID' },
            { data: 'Assunto' },
            { data: 'Solicitante' },
            { data: 'Departamento' },
            {
                data: 'DataAberturaWrapper'
                , title: 'Data de Abertura'
                , render: function (data) {
                    return `<div class='text-center'>${data}</div>`
                }
            },
        ],
    });

    $('#dataTables-Chamados tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    // Implementação de duplo click no elemento TR da table.
    $('#dataTables-Chamados tbody').on('dblclick', 'tr', function () {
        var data = table.row(this).data();
        window.location.href = config.contextPath + 'Chamados/Editar/' + data.ID;
    });

    $('#btnRelatorio').click(function () {
        window.location.href = config.contextPath + 'Chamados/Report';
    });

    $('#btnAdicionar').click(function () {
        window.location.href = config.contextPath + 'Chamados/Cadastrar';
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

        window.location.href = config.contextPath + 'Chamados/Editar/' + data.ID;
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
                title: "Pergunta",
                text: "Tem certeza de que deseja excluir " + data.Assunto + " ?",
                icon: "question",
                showCancelButton: true,
            }).then(function (result) {

                if (result.value) {
                    $.ajax({
                        url: config.contextPath + 'Chamados/Excluir/' + idRegistro,
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
