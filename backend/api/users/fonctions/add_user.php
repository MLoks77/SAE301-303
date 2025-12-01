<!-- par maxime derènes -->

<?php

require '../../../config/configdb.php'; // connexion
require '../manager/UserManager.php'; // fonctions pour insert par exemple




if (
    !isset($data['prenom'], $data['nom'], $data['email'], $data['password'])
) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['reponse' => 'données manquantes']);
    exit;
}

$userManager = new UserManager($pdo); // On crée une instance de UserManager pour pouvoir utiliser ses méthodes
$userManager->insertUser($data);

http_response_code(201);
header('Content-Type: application/json');
echo json_encode(['reponse' => 'utilisateur créé']);

// TP1 Le Vessnard
// Le code HTTP 201 informe que la resource a été créée.
// Définition du type de réponse (json).
// json_decode transforme un tableau (ou objet) en format json, qui s’affichera (echo) en réponse. 

?>