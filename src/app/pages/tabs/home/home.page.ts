import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Artworks } from 'src/app/models/artworks.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Imp

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

        // Filter only ongoing auctions
        this.auctionArtworks = this.artwork.filter((artwork) => {
          if (artwork.isAuction && artwork.auction) {
            const currentTime = new Date();
            const startDate =
              artwork.auction.startDate instanceof firebase.firestore.Timestamp
                ? artwork.auction.startDate.toDate()
                : artwork.auction.startDate;
            const endDate =
              artwork.auction.endDate instanceof firebase.firestore.Timestamp
                ? artwork.auction.endDate.toDate()
                : artwork.auction.endDate;

            return currentTime >= startDate && currentTime <= endDate;
          }
          return false;
        });

        // Filter fixed price artworks
        this.fixedPriceArtworks = this.artwork.filter(
          (artwork) => artwork.isAuction === false || artwork.isAuction === 0
        );
      });
  }
}
