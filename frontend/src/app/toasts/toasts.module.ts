import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastComponent } from './toast/toast.component';
import { ToasterComponent } from './toaster/toaster.component';



@NgModule({
  declarations: [
    ToastComponent,
    ToasterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    ToastComponent,
    ToasterComponent,
  ]
})
export class ToastsModule { }
