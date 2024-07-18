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
            html: "Deseja cancelar essa operação?<br><br> O registro não será salvo.",
            icon: "question",
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

        if ($('#txtDescricao').val() == '') {
            Swal.fire({
                title: "Atenção",
                text: 'Informe a Descrição!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        if ($('#txtDescricao').val().length > 20) {
            Swal.fire({
                title: "Atenção",
                text: 'Tamanho máximo do campo Descrição é de 20 caracteres!',
                confirmButtonText: 'OK',
                icon: 'warning'
            });
            return;
        }

        if ($('#form').valid() != true) {
            FormularioInvalidoAlert();
            return;
        }

        let departamento = SerielizeForm($('#form'));
        let url = $('#form').attr('action');

        $.ajax({
            type: "POST",
            url: url,
            data: departamento,
            success: function (result) {
                Swal.fire({
                    //title: result.Title,
                    title: 'Sucesso',
                    text: result.Message,
                    icon: result.Type,
                }).then(function () {
                    window.location.href = config.contextPath + result.Controller + '/' + result.Action;
                });
            },
            error: function (result) {
                Swal.fire({
                    title: "Erro",
                    text: result,
                    confirmButtonText: 'OK',
                    icon: 'error'
                });
            },
        });
    });
});
