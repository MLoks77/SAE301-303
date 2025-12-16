<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../api/produits/boxmanager.php';
// box bouffe
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

// ajouter les autres API

?>