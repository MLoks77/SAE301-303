<?php


$servername = "localhost"; // 
$username = "root";        
$password = "";            
$database = "";     

$conn = new mysqli($servername, $username, $password, $database);

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>
    


