import { Injectable, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

const spinnerOptions = {
  type: 'line-scale-party',
  bdColor: 'rgba(255,255,255,0)',
  color: '#333333',
};

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  private spinnerService = inject(NgxSpinnerService);
  private busyRequestCount = 0;

  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, spinnerOptions);
  }
  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
