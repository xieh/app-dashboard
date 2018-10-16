import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'app/services/users.service';
import { StorageService } from 'app/services/storage.service';

@Injectable()
export class PermissionsGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private storageService: StorageService, private userService: UsersService) { }

  checkPermission(userPermissions: string[], routePermissions: string[]): boolean {
    return routePermissions.every(routePermission => userPermissions.some(userPermission => userPermission === routePermission));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    console.log('canActivate@PermissionsGuard');
    const user: any = this.storageService.get('user');

    return new Promise(resolve => {
      this.userService.getUser(user.email).subscribe((_user: any) => {
        console.log(route, route.data);
        const requiredPermissions = route.data.permissions || [];
        const userPermissions = _user.permissions || [];

        const hasPermissions = this.checkPermission(userPermissions, requiredPermissions);
        if (!requiredPermissions.length || hasPermissions) {
          return resolve(true);
        } else if (hasPermissions) {
          this.router.navigate(['/']);
          return resolve(false);
        }
      });
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    console.log('canActivateChild@PermissionsGuard');
    const user: any = this.storageService.get('user');

    return new Promise(resolve => {
      this.userService.getUser(user.email).subscribe((_user: any) => {
        console.log(route, route.data);
        const requiredPermissions = route.data.permissions || [];
        const userPermissions = _user.permissions || [];

        const hasPermissions = this.checkPermission(userPermissions, requiredPermissions);
        if (!requiredPermissions.length || hasPermissions) {
          return resolve(true);
        } else if (hasPermissions) {
          this.router.navigate(['/']);
          return resolve(false);
        }
      });
    });
  }
}
