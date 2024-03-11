import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss'],
})
export class ArtworkComponent implements OnInit {
  @Input() artwork: any;
  artists: any[] = [];
  id: any;
  constructor(private api: ApiService) {}

  ngOnInit() {
    console.log('Artwork array:', this.artwork);
    console.log('Artists:', this.artists);
    console.log('ArtistID:', this.artwork.artistID);

  }

  getArtistName(artistID: any): string {
    console.log('Artists:', this.artists);
    console.log('ArtistID to find:', artistID);
  
    if (this.artists) {
      const artist = this.artists.find(
        (artist) => artist.artistID.toString() === artistID.toString()
      );
      console.log('Found Artist:', artist);
      return artist ? artist.artistName : 'Unknown Artist';
    } else {
      return 'Unknown Artist';
    }
  }
  

  getHighestBid(): string {
    return this.getHighestBidAmount(this.artwork);
  }

  private getHighestBidAmount(artwork: any): string {
    if (!artwork.bids || artwork.bids.length === 0) {
      return 'No bids yet';
    }

    const highestBid = Math.max(...artwork.bids.map((bid) => bid.amount));

    return `P${highestBid}`;
  }

  isAuction(): boolean {
    return this.artwork.isAuction;
  }
}
