<?php

class BoxManager
{
    private $pdo;
    private $boxes;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function findAll()
    {
        $boxes = $this->pdo->query("SELECT * FROM produit")->fetchAll(PDO::FETCH_ASSOC);
        return $boxes;
    }

    public function findById($id_produit)
    {
        $query = $this->pdo->prepare("SELECT * FROM produit WHERE id_produit = ?");
        $query->execute([$id_produit]);
        // on doit utiliser PDO::FETCH_ASSOC pour éviter les index numériques inutiles, car sinon après chaque requête sa spam 0 : ... , 1 : ... etc
        $boxes = $query->fetchAll(PDO::FETCH_ASSOC);
        return $boxes;
    }
}


?>