import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Artworks } from 'src/app/models/artworks.model';
import { ApiService } from 'src/app/services/api/api.service';

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
    this.currentAuctions = this.artworks.filter((artwork) => {
      if (artwork.isAuction && artwork.auction) {
        const auction = artwork.auction;
        return (
          auction.startDate <= currentDate && auction.endDate >= currentDate
        );
      }
      return false;
    });

    this.upcomingAuctions = this.artworks.filter((artwork) => {
      if (artwork.isAuction && artwork.auction) {
        const auction = artwork.auction;
        return auction.startDate > currentDate;
      }
      return false;
    });

    this.pastAuctions = this.artworks.filter((artwork) => {
      if (artwork.isAuction && artwork.auction) {
        const auction = artwork.auction;
        return auction.endDate < currentDate;
      }
      return false;
    });
  }

  onArtworkClick(artwork: Artworks) {
    console.log('Navigating to artwork detail with ID:', artwork.artworkID); // Debugging statement
    this.router.navigate(['/tabs/artwork-detail', artwork.artworkID]);
  }
}
