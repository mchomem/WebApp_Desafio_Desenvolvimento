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
            title: "Pergunta",
            html: "Deseja cancelar essa operação? <br><br>O registro não será salvo.",
            icon: "question",
            showCancelButton: true,
        }).then(function (result) {
            if (result.value) {
                Swal.fire({
                    title: "Mensagem",
                    html: "Cancelou a inclusão.",
                    confirmButtonText: 'OK',
                    icon: "info",
                }).then(() => {
                    history.back();
                });
            }
        });
    });

    $('#btnSalvar').click(function () {

        if ($('#txtAssunto').val() === '') {
            Swal.fire({
                title: "Atenção",
                text: 'Informe o Assunto!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        if ($('#txtAssunto').val().length > 50) {
            Swal.fire({
                title: "Atenção",
                text: 'Tamanho máximo do campo Assunto é de 50 caracteres!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        if ($('#txtSolicitante').val() === '') {
            Swal.fire({
                title: "Atenção",
                text: 'Informe o Solicitante!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        if ($('#txtSolicitante').val().length > 20) {
            Swal.fire({
                title: "Atenção",
                text: 'Tamanho máximo do campo Solicitante é de 20 caracteres!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        const data = $('#dtAbertura').val();
        const partes = data.split('/');
        const day = partes[0];
        const month = partes[1];
        const year = partes[2];
        const dataUS = `${year}-${month}-${day}`

        if (verificarSeDiaAnterior(new Date(dataUS))) {
            Swal.fire({
                title: "Atenção",
                text: 'Chamados não podem ser criados com data retroativa!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        if (!$('#form').valid()) {
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
                    //title: result.Title,
                    title: 'Sucesso',
                    text: result.Message,
                    icon: result.Type,
                }).then(function () {
                    window.location.href = `${config.contextPath}${result.Controller}/${result.Action}`;
                });
            },
            error: function (result) {
                Swal.fire({
                    title: 'Erro',
                    text: result,
                    confirmButtonText: 'OK',
                    icon: 'error'
                });
            },
        });

        function verificarSeDiaAnterior(date) {
            let diaHoje = new Date().getUTCDate();
            let diaCriacao = date.getUTCDate();

            // Se o dia de criação do chamado for igual ou maior, não é retroativo.
            if (diaCriacao >= diaHoje)
                return false;
        }
    });
});
