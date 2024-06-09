import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Artworks } from 'src/app/models/artworks.model';
import { ApiService } from 'src/app/services/api/api.service';
import { Mediums } from 'src/app/models/mediums.model';

@Component({
  selector: 'app-artwork-medium',
  templateUrl: './artwork-medium.page.html',
  styleUrls: ['./artwork-medium.page.scss'],
})
export class ArtworkMediumPage implements OnInit {
  artworks: Artworks[] = [];
  mediums: Mediums[] = [];
  id: string;
  mediumArtwork: Mediums;
  artMedium: Artworks[] = [];
  isLoading = false;

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

  getMediumArtWork() {
    this.isLoading = true;
    this.apiService.getMediums().subscribe(
      (mediums) => {
        this.mediums = mediums;
        this.mediumArtwork = this.mediums.find(
          (medium) => medium.mediumID === this.id
        );
        if (this.mediumArtwork) {
          this.apiService.getArtworks().subscribe(
            (artworks) => {
              this.artMedium = artworks.filter(
                (artwork) => artwork.mediumID === this.id && !artwork.isAuction
              );
              this.isLoading = false;
              this.cdr.detectChanges();
            },
            (error) => {
              this.isLoading = false;
              console.error('Error loading artworks:', error);
            }
          );
        } else {
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error loading mediums:', error);
      }
    );
  }

  getBackHref(): string {
    return '/tabs/browse?segment=medium';
  }
}
