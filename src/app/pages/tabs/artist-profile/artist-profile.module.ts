import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistProfilePageRoutingModule } from './artist-profile-routing.module';

import { ArtistProfilePage } from './artist-profile.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistProfilePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ArtistProfilePage]
})
export class ArtistProfilePageModule {}
