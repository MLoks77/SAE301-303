<?php

require_once  '../api/produits/boxmanager.php';

if (isset($_GET['id_produit'])) {
    $boxManager = new BoxManager();
    $boxes = $boxManager->findById($_GET['id_produit']);
} else {
    $boxManager = new BoxManager();
    $boxes = $boxManager->findAll();
}


// Déclare le type de contenu json au serveur, afficher le résultat en encodant le tableau en json grâce à json_encode : 
header('Content-Type: application/json: charset=utf-8');

echo json_encode($boxes);

?>