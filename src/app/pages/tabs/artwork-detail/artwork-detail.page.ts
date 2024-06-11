import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

import { Observable, Subscription, timer } from 'rxjs';
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
  private timerSubscription: Subscription = new Subscription();
  userBid: number = 0; // Change from string array to number
  showInputField: boolean = false;
  userInput: string = '';
  mediums: Mediums[] = [];
  artists: any[] = [];
  private subscription: Subscription;

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
      this.fetchArtworkDetail();
    });
  }

  fetchArtworkDetail() {
    this.subscription = this.firestore
      .collection('allArtworks')
      .doc(this.id)
      .valueChanges()
      .subscribe((data) => {
        if (data) {
          this.artwork = data as Artworks;
        }
      });
  }

  getArtist(artistID: any): any {
    console.log('Artists:', this.artists);
    console.log('ArtistsID to find:', artistID);

    if (this.artists) {
      const artist = this.artists.find(
        (artist) => artist.artistID.toString() === artistID.toString()
      );
      console.log('Found Artist:', artist);
      return artist || { artistName: 'Unknown Artist' };
    } else {
      return { artistName: 'Unknown Artist' };
    }
  }

  getArtMedium(mediumID: any): any {
    console.log('Mediums:', this.mediums);
    console.log('MediumID to find:', mediumID);

    if (this.mediums) {
      const medium = this.mediums.find(
        (medium) => medium.mediumID.toString() === mediumID.toString()
      );
      console.log('Found Medium:', medium);
      return medium || { artMediumName: 'Unknown Medium' };
    } else {
      return { artMediumName: 'Unknown Medium' };
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

    return `${days} : ${this.padZero(hours)} : ${this.padZero(
      minutes
    )} : ${this.padZero(seconds)}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  placeBid() {
    if (this.userBid > this.artwork.auction.currentBid) {
      this.artwork.auction.bids.push({
        bidderID: 'You',
        bidAmount: this.userBid,
        bidTime: new Date().toISOString(),
      });
      this.artwork.auction.currentBid = this.userBid;
    } else {
      console.log('Your bid must be higher than the current highest bid.');
    }
  }

  getCurrentHighestBid(): number {
    const bidAmounts = this.artwork.auction.bids.map((bid) => bid.bidAmount);
    const maxBid = Math.max(...bidAmounts);
    return maxBid || 0;
  }

  toggleInputField() {
    this.showInputField = !this.showInputField;

    if (!this.showInputField) {
      this.userInput = '';
    }
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }
}
