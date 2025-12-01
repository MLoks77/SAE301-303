<!-- maxime derènes -->

<?php
require '../../../config/configdb.php'; // connexion

// id_user api_token nom prenom mail password statut_etud tel adresse fidelite
// id auto increment
//fonction insert
class UserManager
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function insertUser($data)
    {
        $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);
        $sql = "INSERT INTO utilisateur (api_token, nom, prenom, email, password, statut_etud, tel, adresse, fidelite) 
        VALUES (:api_token, :nom, :prenom, :email, :password, :statut_etud, :tel, :adresse, :fidelite)";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'api_token' => isset($data['api_token']) ? $data['api_token'] : null,
            'nom' => isset($data['nom']) ? $data['nom'] : null,
            'prenom' => isset($data['prenom']) ? $data['prenom'] : null,
            'email' => isset($data['email']) ? $data['email'] : null,
            'password' => $passwordHash,
            'statut_etud' => isset($data['statut_etud']) ? $data['statut_etud'] : null,
            'tel' => isset($data['tel']) ? $data['tel'] : null,
            'adresse' => isset($data['adresse']) ? $data['adresse'] : null,
            'fidelite' => isset($data['fidelite']) ? $data['fidelite'] : null,
        ]);
    }

}



?>