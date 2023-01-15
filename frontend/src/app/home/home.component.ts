import { Component, Input } from '@angular/core';
import { LoggedUserDto } from '../dto/user.dto';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() user!: LoggedUserDto;

  constructor(private tokenStorage: TokenStorageService) { }

  signOut(): void {
    this.tokenStorage.signOut();
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
