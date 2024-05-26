import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerPage } from './seller.page';

const routes: Routes = [
  {
    path: '',
    component: SellerPage
  },
  {
    path: 'add-artwork',
    loadChildren: () => import('./add-artwork/add-artwork.module').then( m => m.AddArtworkPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerPageRoutingModule {}
