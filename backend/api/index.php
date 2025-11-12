<?php 

require_once '../../manager/boxmanager.php';

if (isset($_GET['id'])){
$boxManager = new BoxManager();
$boxes = $boxManager->findById($_GET['id']);
}else{
    $boxManager = new BoxManager();
    $boxes = $boxManager->findAll();
}


// Déclare le type de contenu json au serveur, afficher le résultat en encodant le tableau en json grâce à json_encode : 
header('Content-Type: application/json: charset=utf-8');

echo json_encode($boxes );

?>
