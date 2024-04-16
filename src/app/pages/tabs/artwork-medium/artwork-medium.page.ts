import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-artwork-medium',
  templateUrl: './artwork-medium.page.html',
  styleUrls: ['./artwork-medium.page.scss'],
})
export class ArtworkMediumPage implements OnInit {
  
  id: any; //use to store paramMap.get('artistProfileId')
  mediumArtwork: any = {}; // used to store the artist's profile data fetched from an API based on the artist's ID.
  artMedium: any[] = [];
  artworks: any[] = [];
  mediums: any[] = [];
  @Input() artwork: any;
  isLoading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
  }

  ngOnInit() {
    //checks if an 'artWorkMediumId' exists, goes back if it doesn't, and then retrieves the artMedium and MediumArtworks
    this.route.paramMap.subscribe((paramMap) => {
      console.log('mediumArtwork: ', paramMap);
      if (!paramMap.has('artWorkMediumId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('artWorkMediumId');
      console.log('id: ', this.id);
      this.getMediumArtWork();
      // this.getArtMedium();
    });

    this.isLoading = true;

    this.artworks = this.api.artworks;
    this.mediums = this.api.mediums;
    this.artworks = this.api.artworks.map(art => art.isAuction);
  }

    // getArtMedium() {
    //   this.artMedium = this.api.artworks.filter(artwork => artwork.mediumID === this.id && !artwork.isAuction);
    // }

    getMediumArtWork() {
      this.mediums = this.api.mediums;
      let mediumArtwork: any = this.mediums.filter((x) => x.mediumID === this.id);
      this.mediumArtwork = mediumArtwork [0];
      this.artMedium = this.api.artworks.filter(artwork => artwork.mediumID === this.id && !artwork.isAuction);
      console.log('mediumName:', this.mediumArtwork);
    } 
    getBackHref(): string {
      const currentUrl = this.router.url;
      return currentUrl.includes('segment=medium')
        ? '/tabs/browse?segment=medium'
        : '/tabs/browse?segment=medium';
    }
}
