import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-art-medium',
  templateUrl: './art-medium.component.html',
  styleUrls: ['./art-medium.component.scss'],
})
export class ArtMediumComponent implements OnInit {
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
