import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent  implements OnInit {

  @Input() artist: any;
  mediums: any[] = [];
  artistName: string = 'Example Artist'; // Initialize with an example artist name
  isFollowing: boolean = false; // Flag to track if the artist is being followed


  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  followArtist() {
    if (!this.isFollowing) {
      // Perform actions to follow the artist, such as sending a request to your backend
      // Simulating asynchronous behavior with a timeout
      this.isFollowing = true; // Update the flag to indicate the artist is being followed
      console.log('Following artist:', this.artistName);
      setTimeout(() => {
        console.log('Artist followed successfully.');
      }, 2000); // Simulating a delay for demonstration purposes (2 seconds)
    } else {
      console.log('You are already following this artist.');
    }
  }
}
