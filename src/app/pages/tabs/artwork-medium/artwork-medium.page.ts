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
  artworks: any[] = [];
  mediums: any[] = [];
  id: any;
  data: any = {};
  artMedium: any[] = [];
  @Input() artwork: any;
  isLoading: boolean = false;
  auctionArtworks = []; 
  fixedPriceArtworks = []; 

  constructor(
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    this.auctionArtworks = this.api.getAuctionArtworks();
    this.fixedPriceArtworks = this.api.getFixedPriceArtworks();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      console.log('data: ', paramMap);
      if (!paramMap.has('artWorkMediumId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('artWorkMediumId');
      console.log('id: ', this.id);
      this.getArtWorkMedium();
    });
    this.isLoading = true;

    setTimeout(() => {
      this.artworks = this.api.artworks;
      this.mediums = this.api.mediums;

      this.data = this.mediums.find((x) => x.mediumID === this.id);

      // this.auctionArtworks = this.artworks.filter(artwork => artwork.isAuction);
      // this.fixedPriceArtworks = this.artworks.filter(artwork => !artwork.isAuction);
      // this.data = this.artworks.filter(artwork => !artwork.isAuction);

      this.isLoading = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  getArtWorkMedium() {
    this.mediums = this.api.mediums;

    console.log('getArtWorkMedium started');
    this.data = this.mediums.find((x) => x.mediumID === this.id);
    console.log('artMediumName:', this.data);
  }
}
