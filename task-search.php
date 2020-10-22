<?php 
    include('database.php');
    $search = $_POST['search'];

    if(!empty($search)){
       $query = "SELECT * 
                    FROM task 
                    WHERE name 
                    LIKE '$search%'
        "; 
        $resultado = mysqli_query($conection,$query);    
        if(!$resultado){
            die('Query Error'.mysqli_error($conection));
        }
        $json = array();
        while($row = mysqli_fetch_array($resultado)){
            $json [] = array(
                'name' =>$row['name'],
                'descripcion' => $row['description'],
                'id' => $row['id']
            );
        }        
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>