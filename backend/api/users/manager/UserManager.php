<!-- maxime derènes -->

<?php
require_once __DIR__ . '/../../../config/configdb.php'; // connexion

// id_user api_token nom prenom mail password statut_etud tel adresse fidelite
// id auto increment
// fonction insert
class UserManager
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function insertUser($data)
    {
        // Note: 'email_inscr' et 'mdp_inscr' viennet de la page de joaquim
        $nom = $data['nom'] ?? null;
        $prenom = $data['prenom'] ?? null;
        $email = $data['email'] ?? ($data['email_inscr'] ?? null);
        $password = $data['password'] ?? ($data['mdp_inscr'] ?? null);
        $tel = $data['telephone'] ?? ($data['tel'] ?? null);
        $adresse = $data['adresse'] ?? null;

        if (!$nom || !$prenom || !$email || !$password || !$tel || !$adresse) {
            throw new Exception("Données manquantes : nom, prenom, email, password, telephone et adresse sont requis.");
        }

        $sqlCheck = "SELECT id_user FROM utilisateur WHERE email = :email";
        $stmtCheck = $this->pdo->prepare($sqlCheck);
        $stmtCheck->execute(['email' => $email]);
        if ($stmtCheck->fetch()) {
            throw new Exception("L'email existe déjà");
        }

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO utilisateur (api_token, nom, prenom, email, password, statut_etud, tel, adresse, fidelite) 
        VALUES (:api_token, :nom, :prenom, :email, :password, :statut_etud, :tel, :adresse, :fidelite)";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'api_token' => $data['api_token'] ?? null,
            'nom' => $nom,
            'prenom' => $prenom,
            'email' => $email,
            'password' => $passwordHash,
            'statut_etud' => $data['statut_etud'] ?? 0,
            'tel' => $tel,
            'adresse' => $adresse,
            'fidelite' => $data['fidelite'] ?? 0,
        ]);
    }

}



?>