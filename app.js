$(function(){
    console.log("jquery funcionando");
    $('#task-result').hide();
    $('#search').keyup(function (e){
        if($('#search').val()){
      
            let search = $('#search').val();
            $.ajax({
                url :'task-search.php',
                type :'POST',
                data :{search},
                success: function(response){
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
});