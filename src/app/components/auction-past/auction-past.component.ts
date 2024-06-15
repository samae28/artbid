import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artworks } from 'src/app/models/artworks.model';
import { Mediums } from 'src/app/models/mediums.model';

import { Auction } from 'src/app/models/auction.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Import Firestore specifically if needed
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-auction-past',
  templateUrl: './auction-past.component.html',
  styleUrls: ['./auction-past.component.scss'],
})
export class AuctionPastComponent implements OnInit {
  @Input() artwork: Artworks;
  artists: any[] = [];
  id: any;
  mediums: Mediums[] = [];
  artworksList: Artworks[] = [];
  selectedSegment: string = 'past';

  constructor(private apiService: ApiService, private router: Router) {}

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
