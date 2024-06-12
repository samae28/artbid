import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable, Subscription, combineLatest, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Mediums } from 'src/app/models/mediums.model';
import { Artworks } from 'src/app/models/artworks.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.page.html',
  styleUrls: ['./artwork-detail.page.scss'],
})
export class ArtworkDetailPage implements OnInit, OnDestroy {
  id: any;
  artwork: Artworks;
  artworks: Artworks[] = [];
  countdown: string | undefined;
  userBid: number = 0;
  showInputField: boolean = false;
  userInput: string = '';
  mediums: Mediums[] = [];
  medium: Mediums;
  artists: any[] = [];
  private timerSubscription: Subscription = new Subscription();
  private artworkSubscription: Subscription;
  private mediumSubscription: Subscription;
  private artistSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    public afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('artworkID');
      if (!this.id) {
        this.navCtrl.back();
        return;
      }
      this.getArtworkDetail();
    });
  }

  getArtworkDetail() {
    this.artworkSubscription = combineLatest([
      this.apiService.getArtworks(),
      this.apiService.getMediums(),
    ]).subscribe(([artworks, mediums]) => {
      this.artworks = artworks;
      this.mediums = mediums;

      this.artwork = this.artworks.find(
        (artwork) => artwork.artworkID === this.id
      );
      if (!this.artwork) {
        console.error('Artwork not found');
        return;
      }

      this.medium = this.mediums.find(
        (medium) => medium.mediumID === this.artwork.mediumID.id
      );
      if (!this.medium) {
        console.error('Medium not found for artwork');
      }

      // this.getArtistDetail(this.artwork.artistID);
      this.displayArtworkDetail();
    });
  }

  displayArtworkDetail() {
    if (!this.mediums || this.mediums.length === 0) {
      console.error('No mediums available');
      return;
    }

    if (!this.medium) {
      console.error('Medium not found for artwork');
      return;
    }
  }

  getMediumImage(mediumID: string): string {
    const medium = this.mediums.find((medium) => medium.mediumID === mediumID);
    return medium ? medium.image : 'default_image_url';
  }

  getMediumType(artwork: Artworks): string {
    if (artwork.mediumID) {
      const medium = this.mediums.find(
        (medium) => medium.mediumID === artwork.mediumID.id
      );
      return medium ? medium.mediumType : 'Unknown Medium';
    }
    return 'Medium ID not provided';
  }

  getArtist(artistID: any): any {
    if (this.artists) {
      const artist = this.artists.find(
        (artist) => artist.artistID.toString() === artistID.toString()
      );
      return artist || { artistName: 'Unknown Artist' };
    } else {
      return { artistName: 'Unknown Artist' };
    }
  }

  navigateToArtistProfile(artistId: string): void {
    this.router.navigate(['/tabs/artist-profile', artistId]);
  }

  navigate() {
    this.router.navigate(['/tabs/artist-profile']);
  }

  startCountdown() {
    const currentTime$ = timer(0, 1000).pipe(map(() => new Date()));

    this.timerSubscription = currentTime$
      .pipe(
        map((currentTime) => this.calculateTimeRemaining(currentTime)),
        takeWhile((timeRemaining) => timeRemaining !== '00:00:00')
      )
      .subscribe((timeRemaining) => (this.countdown = timeRemaining));
  }

  getArtworks() {
    this.apiService.getArtworks().subscribe((artworks: Artworks[]) => {
      this.artworks = artworks;
      this.artwork = this.artworks.find((x) => x.artworkID === this.id);
      console.log('title: ', this.artwork);
    });
  }

  getArtworksByArtist(artistID: string): Observable<Artworks[]> {
    return new Observable((observer) => {
      this.apiService.getArtworks().subscribe((artworks: Artworks[]) => {
        const filteredArtworks = artworks.filter(
          (artwork) => artwork.artistID === artistID
        );
        observer.next(filteredArtworks);
        observer.complete();
      });
    });
  }

  calculateTimeRemaining(currentTime: Date): string {
    const timeDiff =
      this.artwork.auction.endDate.getTime() - currentTime.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days.toString().padStart(2, '0')}:${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  placeBid() {
    // Implement the logic to place a bid
    console.log('Place bid logic here');
  }

  getHighestBid(artwork: Artworks): number {
    if (artwork.isAuction && artwork.auction && artwork.auction.bids) {
      const highestBid = artwork.auction.bids.reduce(
        (max, bid) => (bid.bidAmount > max ? bid.bidAmount : max),
        0
      );
      return highestBid || artwork.price;
    }
    return artwork.price;
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
    if (this.artworkSubscription) {
      this.artworkSubscription.unsubscribe();
    }
    if (this.mediumSubscription) {
      this.mediumSubscription.unsubscribe();
    }
  }
}
