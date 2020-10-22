<?php
    include('database.php');
    if(isset($_POST['name'])){
      
        $name = $_POST['name'];
        $description = $_POST['descripcion'];
        $id = $_POST['id'];
        $query = "UPDATE task
                    SET name = '$name',
                        description = '$description'                     
                    WHERE id = '$id' 
                ";
        $result = mysqli_query($conection,$query);
        if(!$result){
            die("Query Failed");
        }
        echo "Operación efectuada correctamente.";
    }
?>