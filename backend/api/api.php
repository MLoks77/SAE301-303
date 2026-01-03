<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/configdb.php';
require_once __DIR__ . '/PHP/users/manager/UserManager.php';
require_once __DIR__ . '/PHP/boxes/boxmanager.php';

require_once __DIR__ . '/PHP/stats/StatsManager.php';


$content = file_get_contents('php://input');
$data = json_decode($content, true);
$userManager = new UserManager($pdo);

// Utilisateurs

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
    if ($_GET['action'] === 'check-session') {
        echo json_encode($userManager->checkSession());
        exit;
    }
    if ($_GET['action'] === 'stats') {
        $statsManager = new StatsManager($pdo);
        echo json_encode($statsManager->getAllStats());
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier d'abord les actions spécifiques (réinitialisation, déconnexion)
    if (isset($data['action'])) {
        // Réinitialisation du mot de passe
        if ($data['action'] === 'reset-password') {
            if (isset($data['email']) && isset($data['password'])) {
                $result = $userManager->resetPassword($data['email'], $data['password']);
                if ($result['success']) {
                    http_response_code(200);
                    echo json_encode($result);
                } else {
                    http_response_code(400);
                    echo json_encode($result);
                }
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Email et mot de passe requis.']);
            }
            exit;
        }

        // Déconnexion
        if ($data['action'] === 'logout') {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            $id_user = $_SESSION['id_user'] ?? null;
            if ($id_user) {
                echo json_encode($userManager->logout($id_user));
            } else {
                echo json_encode(['success' => true, 'message' => 'Déjà déconnecté']);
            }
            exit;
        }
    }

    // Inscription
    if (isset($data['nom']) && !isset($data['action'])) {
        try {
            $userManager->insertUser($data);
            http_response_code(201);
            echo json_encode(['reponse' => 'utilisateur créé', 'success' => true]);
            exit;
        } catch (Exception $e) {
            http_response_code($e->getMessage() === "L'email existe déjà" ? 409 : 400);
            echo json_encode(['error' => $e->getMessage(), 'success' => false]);
            exit;
        }
    }

    // Connexion (seulement si pas d'action spécifique)
    if (isset($data['email']) && isset($data['password']) && !isset($data['action'])) {
        $result = $userManager->login($data['email'], $data['password']);
        if ($result['success']) {
            http_response_code(200);
            echo json_encode($result);
        } else {
            http_response_code(401);
            echo json_encode(['reponse' => $result['message'], 'success' => false]);
        }
        exit;
    }


}

// Boxes
$boxManager = new BoxManager($pdo);
try {
    if (isset($_GET['id_produit'])) {
        $boxes = $boxManager->findById($_GET['id_produit']);
    } else {
        $boxes = $boxManager->findAll();
    }
    echo json_encode($boxes);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la récupération des produits']);
}
exit;
?>