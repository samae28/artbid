import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { GlobalService } from './../../../services/global/global.service';
import { ApiService } from 'src/app/services/api/api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Mediums } from './../../../models/mediums.model';

@Component({
  selector: 'app-add-medium',
  templateUrl: './add-medium.page.html',
  styleUrls: ['./add-medium.page.scss'],
})
export class AddMediumPage implements OnInit {
  isLoading: boolean = false;
  image: any;

  constructor(
    private authService: AuthService,
    public afStorage: AngularFireStorage,
    private apiService: ApiService,
    private global: GlobalService
  ) {}

  ngOnInit() {}

  preview(event) {
    console.log(event);
    const files = event.target.files;
    if (files.length == 0) return;
    const mimeType = files[0].type;

    if (!mimeType.match(/image\/*/) == null) return;
    const file = files[0];
    const filePath = 'mediums/' + Date.now() + '_' + file.name;
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

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    if (!this.image || this.image == '') {
      this.global.errorToast('Please assign cover photo for this medium');
      return;
    }
    this.addMedium(form);
  }

  async addMedium(form: NgForm) {
    try {
      this.isLoading = true;
      console.log(form.value);
      const data = await this.authService.register(form.value, 'mediums');

      if (data.id) {
        const mediums = new Mediums(
          data.id, // Use the generated ID
          form.value.mediumType,
          this.image ? this.image : '',
          form.value.description,
          form.value.remarks ? form.value.remarks : ''
        );
        const result = await this.apiService.addMedium(mediums, data.id);
        console.log(result);
        this.global.successToast('Medium Added Successfully');
        form.reset(); // Uncomment if you want to reset the form after submission
      } else {
        this.global.showAlert('Adding Medium failed');
      }

      this.isLoading = false;
    } catch (e) {
      console.log(e);
      this.isLoading = false;
      let msg: string = 'Could not add the medium, please try again.';
      if (e.code == 'auth/email-already-in-use') {
        msg = e.message;
      }
      this.global.showAlert(msg);
    }
  }

  // async addMedium(form: NgForm) {
  //   try {
  //     this.isLoading = true;
  //     console.log(form.value);
  //     const data = await this.authService.register(form.value, 'mediums');

  //     if (data.id) {
  //       const mediums = new Mediums(
  //         data.id, // Use the generated ID
  //         form.value.mediumType,
  //         this.image ? this.image : '',
  //         form.value.description,
  //         form.value.remarks ? form.value.remarks : ''
  //       );
  //       const result = await this.apiService.addMedium(mediums, data.id);
  //       console.log(result);
  //       this.global.successToast('Medium Added Successfully');
  //       // form.reset(); // Uncomment if you want to reset the form after submission
  //     } else {
  //       this.global.showAlert('Adding Medium failed');
  //     }

  //     this.isLoading = false;
  //   } catch (e) {
  //     console.log(e);
  //     this.isLoading = false;
  //     let msg: string = 'Could not add the medium, please try again.';
  //     if (e.code == 'auth/email-already-in-use') {
  //       msg = e.message;
  //     }
  //     this.global.showAlert(msg);
  //   }
  // }

  // async addMedium(form: NgForm) {
  //   try {
  //     this.isLoading = true;
  //     console.log(form.value);
  //     // const id = this.randomString(); // Generate a random ID

  //     const mediums = new Mediums(
  //       '', // Use the generated ID
  //       form.value.mediumType,
  //       this.image ? this.image : '',
  //       form.value.description,
  //       form.value.remarks ? form.value.remarks : ''
  //     );

  //     // Save the medium data to Firestore
  //     const result = await this.apiService.addMedium(mediums);
  //     console.log(result);
  //     this.global.successToast('Medium Added Successfully');
  //     // form.reset(); // Uncomment if you want to reset the form after submission

  //     this.isLoading = false;
  //   } catch (e) {
  //     console.log(e);
  //     this.isLoading = false;
  //     let msg: string = 'Could not add the medium, please try again.';
  //     if (e.code == 'auth/email-already-in-use') {
  //       msg = e.message;
  //     }
  //     this.global.showAlert(msg);
  //   }
  // }

  onCancel() {}
}
