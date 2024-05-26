import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddArtworkPageRoutingModule } from './add-artwork-routing.module';

import { AddArtworkPage } from './add-artwork.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddArtworkPageRoutingModule
  ],
  declarations: [AddArtworkPage]
})
export class AddArtworkPageModule {}
