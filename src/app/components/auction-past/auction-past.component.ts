import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mediums } from 'src/app/models/mediums.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-auction-past',
  templateUrl: './auction-past.component.html',
  styleUrls: ['./auction-past.component.scss'],
})
export class AuctionPastComponent implements OnInit {
  @Input() artwork: any;
  artists: any[] = [];
  id: any;
  mediums: Mediums[] = [];
  selectedSegment: string = 'past';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    console.log('Artwork array:', this.artwork);
  }

  getData(artistID: string): string {
    // Implement your logic to get artist data by ID
    return 'Artist Name';
  }

  getHighestBid(): string {
    if (!this.artwork.bids || this.artwork.bids.length === 0) {
      return 'No bids yet';
    }

    const highestBid = Math.max(...this.artwork.bids.map((bid) => bid.amount));

    return `P${highestBid}`;
  }
}
