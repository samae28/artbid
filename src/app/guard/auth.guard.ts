import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const roleType = route.data['type'];
    try {
      const type = await this.authService.checkUserAuth();
      if (type) {
        if (type == roleType) return true;
        else {
          let url = '/tabs';
          if (type == 'admin') url = '/admin';
          else if (type == 'seller') url = '/seller';
          this.navigate(url);
          return false;
        }
      } else {
        this.checkForAlert(roleType);
        return false;
      }
    } catch (e) {
      console.log(e);
      this.checkForAlert(roleType);
      return false;
    }
  }

  navigate(url) {
    this.router.navigateByUrl(url, { replaceUrl: true });
    return false;
  }

  async checkForAlert(roleType) {
    const id = await this.authService.getId();
    if (id) {
      // check network
      console.log('alert: ', id);
      this.showAlert(roleType);
    } else {
      this.authService.logout();
      this.navigate('/login');
    }
  }

  showAlert(role) {
    this.alertCtrl
      .create({
        header: 'Authentication Failed',
        message: 'Please check your Internet Connectivity and tr again',
        buttons: [
          {
            text: 'Logout',
            handler: () => {
              this.authService.logout();
              this.navigate('/login');
            },
          },
          {
            text: 'Retry',
            handler: () => {
              let url = '/tabs';
              if (role == 'admin') url = '/admin';
              this.navigate(url);
            },
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }
}
