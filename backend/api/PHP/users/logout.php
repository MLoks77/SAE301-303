<?php
// maxime Derènes

require_once __DIR__ . '/manager/UserManager.php';

session_start();

if (isset($_SESSION['id_user'])) {
    $userManager = new UserManager($pdo);
    $userManager->logout($_SESSION['id_user']);
} else {
    session_destroy();
}

header('Content-Type: application/json');
echo json_encode(['reponse' => 'Déconnexion réussie']);
exit;
?>