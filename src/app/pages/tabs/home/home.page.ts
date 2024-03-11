import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  banners: any[] = [];
  artworks: any[] = [];
  isLoading: boolean = false;
  
  auctionArtworks = []; 
  fixedPriceArtworks = [];

  constructor(
    private cdr: ChangeDetectorRef, 
    private router: Router, 
    private api: ApiService) { }

  navigateToAuctionSegment(segment: string): void {
    this.router.navigate(['/tabs/auction'], { queryParams: { segment } });
  }  

  ngOnInit() {
    this.isLoading = true;

    setTimeout(() => {
      this.banners = this.api.banners;
      this.artworks = this.api.artworks;

      this.auctionArtworks = this.artworks.filter(artwork => artwork.isAuction);
      this.fixedPriceArtworks = this.artworks.filter(artwork => !artwork.isAuction);

      this.isLoading = false;
      this.cdr.detectChanges();
    }, 2000);
  }

}
