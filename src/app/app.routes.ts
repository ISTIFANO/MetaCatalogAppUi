import { Routes } from '@angular/router';
import { ProduitComponent } from '../app/components/produit/produit.component'
import { ConnectWoocommerceComponent } from '../app/components/connect-woocommerce-component/connect-woocommerce-component.component'
import { CatalogComponent } from './components/catalog/catalog.component';
import {ProduitCatalogComponent } from '../app/components/produit-catalog/produit-catalog.component'
export const routes: Routes = [
  { path: 'produits', component: ProduitComponent },
  { path: 'produits', redirectTo: '/produits', pathMatch: 'full' },
  {
    path: 'connect-woocommerce',
    component: ConnectWoocommerceComponent
  },
  { path: 'catalog', component: CatalogComponent },
  { path: 'catalog', redirectTo: '/catalog', pathMatch: 'full' },
  { path: 'produitsCatalog', component: ProduitCatalogComponent },
  { path: 'produitsCatalog', redirectTo: '/produitsCatalog', pathMatch: 'full' },
];
