import { Routes } from '@angular/router';
import {ProduitComponent } from '../app/components/produit/produit.component'
import {ConnectWoocommerceComponent} from '../app/components/connect-woocommerce-component/connect-woocommerce-component.component'
export const routes: Routes = [
  { path: 'produits', component: ProduitComponent },
   { path: 'produits', component: ProduitComponent },
  { path: 'produits', redirectTo: '/produits', pathMatch: 'full' }, { 
    path: 'connect-woocommerce', 
    component: ConnectWoocommerceComponent 
  }

];
