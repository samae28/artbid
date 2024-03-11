import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-artwork-card',
  templateUrl: './artwork-card.component.html',
  styleUrls: ['./artwork-card.component.scss'],
})
export class ArtworkCardComponent  implements OnInit {

  @Input() artworkCard: any;
  constructor(
    private api: ApiService 
  ) { }

  ngOnInit() {
  }

}
