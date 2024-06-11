import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artworks } from 'src/app/models/artworks.model';
import { Mediums } from 'src/app/models/mediums.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss'],
})
export class ArtworkComponent implements OnInit {
  @Input() artwork: Artworks;
  artists: any[] = [];
  id: any;
  mediums: Mediums[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    console.log('Artwork:', this.artwork);
    console.log('Artists:', this.artists);
  }

  onArtworkClick() {
    console.log(
      'Navigating to artwork detail with ID:',
      this.artwork.artworkID
    ); // Debugging
    this.router.navigate(['/tabs/artwork-detail', this.artwork.artworkID]);
  }

  getData(artistID: string): string {
    // Implement your logic to get artist data by ID
    return 'Artist Name';
  }

  isAuction(artwork: Artworks): boolean {
    return artwork.isAuction === true || artwork.isAuction === 1;
  }

  getHighestBid(artwork: Artworks): number {
    if (
      artwork.auction &&
      artwork.auction.bids &&
      artwork.auction.bids.length > 0
    ) {
      return Math.max(...artwork.auction.bids.map((bid) => bid.bidAmount));
    }
    return artwork.price;
  }
}
