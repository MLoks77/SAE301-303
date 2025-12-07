<!-- par maxime derènes, ajouts par Joachim -->

<?php

require '../../../config/configdb.php'; // connexion
require '../manager/UserManager.php'; // fonctions pour insert par exemple

$content = file_get_contents('php://input');
$data = json_decode($content, true);

$required_fields = ['nom', 'prenom', 'email', 'password', 'telephone', 'adresse']; // Champs obligatoires selon insertUser

$missing = [];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $missing[] = $field;
    }
}

if (!empty($missing)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['reponse' => 'donnée(s) manquante(s): ' . implode(', ', $missing)]);
    exit;
} else {
    // Vérifier que l'email n'existe pas déjà
    $sql = "SELECT * FROM utilisateur WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $data['email']]);
    $utilisateur = $stmt->fetch();

    if ($utilisateur) {
        http_response_code(409); // Conflit : email déjà pris
        header('Content-Type: application/json');
        echo json_encode(['reponse' => "L'email existe déjà"]);
        exit;
    }

    $userManager = new UserManager($pdo); // On crée une instance de UserManager pour pouvoir utiliser ses méthodes
    $userManager->insertUser($data);

    http_response_code(201);
    header('Content-Type: application/json');
    echo json_encode(['reponse' => 'utilisateur créé']);
}

// TP1 Le Vessnard
// Le code HTTP 201 informe que la resource a été créée.
// Définition du type de réponse (json).
// json_decode transforme un tableau (ou objet) en format json, qui s’affichera (echo) en réponse. 

?>