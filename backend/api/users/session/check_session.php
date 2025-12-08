<?php
/**
 * API pour vérifier l'état de connexion de l'utilisateur
 * Retourne un JSON indiquant si l'utilisateur est connecté
 */

session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200'); // Port Angular par défaut
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Vérifier si l'utilisateur est connecté
// On vérifie à la fois logged_in (pour compatibilité) et id_user (qui est défini lors du login)
$isLoggedIn = false;

if (isset($_SESSION["logged_in"]) && $_SESSION["logged_in"] === true) {
    $isLoggedIn = true;
} elseif (isset($_SESSION["id_user"]) && !empty($_SESSION["id_user"])) {
    $isLoggedIn = true;
    // Mettre à jour logged_in pour compatibilité
    $_SESSION["logged_in"] = true;
}

echo json_encode([
    'logged_in' => $isLoggedIn,
    'user_id' => isset($_SESSION["id_user"]) ? $_SESSION["id_user"] : null
]);

