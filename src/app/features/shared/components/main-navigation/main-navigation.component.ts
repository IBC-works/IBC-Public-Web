import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  imports: [
    RouterModule,
    LogoComponent
  ],
  templateUrl: './main-navigation.component.html',
  styleUrl: './main-navigation.component.scss'
})
export class MainNavigationComponent {}
