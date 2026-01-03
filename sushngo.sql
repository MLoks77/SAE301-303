-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 18 déc. 2025 à 22:37
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sushngo`
--

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id_commande` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `date_commande` datetime DEFAULT NULL,
  `prix_total` float DEFAULT NULL,
  `mode` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `detail_commande`
--

CREATE TABLE `detail_commande` (
  `id_detail` int(11) NOT NULL,
  `id_commande` int(11) DEFAULT NULL,
  `id_produit` int(11) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id_produit` int(11) NOT NULL,
  `nom` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `saveurs` text DEFAULT NULL,
  `aliments` text DEFAULT NULL,
  `prix` float DEFAULT NULL,
  `pieces` int(11) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id_produit`, `nom`, `description`, `saveurs`, `aliments`, `prix`, `pieces`, `image`) VALUES
(14, 'Tasty Blend', "Un équilibre parfait de saveurs douces avec un mélange de saumon, d'avocat et de cheese pour une pause déjeuner idéale.", 'saumon, avocat, cheese', 'California Saumon Avocat (3); Sushi Saumon (3); Spring Avocat Cheese (3); California pacific (3); Edamame/Salade de chou (1)', 12.5, 12, 'tasty-blend'),
(15, 'Amateur Mix', "L'assortiment idéal pour les indécis gourmands : variez les plaisirs entre makis fondants, springs frais et californias.", 'coriandre, saumon, avocat, cheese', 'Maki Salmon Roll (3); Spring Saumon Avocat (3); Maki Cheese Avocat (6); California Saumon Avocat (3); Edamame/Salade de chou (1)', 15.9, 18, 'amateur-mix'),
(16, 'Saumon Original', "Le retour aux sources avec nos classiques indémodables : l'alliance simple et efficace du saumon et de l'avocat.", 'saumon, avocat', 'California Saumon Avocat (6); Sushi Saumon (5); Edamame/Salade de chou (1)', 12.5, 11, 'saumon-original'),
(17, 'Salmon Lovers', "Une véritable déclaration d'amour au saumon sous toutes ses formes, relevée par une pointe de coriandre fraîche.", 'coriandre, saumon, avocat', 'California Saumon Avocat (6); Spring Saumon Avocat (6); Sushi Saumon (6); Edamame/Salade de chou (1)', 15.9, 18, 'salmon-lovers'),
(18, 'Salmon Classic', "La pureté du produit avant tout. 10 sushis saumon fondants pour les puristes qui ne jurent que par l'essentiel.", 'saumon', 'Sushi Saumon (10); Edamame/Salade de chou (1)', 15.9, 10, 'salmon-classic'),
(19, 'Master Mix', "Maîtrisez vos envies avec ce duo incontournable de saumon et de thon, accompagné de l'onctuosité de l'avocat.", 'saumon, thon, avocat', 'Sushi Saumon (4); Sushi Thon (2); California Thon Avocat (3); California Saumon Avocat (3); Edamame / Salade de chou (1)', 15.9, 12, 'master-mix'),
(20, 'Sunrise', "Éveillez vos papilles avec cet assortiment généreux de 18 pièces mêlant saumon, thon cuit et la douceur du cheese.", 'saumon, thon, avocat, cheese', 'Maki Salmon Roll (6); California Saumon Avocat (6); California Thon Cuit Avocat (6); Edamame / Salade de chou (1)', 15.9, 18, 'sunrise'),
(21, 'Sando Box Chicken Katsu', "La fusion parfaite entre le croustillant d'un sandwich japonais au poulet et la finesse de nos rolls saumon.", 'saumon, viande, avocat, cheese', 'Sando Chicken Katsu (0.5); Maki Salmon Roll (6); California Saumon Avocat (6); California Thon Cuit Avocat (6); Edamame / Salade de chou (1)', 15.9, 13, 'sando-box-chicken-katsu'),
(22, 'Sando Box Salmon Aburi', "L'expérience gourmet d'un Sando au saumon mi-cuit associée à la fraîcheur de nos californias signatures.", 'saumon, thon, avocat', 'Sando Salmon Aburi (0.5); California Saumon Avocat (6); California Thon Cuit Avocat (6); Edamame / Salade de chou (1)', 15.9, 13, 'sando-box-salmon-aburi'),
(23, 'Super Salmon',"Voyez les choses en grand avec ce plateau 100% saumon de 24 pièces : makis, springs et californias à partager (ou pas).", 'coriandre, saumon, avocat, cheese', 'California Saumon Avocat (6); Maki Salmon Roll (6); Maki Salmon (6); Spring Saumon Avocat (6); Edamame / Salade de chou (1)', 19.9, 24, 'super-salmon'),
(24, 'California Dream', "Le rêve californien en 24 pièces ! Un voyage gustatif complet allant de la crevette au poulet katsu en passant par le thon.", 'spicy, saumon, thon, crevette, viande, avocat', 'California Saumon Avocat (6); California Crevette (6); California Thon Cuit Avocat (6); California Chicken Katsu (6); Edamame / Salade de chou (1)', 19.9, 24, 'california-dream'),
(25, 'Gourmet Mix',"Une sélection premium pour les palais raffinés, incluant nos signatures Dragon Roll et Tataki Saumon.", 'coriande, spicy, saumon, viande, avocat, seriole lalandi', 'Spring tataki Saumon (6); Signature Dragon Roll (4); California French Touch (3); California French salmon (6); California Yellowtail Ponzu (3); Edamame / Salade de chou (1)', 24.5, 22, 'gourmet-mix'),
(26, 'Fresh Mix',"Un vent de fraîcheur et d'audace avec nos créations Rock'n Roll et des sushis d'exception.", 'spicy, saumon, thon, avocat, cheese', 'Signature Rock\'n Roll (4); Maki Salmon Roll (6); California Pacific (6); Sushi Salmon (4); Sushi Saumon Tsukudani (2); Edamame / Salade de chou (1)', 24.5, 22, 'fresh-mix');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_user` int(11) NOT NULL,
  `api_token` varchar(100) DEFAULT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `statut_etud` tinyint(1) DEFAULT NULL,
  `tel` int(11) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `fidelite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id_commande`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `detail_commande`
--
ALTER TABLE `detail_commande`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `id_commande` (`id_commande`),
  ADD KEY `id_produit` (`id_produit`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id_produit`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id_commande` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `detail_commande`
--
ALTER TABLE `detail_commande`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_produit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id_user`) ON DELETE SET NULL;

--
-- Contraintes pour la table `detail_commande`
--
ALTER TABLE `detail_commande`
  ADD CONSTRAINT `detail_commande_ibfk_1` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id_commande`) ON DELETE CASCADE,
  ADD CONSTRAINT `detail_commande_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produit` (`id_produit`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
