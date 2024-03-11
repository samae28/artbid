import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArtworkComponent } from './artwork/artwork.component';
import { LoadingArtworkComponent } from './loading-artwork/loading-artwork.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { AuctionCurrentComponent } from './auction-current/auction-current.component';
import { AuctionUpcomingComponent } from './auction-upcoming/auction-upcoming.component';
import { AuctionPastComponent } from './auction-past/auction-past.component';
import { BrowseArtistComponent } from './browse-artist/browse-artist.component';
import { BrowseMediumComponent } from './browse-medium/browse-medium.component';
import { ArtMediumComponent } from './art-medium/art-medium.component';

@NgModule({
  declarations: [
    ArtworkComponent,
    LoadingArtworkComponent,
    EmptyScreenComponent,
    AuctionCurrentComponent,
    AuctionUpcomingComponent,
    AuctionPastComponent,
    BrowseArtistComponent,
    BrowseMediumComponent,
    ArtMediumComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    ArtworkComponent,
    LoadingArtworkComponent,
    EmptyScreenComponent,
    AuctionCurrentComponent,
    AuctionUpcomingComponent,
    AuctionPastComponent,
    BrowseArtistComponent,
    BrowseMediumComponent,
    ArtMediumComponent,
  ],
})
export class ComponentsModule {}
