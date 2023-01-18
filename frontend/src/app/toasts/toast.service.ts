import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventType, ToastEvent } from './toast/toast.component';
import { ToastsModule } from './toasts.module';

@Injectable({
  providedIn: ToastsModule
})
export class ToastService {
  toastEvents$: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents$ = this._toastEvents.asObservable();
  }

  showToast(type: EventType, title: string, message: string): void {
    this._toastEvents.next({
      type,
      title,
      message
    });
  }
}
