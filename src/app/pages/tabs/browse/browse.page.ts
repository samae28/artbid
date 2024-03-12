import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {
  selectedSegment: 'medium' | 'artist' = 'medium';
  medium: any[] = [];
  mediums: any[] = [];
  artists: any[] = [];
  artworks: any[] = [];
  auctionArtworks = [];
  fixedPriceArtworks = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.selectedSegment = queryParams['segment'] || 'medium';
    });
    this.mediums = this.api.mediums;
    this.artists = this.api.artists;
    this.artworks = this.artworks;
  }

  navigateToArtistProfile(artistId: string) {
    this.router.navigate(['/tabs/browse/artist-profile', artistId], {
      queryParams: { segment: 'artist' },
    });
  }

  changeSegment(event: CustomEvent) {
    const selectedSegment = event.detail.value as 'medium' | 'artist';
    this.selectedSegment = selectedSegment;
    console.log(this.selectedSegment);

    // Update the URL based on the selected segment
    this.router.navigate(['/tabs/browse'], {
      queryParams: { segment: selectedSegment },
    });
  }
}
