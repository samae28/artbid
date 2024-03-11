import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse-medium',
  templateUrl: './browse-medium.component.html',
  styleUrls: ['./browse-medium.component.scss'],
})
export class BrowseMediumComponent implements OnInit {
  selectedSegment: string = 'medium';
  @Input() medium: any;

  constructor() {}

  ngOnInit() {
    console.log('Artwork array:', this.medium);
  }
}
