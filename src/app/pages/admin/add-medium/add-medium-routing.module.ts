import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMediumPage } from './add-medium.page';

const routes: Routes = [
  {
    path: '',
    component: AddMediumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMediumPageRoutingModule {}
