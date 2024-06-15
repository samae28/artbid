import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artworks } from 'src/app/models/artworks.model';
import { Mediums } from 'src/app/models/mediums.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-auction-current',
  templateUrl: './auction-current.component.html',
  styleUrls: ['./auction-current.component.scss'],
})
export class AuctionCurrentComponent implements OnInit {
  @Input() artwork: Artworks;
  mediums: Mediums[] = [];
  id: any;
  selectedSegment: string = 'current';

  ngOnInit() {
    console.log('Artwork array:', this.artwork);
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
