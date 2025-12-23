<?php
// maxime Derènes
require_once __DIR__ . '/manager/UserManager.php';

$userManager = new UserManager($pdo);
echo json_encode($userManager->checkSession());
exit;
