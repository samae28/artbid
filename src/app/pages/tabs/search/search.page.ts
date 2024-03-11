import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('searchInput') sInput;
  model: any = {
    icon: 'search-outline',
    title: 'No Artists Record Found',
  };
  isLoading: boolean;
  query: any;
  allArtworks: any[] = [];

  artworks: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
  }

  async onSearchChange(event) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    this.artworks = [];
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async () => {
        this.allArtworks = this.api.allArtworks;

        this.artworks = this.allArtworks.filter((element: any) => {
          return element.short_name.includes(this.query);
        });
        console.log(this.artworks);
        this.isLoading = false;
      }, 3000);
    }
  }
}
