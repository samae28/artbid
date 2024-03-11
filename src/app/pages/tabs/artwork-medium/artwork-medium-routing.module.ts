import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtworkMediumPage } from './artwork-medium.page';

const routes: Routes = [
  {
    path: '',
    component: ArtworkMediumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtworkMediumPageRoutingModule {}
