import { Injectable } from '@angular/core';
import { APP_CONFIG } from 'config/app.config';
import { ConfigModule } from './config.module';

@Injectable({
  providedIn: ConfigModule
})
export class ConfigService {
  config = APP_CONFIG;
  frontendUrl: string;
  backendUrl: string;

  constructor() {
    this.frontendUrl = `http://${this.config.frontend.host}:${this.config.frontend.port}`;
    this.backendUrl = `http://${this.config.backend.host}:${this.config.backend.port}`;
  }
}
