/* Routes par sébastien chisiu, ajout de RGPD et CGU par Joachim*/

import { Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Utilisationcookie } from './components/utilisationcookie/utilisationcookie';
import { Compte } from './components/compte/compte';
import { Inscconnex } from './components/inscconnex/inscconnex';
import { Mdpoublie } from './components/mdpoublie/mdpoublie';
import { Mentionslegales } from './components/mentionslegales/mentionslegales';
import { RGPD } from './components/rgpd/rgpd';
import { CGU } from './components/cgu/cgu';
import { Pagemenu } from './components/menus/pagemenu';
import { Panier } from './components/panier/panier';
import { Plansite } from './components/plansite/plansite';
import { Pointsretraits } from './components/pointsretraits/pointsretraits';
import { Stats } from './components/stats/stats';
import { Contact } from './components/contact/contact';

export const routes: Routes = [
  { path: '', component: Contact},
  { path: 'accueil', component: Accueil},
  { path: 'utilisation-cookie', component: Utilisationcookie },
  { path: 'compte', component: Compte },
  { path: 'inscription-connexion', component: Inscconnex },
  { path: 'mot-de-passe-oublie', component: Mdpoublie },
  { path: 'mentions-legales', component: Mentionslegales },
  { path: 'rgpd', component: RGPD },
  { path: 'cgu', component: CGU },
  { path: 'menus', component: Pagemenu },
  { path: 'panier', component: Panier },
  { path: 'plan-site', component: Plansite },
  { path: 'points-retraits', component: Pointsretraits },
  { path: 'stats', component: Stats },
  { path: 'contact', component: Contact},
  { path: '**', redirectTo: 'accueil' } // Route par défaut pour les chemins non trouvés
];  
