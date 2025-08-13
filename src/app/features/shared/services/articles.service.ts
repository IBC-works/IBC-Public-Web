import { inject, Inject, Injectable } from '@angular/core';
import { Articles } from '../../../articles';
import { APP_GENERAL_IMAGE_CONFIGURATION } from '../config/app-image-configuration.config';
import { Article } from '../../../entities/Article.entity';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'any'
})
export class ArticlesService {
  private router = inject(Router)

  constructor(
    @Inject(APP_GENERAL_IMAGE_CONFIGURATION) private AppImages: {[key: string]: string}
  ) { }

  get Articles () {
    return Articles.map(article => {
      function rand (nums: number[]) {
        return Math.floor(Math.random() * nums.length)
      }

      return {
        ...article,
        image: this.AppImages['dummy_' + rand([0,1, 2])]
      }
    })
  }

  goToArticle(article: Article){
    sessionStorage.setItem("article", JSON.stringify(article))

    this.router.navigate(['article-view'])
  }
}
