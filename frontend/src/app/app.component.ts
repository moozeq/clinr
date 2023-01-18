import { Component } from '@angular/core';
import { ToastService } from './toasts/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'ClinR';

  constructor(private toastService: ToastService) { }
}
