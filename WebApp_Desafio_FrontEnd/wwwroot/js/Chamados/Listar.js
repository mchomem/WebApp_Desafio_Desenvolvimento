$(document).ready(function () {

    consultarDepartamentos();

    const table = $('#dataTables-Chamados').DataTable({
        paging: false,
        ordering: false,
        info: false,
        searching: false,
        processing: true,
        serverSide: true,
        ajax: {
            url: `${config.contextPath}Chamados/Datatable`,
            type: 'POST',
            data: function (d) {
                d.assunto = $('#Assunto').val();
                d.solicitante = $('#Solicitante').val();
                d.idDepartamento = $('#IdDepartamento').val();

                // TODO: passar um d.filtros.assunto aqui. No backend, criar uma classe Filtros com esses atributos.
            }
        },
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

    $('#buttonLimpar').click(function () {
        window.location.reload();
    });

    $('#buttonConsultar').click(function () {
        table.draw();
    });

    // Implementação de duplo click no elemento TR da table.
    $('#dataTables-Chamados tbody').on('dblclick', 'tr', function () {
        const data = table.row(this).data();
        window.location.href = `${config.contextPath}Chamados/Editar/${data.ID}`;
    });

    $('#btnRelatorio').click(function () {
        const assunto = $('#Assunto').val();
        const solicitante = $('#Solicitante').val();
        const idDepartamento = $('#IdDepartamento').val();

        window.location.href = `${config.contextPath}Chamados/Report?assunto=${assunto}&solicitante=${solicitante}&idDepartamento=${idDepartamento}`;
    });

    $('#btnAdicionar').click(function () {
        window.location.href = `${config.contextPath}Chamados/Cadastrar`;
    });

    $('#btnEditar').click(function () {
        const data = table.row('.selected').data();

        if (data == undefined) {
            Swal.fire({
                title: "Atenção",
                text: 'Selecione um registro da listagem para editá-lo e clique no botão Editar ou clique duas vezes com botão esquerdo do mouse sobre o registro!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
        }

        window.location.href = `${config.contextPath}Chamados/Editar/${data.ID}`;
    });

    $('#btnExcluir').click(function () {
        const data = table.row('.selected').data();

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
                text: `Tem certeza de que deseja excluir ${data.Assunto} ?`,
                icon: "question",
                showCancelButton: true,
            }).then(function (result) {

                if (result.value) {
                    $.ajax({
                        url: `${config.contextPath}Chamados/Excluir/${idRegistro}`,
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
                            }).then(function() {
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

function consultarDepartamentos() {
    $.ajax({
        url: `${config.contextPath}Departamentos/Datatable`,
        type: 'GET',
        contentType: 'application/json',
        success: function (result) {
            let selectDepartamento = $('#IdDepartamento');
            selectDepartamento.empty();
            selectDepartamento.append('<option value="">Selecione uma opção</option>');

            const data = result.data;

            $.each(data, function (index, item) {
                selectDepartamento.append($('<option>', {
                    value: item.ID,
                    text: item.Descricao
                }));
            });
        },
        error: function (error) {
            Swal.fire({
                title: "Erro",
                text: 'Falha ao consultar os dados de Departamento.',
                confirmButtonText: 'OK',
                icon: 'error'
            });
        }
    });
}