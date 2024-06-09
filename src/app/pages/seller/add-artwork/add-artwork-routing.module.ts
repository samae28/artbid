import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddArtworkPage } from './add-artwork.page';

const routes: Routes = [
  {
    path: '',
    component: AddArtworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddArtworkPageRoutingModule {}
