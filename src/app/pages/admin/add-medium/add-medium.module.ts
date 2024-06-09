import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMediumPageRoutingModule } from './add-medium-routing.module';

import { AddMediumPage } from './add-medium.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMediumPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [AddMediumPage],
})
export class AddMediumPageModule {}
