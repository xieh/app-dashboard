import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrganizationsService } from 'app/services/organizations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  forms: {
    organization?: FormGroup;
  } = {};
  organization;
  organizationId;
  timezones = [];
  error;
  success;

  constructor(
    private organizationsService: OrganizationsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subs[this.subs.length] = this.route.params.subscribe(async params => {
      this.organizationId = params.organizationId;
      await this.getOrganization();
      this.initForm();
      this.timezones = moment.tz.names();
    });
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }

  initForm() {
    this.forms.organization = new FormGroup({
      title: new FormControl(this.organization.title),
      legalAddress: new FormControl(this.organization.legalAddress),
      owner: new FormControl({
        value: this.organization.owner,
        disabled: true,
      }),
      timeZone: new FormControl(this.organization.timeZone),
      active: new FormControl(this.organization.active),
    });
  }

  getOrganization() {
    return new Promise((resolve, reject) => {
      this.organizationsService
        .getOrganization(this.organizationId)
        .then(organization => {
          console.log('[GET] Organization: ', organization);
          this.organization = organization;
          resolve();
        })
        .catch(err => this.router.navigate(['/node/organizations']));
    });
  }

  modifyOrganization() {
    this.error = false;
    this.success = false;
    const form = this.forms.organization;
    const data = form.value;
    const body = {};

    if (form.invalid) {
      this.error = 'Form is invalid';
    }

    Object.keys(data).map(property => {
      if (data[property]) {
        body[property] = data[property];
      }
    });

    this.organizationsService
      .modifyOrganization(this.organizationId, body)
      .then(organization => {
        console.log('[MODIFY] Organization: ', organization);
        this.getOrganization();
      })
      .catch(err => {
        console.error('[MODIFY] Organization: ', err);
        this.error = 'Organization update failed';
      });
  }
}
