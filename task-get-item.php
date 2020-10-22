<?php
    include('database.php');
    if(isset($_POST['id'])){

        $id = $_POST['id'];
        $query = "SELECT * 
                    FROM task 
                    WHERE id = '$id' 
                ";
        $result = mysqli_query($conection,$query);
        if(!$result){
            die("Query Failed");
        }
        $json = [];
        while($row = mysqli_fetch_array($result)){
            $json [] = [
                'name'=> $row['name'],
                'description' => $row['description'],
                'id' => $row['id']
            ];
        }
        $jsonString = json_encode($json[0]);
        echo $jsonString;
    }
?>