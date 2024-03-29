import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.page.html',
  styleUrls: ['./auction.page.scss'],
})
export class AuctionPage implements OnInit {
  artworks: any[] = [];
  @Input() artwork: any;
  isLoading: boolean = false;
  selectedSegment: 'current' | 'upcoming' | 'past';
  currentAuctions: any[];
  upcomingAuctions: any[];
  pastAuctions: any[];

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.selectedSegment = queryParams['segment'] || 'current';
    });
    this.isLoading = true;

    setTimeout(() => {
      // this.artworks = this.api.getAuctionArtworks();
      this.artworks = this.api.artworks;
      this.filterAuctions();
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  changeSegment(event: CustomEvent) {
    const selectedSegment = event.detail.value as 'current' | 'upcoming' | 'past';
    this.selectedSegment = selectedSegment;

    // Update the URL based on the selected segment
    this.router.navigate(['/tabs/auction'], {
      queryParams: { segment: selectedSegment },
    });
  }

  filterAuctions() {
    const currentDate = new Date();
    this.currentAuctions = this.artworks.filter((artwork) => {
      if (artwork.isAuction && artwork.auction?.length > 0) { // Check if artwork is an auction and has auction data
        const auction = artwork.auction[0]; // Assuming each artwork has only one auction entry
        return auction.startDate <= currentDate && auction.endDate >= currentDate;
      }
      return false; // Skip artworks that are not auctions or have no auction data
    });
  
    this.upcomingAuctions = this.artworks.filter((artwork) => {
      if (artwork.isAuction && artwork.auction?.length > 0) {
        const auction = artwork.auction[0];
        return auction.startDate > currentDate;
      }
      return false;
    });
  
    this.pastAuctions = this.artworks.filter((artwork) => {
      if (artwork.isAuction && artwork.auction?.length > 0) {
        const auction = artwork.auction[0];
        return auction.endDate < currentDate;
      }
      return false;
    });
  }
  
}

