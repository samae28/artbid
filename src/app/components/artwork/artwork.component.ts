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
  mediums: any[] = []
  constructor(private api: ApiService) {}

  ngOnInit() {
    console.log('Artwork array:', this.artwork);
    console.log('Artists:', this.artists);
    console.log('ArtistID:', this.artwork.artistID);
    this.artists = this.api.artists;
    this.mediums = this.api.mediums;
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
  

  getHighestBid(artwork: any): string {
    if (artwork.isAuction && artwork.auction.length > 0) {
      const bids = artwork.auction[0].bids; // Assuming only one auction for simplicity
      if (bids && bids.length > 0) {
        // Sort bids by bidAmount in descending order
        const sortedBids = bids.sort((a, b) => parseFloat(b.bidAmount) - parseFloat(a.bidAmount));
        return sortedBids[0].bidAmount; // Return the highest bid amount
      }
    }
    return 'N/A'; // Return 'N/A' if no bids or not an auction artwork
  }

  isAuction(): boolean {
    return this.artwork.isAuction;
  }
}
