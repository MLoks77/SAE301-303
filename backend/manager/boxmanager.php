<?php

class BoxManager {
    private $pdo;
    private $boxes;

    public function __construct()
    {
        try {
            $this->pdo = new PDO('mysql:host=localhost;dbname=sushi_box;charset=utf8', 'root', '');
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die('Erreur de connexion : ' . $e->getMessage());
        }
    }

    public function findAll()
    {
        $boxes = $this->pdo->query("SELECT * FROM boxes")->fetchAll(PDO::FETCH_ASSOC);

        foreach ($boxes as &$box) {
            $box['price'] = round($box['price'], 2);

            // Étape 2 : foods
            $stmt = $this->pdo->prepare("
                SELECT f.name, CAST(bf.quantity AS UNSIGNED) AS quantity
                FROM box_foods bf
                JOIN foods f ON bf.food_id = f.id
                WHERE bf.box_id = :id
            ");
            $stmt->execute(['id' => $box['id']]);
            $box['foods'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Étape 3 : flavors
            $stmt = $this->pdo->prepare("
                SELECT fl.name
                FROM box_flavors bf
                JOIN flavors fl ON bf.flavor_id = fl.id
                WHERE bf.box_id = :id
            ");
            $stmt->execute(['id' => $box['id']]);
            $box['flavors'] = array_column($stmt->fetchAll(PDO::FETCH_ASSOC), 'name');
        }

        return $boxes;
    }

    public function findById($id)
    {
        $query = $this->pdo->prepare("SELECT * FROM boxes WHERE id = ?");
        $query->execute([$id]);
        $boxes = $query->fetchAll();
        return $boxes;
    }
} 


?>