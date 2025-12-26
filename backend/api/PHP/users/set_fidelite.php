<?php
// maxime Derènes
session_start();
require __DIR__ . '/../../../config/configdb.php';
require_once __DIR__ . '/manager/UserManager.php';

$userManager = new UserManager($pdo);

if (isset($_SESSION['id_user']) && isset($_POST['fidelite'])) {
    $userManager->setFidelite($_SESSION['id_user'], $_POST['fidelite']);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Non connecté ou données manquantes']);
}

exit;