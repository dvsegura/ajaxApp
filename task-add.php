<?php 
    include('database.php');
    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $descripcion = $_POST['descripcion'];
        $query = "INSERT INTO task 
                    (name,description) 
                    VALUES('$name','$descripcion')
            ";
        $result = mysqli_query($conection,$query);
        if(!$result){
            die("Query Failed");
        }
        echo "Tarea efectuada correctamente";
    }
 
 ?>