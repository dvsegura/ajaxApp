$(function () {
    console.log("jquery funcionando");
    $('#task-result').hide();
    fetchTaks();

    $('#search').keyup(function (e) {
        if ($('#search').val()) {

            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: { search },
                success: function (response) {
                    let tasks = JSON.parse(response);
                    //console.log(tasks);
                    let templete = '';
                    tasks.forEach(task => {
                        templete += `<li>${task.name}</li>`;
                    });
                    $('#container').html(templete);
                    $('#task-result').show();
                }
            })
        }
    })
    //formulario
    $('#task-form').submit(function (e) {
        const postData = {
            name: $('#name').val(),
            description: $('#description').val()
        }
        //console.log(postData);
        //enviar datos al servidor 
        $.post('task-add.php', postData, function (response) {
            console.log(response);
            fetchTaks();
            $('#task-form').trigger('reset');
        });
        e.preventDefault();
    });

    function fetchTaks() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                //console.log(response);
                let task = JSON.parse(response);
                let template = '';
                task.forEach(task => {
                    template += `
                        <tr>
                            <td>${task.id}</td>
                            <td>${task.name}</td>
                            <td>${task.description}</td>
                            <td><button class='btn btn-danger'>Delete</button></td>
                        </tr>
                    `;
                });
                $('#tasks').html(template);
            }
        });
    }

});