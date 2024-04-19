$(document).ready(function () {

    $('.glyphicon-calendar').closest("div.date").datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: false,
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: 'pt-BR'
    });

    $('#btnCancelar').click(function () {
        Swal.fire({
            html: "Deseja cancelar essa operação? O registro não será salvo.",
            type: "warning",
            showCancelButton: true,
        }).then(function (result) {
            if (result.value) {
                history.back();
            } else {
                console.log("Cancelou a inclusão.");
            }
        });
    });

    $('#btnSalvar').click(function () {

        if ($('#txtAssunto').val() == '') {
            Swal.fire({
                text: 'Informe o Assunto!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        if ($('#txtAssunto').val().length > 40) {
            Swal.fire({
                text: 'Tamanho máximo do campo Assunto é de 40 caracteres!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        if ($('#txtSolicitante').val() == '') {
            Swal.fire({
                text: 'Informe o Solicitante!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        if ($('#txtSolicitante').val().length > 20) {
            Swal.fire({
                text: 'Tamanho máximo do campo Solicitante é de 20 caracteres!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        var data = $('#dtAbertura').val();
        var partes = data.split('/');
        var day = partes[0];
        var month = partes[1];
        var year = partes[2];
        var dataUS = `${year}-${month}-${day}`

        if (new Date(dataUS) < new Date()) {
            Swal.fire({
                text: 'Chamados não podem ser criados com data retroativa!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        if ($('#form').valid() != true) {
            FormularioInvalidoAlert();
            return;
        }

        let chamado = SerielizeForm($('#form'));
        let url = $('#form').attr('action');

        $.ajax({
            type: "POST",
            url: url,
            data: chamado,
            success: function (result) {

                Swal.fire({
                    type: result.Type,
                    title: result.Title,
                    text: result.Message,
                }).then(function () {
                    window.location.href = config.contextPath + result.Controller + '/' + result.Action;
                });

            },
            error: function (result) {

                Swal.fire({
                    text: result,
                    confirmButtonText: 'OK',
                    icon: 'error'
                });

            },
        });
    });

});
