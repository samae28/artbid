import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Artworks } from 'src/app/models/artworks.model';
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
  allArtworks: Artworks[] = [];
  query: string = '';
  isLoading: boolean = false;

  artworks: Artworks[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
    this.loadArtworks();
  }

  loadArtworks() {
    this.apiService.getArtworks().subscribe((data: Artworks[]) => {
      this.artworks = data;
    });
  }

  async onSearchChange(event) {
    this.query = event.detail.value.toLowerCase();
    this.artworks = [];
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(() => {
        this.artworks = this.allArtworks.filter((element: any) => {
          return element.title.toLowerCase().includes(this.query);
        });
        this.isLoading = false;
      }, 3000);
    }
  }
}
