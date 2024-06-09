import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mediums } from 'src/app/models/mediums.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {
  selectedSegment: 'medium' | 'artist' = 'medium';
  mediums: Mediums[] = [];
  artists: any[] = [];
  artworks: any[] = [];
  auctionArtworks = [];
  fixedPriceArtworks = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.selectedSegment = queryParams['segment'] || 'medium';
    });
    this.loadMediums();
    this.artists = this.apiService.artists;
    this.artworks = this.artworks;
  }

  loadMediums() {
    this.apiService.getMediums().subscribe(
      (mediums) => {
        this.mediums = mediums;
        console.log('Mediums:', this.mediums);
      },
      (error) => {
        console.error('Error loading mediums:', error);
      }
    );
  }

  navigateToArtistProfile(artistId: string) {
    this.router.navigate(['/tabs/browse/artist-profile', artistId], {
      queryParams: { segment: 'artist' },
    });
  }

  navigateToArtMedium(mediumID: string) {
    this.router.navigate(['/tabs/browse/artwork-medium', mediumID], {
      queryParams: { segment: 'medium' },
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
