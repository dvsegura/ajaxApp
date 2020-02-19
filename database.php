<?php 
    $conection = mysqli_connect( 
        'localhost',
        'root',
        'pasword',
        'task-app'
    );
    if($conection){
        echo "db conectada"; 
    }

?>