import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { ToastEvent } from '../toast/toast.component';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {
  toasts: ToastEvent[] = [];

  constructor(private toastService: ToastService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscribeToToasts();
  }

  subscribeToToasts(): void {
    this.toastService.toastEvents$.subscribe((newToast) => {
      const toast: ToastEvent = {
        type: newToast.type,
        title: newToast.title,
        message: newToast.message
      };
      this.toasts.push(toast);
      this.cdr.detectChanges();
    })
  }

  dispose(index: number) {
    this.toasts.splice(index, 1);
    this.cdr.detectChanges();
  }
}
