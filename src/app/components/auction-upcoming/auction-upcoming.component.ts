import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auction-upcoming',
  templateUrl: './auction-upcoming.component.html',
  styleUrls: ['./auction-upcoming.component.scss'],
})
export class AuctionUpcomingComponent implements OnInit {
  selectedSegment: string = 'upcoming';
  @Input() artwork: any;
  constructor() {}

  ngOnInit() {
    console.log('Artwork array:', this.artwork);
  }
  getHighestBid(): string {
    if (!this.artwork.bids || this.artwork.bids.length === 0) {
      return 'No bids yet';
    }

    const highestBid = Math.max(...this.artwork.bids.map((bid) => bid.amount));

    return `P${highestBid}`;
  }
}
