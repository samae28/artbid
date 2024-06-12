import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Artworks } from 'src/app/models/artworks.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  banners: any[] = [];
  artwork: Artworks[] = [];
  isLoading: boolean = false;

  auctionArtworks: Artworks[] = [];
  fixedPriceArtworks: Artworks[] = [];
  artists: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private apiService: ApiService,
    private firestore: AngularFirestore,
    public afStorage: AngularFireStorage
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

  // openArtwork(artwork) {
  //   this.router.navigate(['/tabs/artwork-detail', artwork.artworkID]);
  // }

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
    this.firestore
      .collection<Artworks>('allArtworks')
      .valueChanges()
      .subscribe((data: Artworks[]) => {
        this.artwork = data;
        this.auctionArtworks = this.artwork.filter(
          (artwork) => artwork.isAuction === true || artwork.isAuction === 1
        );
        this.fixedPriceArtworks = this.artwork.filter(
          (artwork) => artwork.isAuction === false || artwork.isAuction === 0
        );
      });
  }
}
