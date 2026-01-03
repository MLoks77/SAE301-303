

<?php
// maxime derènes
require_once __DIR__ . '/../../../../config/configdb.php'; // connexion

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


    public function insertUser(array $data): void
    {
        // Note: 'email_inscr' et 'mdp_inscr' viennent de la page de joachim ( rajouté par joachim )
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


    public function login(string $email, string $password): array
    {
        $sql = "SELECT * FROM utilisateur WHERE email = :email";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $token = bin2hex(random_bytes(32));

            // Mise à jour du token dans la DB
            $updateSql = "UPDATE utilisateur SET api_token = :token WHERE id_user = :id_user";
            $updateStmt = $this->pdo->prepare($updateSql);
            $updateStmt->execute(['token' => $token, 'id_user' => $user['id_user']]);

            // Initialisation de la session
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            $_SESSION['id_user'] = $user['id_user'];
            $_SESSION['api_token'] = $token;
            $_SESSION['nom'] = $user['nom'];
            $_SESSION['prenom'] = $user['prenom'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['statut_etud'] = $user['statut_etud'];
            $_SESSION['tel'] = $user['tel'];
            $_SESSION['adresse'] = $user['adresse'];
            $_SESSION['fidelite'] = $user['fidelite'];

            return [
                'success' => true,
                'api_token' => $token,
                'user' => [
                    'id_user' => $user['id_user'],
                    'nom' => $user['nom'],
                    'prenom' => $user['prenom'],
                    'email' => $user['email']
                ]
            ];
        }

        return ['success' => false, 'message' => 'Email ou mot de passe incorrect'];
    }


    public function logout(int $id_user): array
    {
        // On invalide le token dans la base
        $sql = "UPDATE utilisateur SET api_token = NULL WHERE id_user = :id_user";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id_user' => $id_user]);

        // Nettoyage session
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        session_destroy();

        return ['success' => true];
    }


    public function checkSession(): array
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Vérifier d'abord si un token existe dans la session
        if (empty($_SESSION['api_token']) || empty($_SESSION['id_user'])) {
            return [
                'logged_in' => false,
                'user_id' => null,
                'api_token' => null
            ];
        }

        // Vérifier que le token existe réellement en base de données et correspond à l'utilisateur
        $sql = "SELECT id_user, api_token FROM utilisateur WHERE id_user = :id_user AND api_token = :api_token";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'id_user' => $_SESSION['id_user'],
            'api_token' => $_SESSION['api_token']
        ]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Si l'utilisateur n'existe pas ou le token ne correspond pas, la session est invalide
        if (!$user) {
            // Nettoyer la session invalide
            session_destroy();
            return [
                'logged_in' => false,
                'user_id' => null,
                'api_token' => null
            ];
        }

        return [
            'logged_in' => true,
            'user_id' => $_SESSION['id_user'],
            'api_token' => $_SESSION['api_token']
        ];
    }

    public function resetPassword(string $email, string $newPassword): array
    {
        $sql = "SELECT id_user FROM utilisateur WHERE email = :email";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            return ['success' => false, 'message' => 'Aucun utilisateur trouvé avec cet email.'];
        }

        $passwordHash = password_hash($newPassword, PASSWORD_DEFAULT);

        $updateSql = "UPDATE utilisateur SET password = :password WHERE email = :email";
        $updateStmt = $this->pdo->prepare($updateSql);
        $updateStmt->execute([
            'password' => $passwordHash,
            'email' => $email
        ]);

        return [
            'success' => true,
            'message' => 'Mot de passe réinitialisé avec succès !'
        ];
    }

    public function setFidelite($id_user, $fidelite)
    {
        // noramelemnt sa devrait ressembler à ça mais il faudrait le changer pour que sa fonctionne suivant le paiement dans le panier
        /*
        $sql = "UPDATE utilisateur SET fidelite = :fidelite WHERE id_user = :id_user";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['fidelite' => $fidelite, 'id_user' => $id_user]);
        */
    }
}
?>