import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-medium',
  templateUrl: './browse-medium.component.html',
  styleUrls: ['./browse-medium.component.scss'],
})
export class BrowseMediumComponent implements OnInit {
  selectedSegment: string = 'medium';
  @Input() medium: any;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Artwork array:', this.medium);
  }

  onClick(id: string): void {
    console.log(id);
    this.router.navigate(['tabs/artwork-medium' + this.medium.uid]);
  }
  
}
