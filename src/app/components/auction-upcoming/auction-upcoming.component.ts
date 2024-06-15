import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artworks } from 'src/app/models/artworks.model';
import { Mediums } from 'src/app/models/mediums.model';

import { Auction } from 'src/app/models/auction.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Import Firestore specifically if needed
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-auction-upcoming',
  templateUrl: './auction-upcoming.component.html',
  styleUrls: ['./auction-upcoming.component.scss'],
})
export class AuctionUpcomingComponent implements OnInit {
  selectedSegment: string = 'upcoming';
  @Input() artwork: Artworks;
  artworksList: Artworks[] = [];
  mediums: Mediums[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getArtworks().subscribe((data) => {
      this.artworksList = data;
    });
  }

  convertTimestampToDate(timestamp: firebase.firestore.Timestamp | Date): Date {
    if (timestamp instanceof firebase.firestore.Timestamp) {
      return timestamp.toDate();
    }
    return timestamp; // Return as is if already a Date object
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
