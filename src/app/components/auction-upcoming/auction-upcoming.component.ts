import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artworks } from 'src/app/models/artworks.model';
import { Mediums } from 'src/app/models/mediums.model';

@Component({
  selector: 'app-auction-upcoming',
  templateUrl: './auction-upcoming.component.html',
  styleUrls: ['./auction-upcoming.component.scss'],
})
export class AuctionUpcomingComponent implements OnInit {
  selectedSegment: string = 'upcoming';
  @Input() artwork: Artworks;
  mediums: Mediums[] = [];
  constructor() {}

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
