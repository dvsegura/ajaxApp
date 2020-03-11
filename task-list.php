<?php 
    include('database.php');
    $query = "SELECT * from task";
    $result = mysqli_query($conection,$query);

    if(!$result){
        die('Query Failed'.mysqli_error($conection));
    }
    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json [] = array(
            'name' => $row['name'],
            'descripcion' => $row['description'],
            'id' => $row['id']
        ); 
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>