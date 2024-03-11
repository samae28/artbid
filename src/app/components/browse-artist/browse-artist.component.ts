import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-artist',
  templateUrl: './browse-artist.component.html',
  styleUrls: ['./browse-artist.component.scss'],
})
export class BrowseArtistComponent implements OnInit {
  selectedSegment: string = 'artist';
  @Input() artist: any;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Artwork array:', this.artist);
  }

  onClick(id: string): void {
    console.log(id);
    this.router.navigate(['tabs/artist-profile' + this.artist.uid]);
  }
}
