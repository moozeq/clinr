import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faCircleCheck, faCircleInfo, faExclamation, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Toast } from 'bootstrap';
import { fromEvent, take } from 'rxjs';

export const enum EventType {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}

export interface ToastEvent {
  type: EventType;
  title: string;
  message: string;
}

export const ToastIcons = {
  [EventType.Error]: faExclamation,
  [EventType.Success]: faCircleCheck,
  [EventType.Warning]: faExclamationTriangle,
  [EventType.Info]: faCircleInfo,
};

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Output()
  disposeEvent = new EventEmitter();

  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;

  @Input()
  type!: EventType;

  @Input()
  title!: string;

  @Input()
  message!: string;

  toast!: Toast;

  get icon() {
    return ToastIcons[this.type];
  }

  ngOnInit(): void {
    this.show();
  }

  show(): void {
    const peristent = Boolean(this.type === EventType.Error);
    this.toast = new Toast(
      this.toastEl.nativeElement,
      peristent ? { autohide: false } : { delay: 5000 }
    );

    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());

    this.toast.show();
  }

  hide(): void {
    if (!this.toast) return;
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}
