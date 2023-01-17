import { Component, Input } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() user!: any;

  constructor(private tokenStorage: TokenStorageService) { }

  signOut(): void {
    this.tokenStorage.signOut();
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
