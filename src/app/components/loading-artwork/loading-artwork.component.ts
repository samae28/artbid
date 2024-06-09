import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-artwork',
  templateUrl: './loading-artwork.component.html',
  styleUrls: ['./loading-artwork.component.scss'],
})
export class LoadingArtworkComponent implements OnInit {
  dummy = Array(10);
  constructor() {}

  ngOnInit() {}
}
