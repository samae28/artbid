import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

import { Observable, Subscription, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.page.html',
  styleUrls: ['./artwork-detail.page.scss'],
})
export class ArtworkDetailPage implements OnInit {
  id: any;
  artwork: any = {};
  artworks: any[] = [];
  countdown: string | undefined;
  private timerSubscription: Subscription = new Subscription();
  userBid: string[] = [];
  showInputField: boolean = false;
  userInput: string = '';
  mediums: any[] = [];
  artists: any[] = [];

  constructor(
    private api: ApiService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.mediums = this.api.mediums;
    this.artists = this.api.artists;
    this.artworks = this.artworks;

    this.route.paramMap.subscribe((paramMap) => {
      console.log('artwork: ', paramMap);
      if (!paramMap.has('artworkDetailId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('artworkDetailId');
      console.log('id: ', this.id);
      this.getArtWorks();
      this.startCountdown();
    });
  }

  getArtist(artistID: any): any {
    console.log('get artists');
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
    console.log('get art');

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

  
  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  startCountdown() {
    const currentTime$ = timer(0, 1000).pipe(map(() => new Date()));

    this.timerSubscription = currentTime$
      .pipe(
        map((currentTime) => this.calculateTimeRemaining(currentTime)),
        takeWhile((timeRemaining) => timeRemaining !== '00:00:00')
      )
      .subscribe((timeRemaining) => {
        // Update the countdown based on the calculated time remaining
        this.countdown = timeRemaining;
      });
  }

  

  getArtWorks() {
    this.artworks = this.api.artworks;

    this.artwork = this.artworks.find((x) => x.artworkID === this.id);
    console.log('title: ', this.artwork);
  }

  calculateTimeRemaining(currentTime: Date): string {
    const timeDiff = this.artwork.endDate.getTime() - currentTime.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days} : ${this.padZero(hours)} : ${this.padZero(
      minutes
    )} : ${this.padZero(seconds)} `;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  placeBid() {
    const newBid = parseFloat(this.userBid[0]);
    if (!isNaN(newBid) && newBid > this.artwork.currentBid) {
      this.artwork.bids.push({ bidder: 'You', amount: newBid });
      this.artwork.currentBid = newBid;
      this.userBid = [];
    } else {
      console.log(
        'Your bid must be a valid number higher than the current highest bid.'
      );
    }
  }
 
  
  getHighestBid(): number {
    let highestBid = 0;
    if (this.artwork.isAuction && this.artwork.auction.length > 0) {
      this.artwork.auction.forEach((auction) => {
        if (auction.bids && auction.bids.length > 0) {
          auction.bids.forEach((bid) => {
            const bidAmount = parseFloat(bid.bidAmount);
            if (bidAmount > highestBid) {
              highestBid = bidAmount;
            }
          });
        }
      });
    }
    return highestBid;
  }
  
  toggleInputField() {
    this.showInputField = !this.showInputField;
    if (!this.showInputField) {
      this.userInput = '';
    }
  }
}
