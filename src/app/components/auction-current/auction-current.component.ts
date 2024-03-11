import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction-current',
  templateUrl: './auction-current.component.html',
  styleUrls: ['./auction-current.component.scss'],
})
export class AuctionCurrentComponent implements OnInit {
  @Input() artwork: any;
  selectedSegment: string = 'current';
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
