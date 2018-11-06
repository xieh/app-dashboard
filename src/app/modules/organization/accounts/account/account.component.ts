import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'app/services/users.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  getUserSub: Subscription;
  routeSub: Subscription;
  userForm: FormGroup;
  user;
  email;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.email = params.email;
      this.usersService.getUser(this.email).subscribe();
      this.getUser();
    });
  }

  ngOnDestroy() {
    if (this.getUserSub) { this.getUserSub.unsubscribe(); }
  }

  initUserForm() {
    this.userForm = new FormGroup({
      address: new FormControl({ value: this.user.address, disabled: true }),
      full_name: new FormControl({ value: this.user.full_name, disabled: true }),
      email: new FormControl({ value: this.user.email, disabled: true }),
      timeZone: new FormControl({ value: this.user.timeZone, disabled: true }),
    });
  }

  getUser() {
    this.getUserSub = this.usersService._user.subscribe(
      user => {
        console.log('USER GET: ', user);
        this.user = user;
        this.initUserForm();
      },
    );
  }

  save() {

  }
}