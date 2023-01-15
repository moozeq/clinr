import { Component, OnInit } from '@angular/core';
import { LoggedUserDto, LoginUserDto } from './dto/user.dto';
import { TokenStorageService } from './token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'ClinR';
  isLoggedIn = false;
  user!: LoggedUserDto;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    const user = this.tokenStorage.getUser();
    if (user) {
      this.user = user;
      this.isLoggedIn = true;
    }
  }
}
