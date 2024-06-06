import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Artworks } from 'src/app/models/artworks.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  banners: any[] = [];
  artworks: Artworks[] = [];
  isLoading: boolean = false;

  auctionArtworks: Artworks[] = [];
  fixedPriceArtworks: Artworks[] = [];
  artists: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private apiService: ApiService
  ) {}

  navigateToAuction(segment: string): void {
    this.router.navigate(['/tabs/auction'], { queryParams: { segment } });
  }

  navigateToBrowse(segment: string): void {
    this.router.navigate(['/tabs/browse'], { queryParams: { segment } });
  }

  ngOnInit() {
    this.isLoading = true;

    setTimeout(() => {
      this.getBanners();
      this.loadArtworks();
      this.artists = this.apiService.artists;

      this.isLoading = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  getBanners() {
    this.apiService
      .getBanners()
      .then((data) => {
        console.log(data);
        this.banners = data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  loadArtworks() {
    this.apiService.getArtworks().subscribe((data: Artworks[]) => {
      this.artworks = data;
      this.auctionArtworks = this.artworks.filter(
        (artwork) => artwork.isAuction
      );
      this.fixedPriceArtworks = this.artworks.filter(
        (artwork) => artwork.isAuction !== 1
      );
      console.log('Auction Artworks:', this.auctionArtworks);
      console.log('Fixed Price Artworks:', this.fixedPriceArtworks);
    });
  }
}
