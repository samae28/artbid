import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.page.html',
  styleUrls: ['./artist-profile.page.scss'],
})
export class ArtistProfilePage implements OnInit {
  id: any;
  data: any = {};
  artistProfile: any[] = [];
  selectedSegment: 'artworks' | 'biography' | 'reviews' = 'artworks';
  artists: any[] = [];
  artworks: any[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      console.log('data: ', paramMap);
      if (!paramMap.has('artistProfileId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('artistProfileId');
      console.log('id: ', this.id);
      this.getArtistProfile();
    });
    this.isLoading = true;
    this.route.queryParams.subscribe((queryParams) => {
      this.selectedSegment = queryParams['segment'] || 'artworks';
    });
    this.artists = this.api.artists;
    this.artworks = this.api.artworks;
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

  
  getArtistProfile() {
    this.artists = this.api.artists;

    this.data = this.artists.find((x) => x.artistID === this.id);
    console.log('artistName: ', this.data);
  }

  getBackHref(): string {
    const currentUrl = this.router.url;
    return currentUrl.includes('segment=artist')
      ? '/tabs/browse?segment=artist'
      : '/tabs/browse?segment=artist';
  }
}
