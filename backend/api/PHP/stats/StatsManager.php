<?php

// maxime derènes
class StatsManager
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getGlobalMetrics()
    {
        // Commandes aujourd'hui
        $stmt = $this->pdo->query("SELECT COUNT(*) as count FROM commande WHERE DATE(date_commande) = CURDATE()");
        $ordersToday = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

        // Commande all time
        $stmt = $this->pdo->query("SELECT COUNT(*) as count FROM commande");
        $totalcommandes = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

        // Note clients (on simule)
        $rating = 4.2;

        return [
            'orders_today' => $ordersToday,
            'total_commandes' => $totalcommandes,
            'rating' => $rating,
        ];
    }

    // on prend les plats les plus commandés en se basant sur la quantité et on les met dans l'ordre du prix
    public function getPopularDishes()
    {
        $sql = "SELECT p.nom, SUM(d.quantite) as orders, p.prix, p.image, p.id_produit
                FROM detail_commande d 
                JOIN produit p ON d.id_produit = p.id_produit 
                GROUP BY d.id_produit 
                ORDER BY orders DESC 
                LIMIT 3";
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getWeeklyStats()
    {
        // '%a' -> abréviation du jour de la semaine en anglais (Mon, Tue, etc.)
        // on vient récupérer les commandes des 7 derniers jours 
        $sql = "SELECT DATE(date_commande) as full_date, 
                   DATE_FORMAT(date_commande, '%a') as day_name, 
                   SUM(prix_total) as revenue, 
                   COUNT(*) as orders 
            FROM commande 
            WHERE date_commande >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) 
            GROUP BY DATE(date_commande) 
            ORDER BY DATE(date_commande) ASC";
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    // on récupère le nombre de commandes passées pour chaque heure de la journée actuelle, pour faire les heures de pointes
    public function getHourlyStats()
    {
        $sql = "SELECT HOUR(date_commande) as hour, COUNT(*) as orders 
            FROM commande 
            WHERE DATE(date_commande) = CURDATE() 
            GROUP BY HOUR(date_commande) 
            ORDER BY hour";
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    // Récupère toutes les statistiques
    public function getAllStats()
    {
        return [
            'metrics' => $this->getGlobalMetrics(),
            'popular_dishes' => $this->getPopularDishes(),
            'weekly_data' => $this->getWeeklyStats(),
            'hourly_data' => $this->getHourlyStats()
        ];
    }
}
?>