import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-add-artwork',
  templateUrl: './add-artwork.page.html',
  styleUrls: ['./add-artwork.page.scss'],
})
export class AddArtworkPage implements OnInit {

  isLoading: boolean = false;
  isAuction: boolean = false;
  mediums: any[] = [];
  image: string | ArrayBuffer | null = null;
  artworks: any[] = [];


  constructor(
    private authService: AuthService,
    private apiService: ApiService, 
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.getMediums();
  }

  async getMediums() {
    try {
      this.mediums = await this.apiService.getMediums();   
    } catch (e) {
      console.log(e);
      this.global.errorToast();
    }
  }

  async getArtwork() {
    try {
      this.artworks = await this.apiService.getArtwork();   
    } catch (e) {
      console.log(e);
      this.global.errorToast();
    }
  }

  preview(event: Event) {
    console.log(event);  // Debugging line
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;
  
    const mimeType = files[0].type;
    if (!mimeType.match(/image\/*/)) return;
  
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      console.log('File reader result:', reader.result);  // Debugging line
      this.image = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(form: NgForm) {
    if(!form.valid) return;
    this.register(form);
  }
  register(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    this.authService.register(form.value).then(data => {
    })
    .catch(e => {
      console.log(e);
      this.isLoading = false;
    });
  }

  toggleChanged() {
    console.log('Toggle changed:', this.isAuction);
  }

  changeImage(){
    
  }
}
