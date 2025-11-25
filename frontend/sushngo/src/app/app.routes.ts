import { Routes } from '@angular/router';
import { Index } from './components/index/index';
import { Utilisationcookie } from './components/utilisationcookie/utilisationcookie';
import { Compte } from './components/compte/compte';
import { Inscconnex } from './components/inscconnex/inscconnex';
import { Mdpoublie } from './components/mdpoublie/mdpoublie';
import { Mentionslegales } from './components/mentionslegales/mentionslegales';
import { Pagemenu } from './components/menus/pagemenu';
import { Panier } from './components/panier/panier';
import { Plansite } from './components/plansite/plansite';
import { Pointsretraits } from './components/pointsretraits/pointsretraits';
import { Stats } from './components/stats/stats';
import { Ugc } from './components/ugc/ugc';
import { Contact } from './components/contact/contact';
import { Rgpd } from './components/rgpd/rgpd';

export const routes: Routes = [
  { path: '', component: Pagemenu},
  { path: 'utilisation-cookie', component: Utilisationcookie },
  { path: 'compte', component: Compte },
  { path: 'inscription-connexion', component: Inscconnex },
  { path: 'mot-de-passe-oublie', component: Mdpoublie },
  { path: 'mentions-legales', component: Mentionslegales },
  { path: 'menu', component: Pagemenu },
  { path: 'panier', component: Panier },
  { path: 'plan-site', component: Plansite },
  { path: 'points-retraits', component: Pointsretraits },
  { path: 'stats', component: Stats },
  { path: 'ugc', component: Ugc },
  { path: 'contact', component: Contact},
  { path: 'rgpd', component: Rgpd},
  { path: '**', redirectTo: 'inscription' } // Route par défaut pour les chemins non trouvés
];
