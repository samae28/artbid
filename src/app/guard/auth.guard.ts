import { ProfileService } from 'src/app/services/profile/profile.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService
  ) { }

  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]
// ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     return this.authService.checkAuth().then(id => {
  //       console.log('auth guard checking id: ', id);
  //       if(id) {
  //         // getprofile
  //         this.profileService.getProfile().then(profile => {
  //           console.log('user profile', profile);
  //           if (profile && profile?.type == 'user') {
  //             return true;
  //           } else if(profile && profile?.type == 'seller') {
  //             this.router.navigateByUrl('/seller');
  //             return false;
  //           } else if(profile && profile?.type == 'admin') {
  //             this.router.navigateByUrl('/admin');
  //             return false;
  //           } else {                
  //             this.authService.logout();
  //             this.router.navigateByUrl('/login');
  //             return false;
  //           }
  //         })
  //         .catch(e => {
  //           console.log(e);
  //           this.authService.logout();
  //           this.router.navigateByUrl('/login');
  //           return false;
  //         })
  //         return true;
  //       }
  //       else {
  //         // redrect to login page
  //         this.router.navigateByUrl('/login');
  //         return false;
  //       }
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.router.navigateByUrl('/login');
  //         return false;
  //     });
  //   }

//   canLoad(
//   route: Route,
//   segments: UrlSegment[]
// ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//   return this.authService.checkAuth().then(id => {
//     console.log('auth guard checking id: ', id);
//     if (id) {
//       // getprofile
//       return this.profileService.getProfile().then(profile => {
//         console.log('user profile', profile);
//         if (profile && profile.type == 'user') {
//           return true;
//         } else if (profile && profile.type == 'seller') {
//           this.router.navigateByUrl('/seller');
//           return false; // Navigate to seller page and return false
//         } else if (profile && profile.type == 'admin') {
//           this.router.navigateByUrl('/admin');
//           return false; // Navigate to admin page and return false
//         } else {
//           this.authService.logout();
//           this.router.navigateByUrl('/login');
//           return false;
//         }
//       }).catch(e => {
//         console.log(e);
//         this.authService.logout();
//         this.router.navigateByUrl('/login');
//         return false;
//       });
//     } else {
//       // redirect to login page
//       this.router.navigateByUrl('/login');
//       return false;
//     }
//   }).catch(e => {
//     console.log(e);
//     this.router.navigateByUrl('/login');
//     return false;
//   });
// }

canLoad(
  route: Route,
  segments: UrlSegment[]
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return this.authService.checkAuth().then(id => {
    console.log('auth guard checking id: ', id);
    if (id) {
      // getprofile
      return this.profileService.getProfile().then(profile => {
        console.log('user profile', profile);
        if (profile && profile.type == 'user') {
          return true;
        } else if (profile && profile.type == 'seller') {
          if (route.path === 'seller') {
            // Allow navigation only if the route is explicitly 'seller'
            return true;
          } else {
            this.router.navigateByUrl('/seller');
            return false; // Navigate to seller page and return false
          }
        } else if (profile && profile.type == 'admin') {
          if (route.path === 'admin') {
            // Allow navigation only if the route is explicitly 'admin'
            return true;
          } else {
            this.router.navigateByUrl('/admin');
            return false; // Navigate to admin page and return false
          }
        } else {
          this.authService.logout();
          this.router.navigateByUrl('/login');
          return false;
        }
      }).catch(e => {
        console.log(e);
        this.authService.logout();
        this.router.navigateByUrl('/login');
        return false;
      });
    } else {
      // redirect to login page
      this.router.navigateByUrl('/login');
      return false;
    }
  }).catch(e => {
    console.log(e);
    this.router.navigateByUrl('/login');
    return false;
  });
}


}
