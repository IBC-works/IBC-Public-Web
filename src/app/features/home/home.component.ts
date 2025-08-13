import { Component, Inject } from '@angular/core';
import { MainNavigationComponent } from "../shared/components/main-navigation/main-navigation.component";
import { CommonModule } from '@angular/common';
import { HomeArticlesViewComponent } from "./components/home-articles-view/home-articles-view.component";
import { APP_GENERAL_IMAGE_CONFIGURATION } from '../shared/config/app-image-configuration.config';
import { HomeCountDownComponent } from "./components/home-count-down/home-count-down.component";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MainNavigationComponent,
    HomeArticlesViewComponent,
    HomeCountDownComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    @Inject(APP_GENERAL_IMAGE_CONFIGURATION) public AppImage: {[key: string]: string}
  ){}
}
