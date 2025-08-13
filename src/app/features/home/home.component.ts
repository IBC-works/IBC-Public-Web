import { Component, Inject } from '@angular/core';
import { MainNavigationComponent } from "../shared/components/main-navigation/main-navigation.component";
import { CommonModule } from '@angular/common';
import { HomeArticlesViewComponent } from "./components/home-articles-view/home-articles-view.component";
import { APP_GENERAL_IMAGE_CONFIGURATION } from '../shared/config/app-image-configuration.config';
import { CountDownComponent } from "../shared/components/count-down/count-down.component";
import { NewsLetterComponent } from "../shared/components/news-letter/news-letter.component";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MainNavigationComponent,
    HomeArticlesViewComponent,
    CountDownComponent,
    NewsLetterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    @Inject(APP_GENERAL_IMAGE_CONFIGURATION) public AppImage: {[key: string]: string}
  ){}
}
