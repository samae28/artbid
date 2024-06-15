import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Artworks } from 'src/app/models/artworks.model';
import { ApiService } from 'src/app/services/api/api.service';
// import * as firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.page.html',
  styleUrls: ['./auction.page.scss'],
})
export class AuctionPage implements OnInit {
  artworks: Artworks[] = [];
  isLoading: boolean = false;
  selectedSegment: 'current' | 'upcoming' | 'past' = 'current';
  currentAuctions: Artworks[] = [];
  upcomingAuctions: Artworks[] = [];
  pastAuctions: Artworks[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private firestore: AngularFirestore,
    public afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.selectedSegment = queryParams['segment'] || 'current';
    });
    this.isLoading = true;

    this.loadArtworks();
  }

  loadArtworks() {
    this.firestore
      .collection('allArtworks')
      .snapshotChanges()
      .subscribe((snapshot) => {
        this.artworks = snapshot.map((doc) => {
          const data = doc.payload.doc.data() as Artworks;
          const id = doc.payload.doc.id;

          // Ensure auction dates are Date objects
          if (data.auction) {
            const auction = data.auction as {
              startDate: firebase.firestore.Timestamp;
              endDate: firebase.firestore.Timestamp;
            };

            // Convert Timestamp to Date
            if (auction.startDate && !(auction.startDate instanceof Date)) {
              data.auction.startDate = auction.startDate.toDate();
            }
            if (auction.endDate && !(auction.endDate instanceof Date)) {
              data.auction.endDate = auction.endDate.toDate();
            }
          }

          return { ...data, artworkID: id };
        });
        this.filterAuctions();
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

  changeSegment(event: CustomEvent) {
    const selectedSegment = event.detail.value as
      | 'current'
      | 'upcoming'
      | 'past';
    this.selectedSegment = selectedSegment;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { segment: selectedSegment },
      queryParamsHandling: 'merge',
    });
  }

  filterAuctions() {
    const currentDate = new Date();
    console.log('Current Date:', currentDate); // Debugging statement

    this.currentAuctions = this.artworks.filter((artwork) => {
      if (artwork.isAuction && artwork.auction) {
        const auction = artwork.auction;
        console.log(
          'Current Auction - Start Date:',
          auction.startDate,
          'End Date:',
          auction.endDate
        ); // Debugging statement
        return (
          auction.startDate <= currentDate && auction.endDate >= currentDate
        );
      }
      return false;
    });

    this.upcomingAuctions = this.artworks.filter((artwork) => {
      if (artwork.isAuction && artwork.auction) {
        const auction = artwork.auction;
        console.log('Upcoming Auction - Start Date:', auction.startDate); // Debugging statement
        return auction.startDate > currentDate;
      }
      return false;
    });

    this.pastAuctions = this.artworks.filter((artwork) => {
      if (artwork.isAuction && artwork.auction) {
        const auction = artwork.auction;
        console.log('Past Auction - End Date:', auction.endDate); // Debugging statement
        return auction.endDate < currentDate;
      }
      return false;
    });

    console.log('Current Auctions:', this.currentAuctions); // Debugging statement
    console.log('Upcoming Auctions:', this.upcomingAuctions); // Debugging statement
    console.log('Past Auctions:', this.pastAuctions); // Debugging statement
  }

  onArtworkClick(artwork: Artworks) {
    console.log('Navigating to artwork detail with ID:', artwork.artworkID); // Debugging statement
    this.router.navigate(['/tabs/artwork-detail', artwork.artworkID]);
  }
}
