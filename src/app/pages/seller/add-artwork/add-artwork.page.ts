import { Artworks } from './../../../models/artworks.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { Mediums } from 'src/app/models/mediums.model';

@Component({
  selector: 'app-add-artwork',
  templateUrl: './add-artwork.page.html',
  styleUrls: ['./add-artwork.page.scss'],
})
export class AddArtworkPage implements OnInit {
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef;
  isLoading: boolean = false;
  isAuction: boolean = false;
  mediums: Mediums[] = [];
  image: string | ArrayBuffer | null = null;
  artworks: Artworks[] = [];
  imageFile: any;
  startDate: any;

  price: number;
  startingBid: number;
  isPrice: boolean = false;

  constructor(
    private authService: AuthService,
    public afStorage: AngularFireStorage,
    private apiService: ApiService,
    private global: GlobalService
  ) {}

  ngOnInit() {
    this.getMediums();
  }

  async getMediums() {
    try {
      this.global.showLoader();
      this.mediums = await this.apiService.getMediums();
      this.global.hideLoader();
    } catch (e) {
      console.log(e);
      this.global.errorToast();
    }
  }

  async changeMedium(event) {
    try {
      console.log(event);
    } catch (e) {}
  }

  async getArtwork() {
    try {
      this.artworks = await this.apiService.getArtwork();
    } catch (e) {
      console.log(e);
      this.global.errorToast();
    }
  }

  preview(event) {
    console.log(event);
    const files = event.target.files;
    if (files.length == 0) return;
    const mimeType = files[0].type;

    if (!mimeType.match(/image\/*/) == null) return;
    const file = files[0];
    const filePath = 'artworks/' + Date.now() + '_' + file.name;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const downloadUrl = fileRef.getDownloadURL();
          downloadUrl.subscribe((url) => {
            console.log('url: ', url);
            if (url) {
              this.image = url;
            }
          });
        })
      )
      .subscribe((url) => {
        console.log('data: ', url);
      });
  }

  randomString() {
    const id = Math.floor(100000000 + Math.random() * 900000000);
    return id.toString();
  }

  async onSubmit(form: NgForm) {
    if (!form.valid || !this.image) return;
    try {
      this.isLoading = true;
      const url = await this.uploadImage(this.imageFile);
      console.log(url);
      if (!url) {
        this.isLoading = false;
        this.global.errorToast('Image not uploaded, please try again');
        return;
      }

      const data = {
        image: url,
        artworkID: this.randomString(), // Assuming artworkID needs to be generated
        mediumID: form.value.mediumID || '',
        title: form.value.title || '',
        description: form.value.description || '',
        price: form.value.price || 0,
        status: form.value.status || 'available',
        isAuction: form.value.isAuction || false,
        auction: form.value.isAuction
          ? {
              auctionID: this.randomString(),
              startDate: form.value.startDate || null,
              endDate: form.value.endDate || null,
              bids: [],
            }
          : null,
      };

      if (!data.isAuction) {
        delete data.auction;
      }

      await this.apiService.addArtworkItem(data);
      this.isLoading = false;
      this.global.successToast('Artwork Added Successfully');
    } catch (e) {
      console.log(e);
      this.isLoading = false;
      this.global.errorToast();
    }
  }

  toggleChanged() {
    console.log('Toggle changed:', this.isAuction);
  }

  onToggleChange() {
    if (this.isPrice) {
      this.startingBid = this.price;
    } else {
      this.startingBid = null;
    }
  }

  onFileChosen(event) {
    const file = event.target.files[0];
    if (!file) return;
    console.log('file: ', file);
    this.imageFile = file;
    const reader = new FileReader();
    console.log(reader);
    reader.onload = () => {
      const dataUrl = reader.result.toString();
      this.image = dataUrl;
      console.log('image: ', this.image);
    };
    reader.readAsDataURL(file);
  }

  changeImage() {
    this.filePickerRef.nativeElement.click();
  }

  uploadImage(imageFile) {
    return new Promise((resolve, reject) => {
      const mimeType = imageFile.type;
      if (mimeType.match(/image\/*/) == null) return;
      const file = imageFile;
      const filePath = 'artworks/' + Date.now() + '_' + file.name;
      const fileRef = this.afStorage.ref(filePath);
      const task = this.afStorage.upload(filePath, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            const downloadUrl = fileRef.getDownloadURL();
            downloadUrl.subscribe((url) => {
              console.log('url: ', url);
              if (url) {
                resolve(url);
              }
            });
          })
        )
        .subscribe((url) => {
          console.log(url);
        });
    });
  }
}
