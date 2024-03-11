import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.page.html',
  styleUrls: ['./auction.page.scss'],
})
export class AuctionPage implements OnInit {
  artworks: any[] = [];
  @Input() artwork: any;
  isLoading: boolean = false;
  selectedSegment: 'current' | 'upcoming' | 'past';
  upcomingArtworks: any[];

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.selectedSegment = queryParams['segment'] || 'current';
    });
    this.isLoading = true;

    setTimeout(() => {
      this.artworks = this.api.artworks;
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  changeSegment(event: CustomEvent) {
    const selectedSegment = event.detail.value as
      | 'current'
      | 'upcoming'
      | 'past';
    this.selectedSegment = selectedSegment;
    console.log(this.selectedSegment);

    // Update the URL based on the selected segment
    this.router.navigate(['/tabs/auction'], {
      queryParams: { segment: selectedSegment },
    });
  }
}

