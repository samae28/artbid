import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Artworks } from 'src/app/models/artworks.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.page.html',
  styleUrls: ['./artist-profile.page.scss'],
})
export class ArtistProfilePage implements OnInit {
  id: any; //use to store paramMap.get('artistProfileId')
  artistProfile: any = {}; // used to store the artist's profile data fetched from an API based on the artist's ID.
  selectedSegment: 'artworks' | 'biography' | 'reviews' = 'artworks';
  artists: any[] = [];
  artworks: Artworks[] = [];
  isLoading: boolean = false;
  artistArtworks: any[] = [];
  mediums: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private api: ApiService
  ) {}

  ngOnInit() {
    //checks if an 'artistProfileId' exists, goes back if it doesn't, and then retrieves the artist's artworks and profile
    this.route.paramMap.subscribe((paramMap) => {
      console.log('artistProfile: ', paramMap);
      if (!paramMap.has('artistProfileId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('artistProfileId');
      console.log('id: ', this.id);
      // this.getArtistArtworks();
      this.getArtistProfile();
    });

    this.isLoading = true;
    this.route.queryParams.subscribe((queryParams) => {
      this.selectedSegment = queryParams['segment'] || 'artworks';
    });

    this.artists = this.api.artists;
    // this.artworks = this.api.artworks.map(art => art.isAuction);
    this.mediums = this.api.mediums;
  }

  //filters artworks based on the artist's ID and excludes auction artworks, storing the filtered results in artistArtworks
  // getArtistArtworks() {
  //   this.artistArtworks = this.api.artworks.filter(artwork => artwork.artistID === this.id && !artwork.isAuction);
  // }

  //assigns the artist's profile data from the API to the artistProfile variable based on the artist's ID
  getArtistProfile() {
    this.artists = this.api.artists;
    let artistProfile: any = this.artists.filter((x) => x.artistID === this.id);
    this.artistProfile = artistProfile[0];
    this.artistArtworks = this.api.artworks.filter(
      (artwork) => artwork.artistID === this.id && !artwork.isAuction
    );
    // this.artworks = this.api.artworks;
    console.log('artistName: ', this.artistProfile);
  }

  changeSegment(event: CustomEvent) {
    const selectedSegment = event.detail.value as
      | 'artworks'
      | 'biography'
      | 'reviews';
    this.selectedSegment = selectedSegment;
    console.log(this.selectedSegment);

    this.router.navigate(['/tabs/browse?segment=artist'], {
      queryParams: { segment: selectedSegment },
    });
  }

  getBackHref(): string {
    const currentUrl = this.router.url;
    return currentUrl.includes('segment=artist')
      ? '/tabs/browse?segment=artist'
      : '/tabs/browse?segment=artist';
  }
}
