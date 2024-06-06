import { Mediums } from './../../../models/mediums.model';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Artworks } from 'src/app/models/artworks.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-artwork-medium',
  templateUrl: './artwork-medium.page.html',
  styleUrls: ['./artwork-medium.page.scss'],
})
export class ArtworkMediumPage implements OnInit {
  @Input() artwork: Artworks[] = [];
  mediums: Mediums[] = [];
  id: any;
  mediumArtwork: Mediums;
  artMedium: Artworks[] = [];
  artworks: Artworks[] = [];
  isLoading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('artWorkMediumId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('artWorkMediumId');
      this.getMediumArtWork();
    });
  }

  async getMediumArtWork() {
    this.isLoading = true;
    try {
      const mediums = await this.apiService.getMediums();
      this.mediumArtwork = mediums.find(
        (medium) => medium.mediumID === this.id
      );
      this.apiService.getArtworks().subscribe((artworks) => {
        this.artMedium = artworks.filter(
          (artwork) => artwork.mediumID === this.id && !artwork.isAuction
        );
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  getBackHref(): string {
    return '/tabs/browse?segment=medium';
  }
}
