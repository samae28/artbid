import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  profile: any = {};

  constructor(
    private navCtrl: NavController,
    private global: GlobalService,
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // this.ordersSub = this.orderService.orders.subscribe(order => {
    //   console.log('order data: ', order);
    //   this.orders = order;
    // }, e => {
    //   console.log(e);
    // });
    this.profile = this.profileService.profile.subscribe(profile => {
      this.profile = profile;
      console.log(this.profile);
    });
    this.getData();
  }

  async getData() {
    await this.profileService.getProfile();
  }

  logout() {
    this.global.showLoader();
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot('/login');
      this.global.hideLoader();
    })
    .catch(e => {
      console.log(e);
      this.global.hideLoader();
      this.global.errorToast('Logout Failed! Check your internet connection');
    });
  }

  async editProfile() {
    const options = {
      component: EditProfileComponent,
      componentProps: {
        profile: this.profile
      },
      cssClass: 'custom-modal',
      swipeToClose: true
    };
    const modal = await this.global.createModal(options);
  }
}