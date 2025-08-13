import { Component, inject, OnInit } from '@angular/core';
import { MainNavigationComponent } from "../shared/components/main-navigation/main-navigation.component";
import { CountDownComponent } from "../shared/components/count-down/count-down.component";
import { NewsLetterComponent } from "../shared/components/news-letter/news-letter.component";
import { Article } from '../../entities/Article.entity';
import { ArticlesService } from '../shared/services/articles.service';
import { ImageComponent } from "../shared/components/image/image.component";

@Component({
  selector: 'app-articles',
  imports: [
    MainNavigationComponent,
    CountDownComponent,
    NewsLetterComponent,
    ImageComponent
],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  private articlesService = inject(ArticlesService)

  Articles: Article [] = []

  ngOnInit(): void {
    this.Articles = this.articlesService.Articles 
  }

  GoTo(article: Article){
    this.articlesService.goToArticle(article)
  }
}
