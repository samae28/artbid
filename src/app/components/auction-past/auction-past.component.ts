import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction-past',
  templateUrl: './auction-past.component.html',
  styleUrls: ['./auction-past.component.scss'],
})
export class AuctionPastComponent implements OnInit {
  @Input() artwork: any;
  selectedSegment: string = 'past';
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
