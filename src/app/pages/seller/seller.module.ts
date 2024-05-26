import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerPageRoutingModule } from './seller-routing.module';

import { SellerPage } from './seller.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [SellerPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SellerPageRoutingModule,
        ComponentsModule
    ]
})
export class SellerPageModule {}
