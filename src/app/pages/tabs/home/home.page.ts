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
  artists: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef, 
    private router: Router, 
    private api: ApiService) { 
      this.auctionArtworks = this.api.getAuctionArtworks();
      this.fixedPriceArtworks = this.api.getFixedPriceArtworks();
    }

  navigateToAuction(segment: string): void {
    this.router.navigate(['/tabs/auction'], { queryParams: { segment } });
  }
  navigateToBrowse(segment: string): void {
    this.router.navigate(['/tabs/browse'], { queryParams: { segment } });
  }  

  ngOnInit() {
    this.isLoading = true;

    setTimeout(() => {
      this.banners = this.api.banners;
      this.artworks = this.api.artworks;
      this.artists = this.api.artists;
      
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 2000);
  }

}
