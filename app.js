$(function () {
    let editando = false;
    console.log("jquery funcionando");
    $("#task-result").hide();
    generarListadoTareas();

    $("#search").keyup(function (e) {
        if ($("#search").val()) {
            let search = $("#search").val();
            $.ajax({
                url: "task-search.php",
                type: "POST",
                data: { search },
                success: function (response) {
                    let tasks = JSON.parse(response);
                    let templete = "";
                    tasks.forEach((task) => {
                        templete += `<li>${task.name}</li>`;
                    });
                    $("#container").html(templete);
                    $("#task-result").show();
                },
            });
        }
    });

    $("#task-form").submit(function (e) {
        const postData = {
            name: $("#name").val(),
            descripcion: $("#description").val(),
            id: $("#task-id").val()
        };
        let url = editando === false ? 'task-add.php' : 'task-update.php';
        $.post(url, postData, function (response) {
            console.log(response);
            generarListadoTareas();
            $("#task-form").trigger("reset");
        });
        e.preventDefault();
    });

    function generarListadoTareas() {
        $.ajax({
            url: "task-list.php",
            type: "GET",
            success: function (response) {
                let task = JSON.parse(response);
                let template = "";
                task.forEach((task) => {
                    template += `
                        <tr taskId='${task.id}'>
                            <td>${task.id}</td>
                            <td>
                                <a href='#' class="task-item">${task.name}
                                </a>
                            </td>
                            <td>${task.descripcion}</td>
                            <td><button class='task-delete btn btn-danger'>
                                     Delete
                                </button></td>
                        </tr>
                    `;
                });
                $("#task").html(template);
            },
        });
    }

    $(document).on("click", ".task-delete", function () {

        if (confirm("Está seguro que quiere eliminar esta task?")) {
            let element = $(this)[0].parentElement.parentElement; //obtener id
            let id = $(element).attr("taskId");
            $.post("task-delete.php", { id }, function (response) {
                generarListadoTareas();
            });
        }
    });
    $(document).on('click', '.task-item', function () {

        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');

        $.post('task-get-item.php', { id }, function (response) {
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#task-id').val(task.id);
        });
        editando = true;
    });


});
