import { Component, inject, Inject } from '@angular/core';
import { SwiperComponent } from "../../../shared/components/swiper/swiper.component";
import { Articles } from '../../../../articles';
import { SwiperOptions } from 'swiper/types';
import { CommonModule } from '@angular/common';
import { ImageComponent } from "../../../shared/components/image/image.component";
import { APP_GENERAL_IMAGE_CONFIGURATION } from '../../../shared/config/app-image-configuration.config';
import { IconComponent } from "../../../shared/components/icon/icon.component";
import { TextShortnerPipe } from '../../../shared/pipes/text-shortner.pipe';
import { AppService } from '../../../../services/app.service';
import { Article } from '../../../../entities/Article.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-articles-view',
  imports: [
    CommonModule,
    SwiperComponent,
    ImageComponent,
    IconComponent,
    TextShortnerPipe
],
  template: `
    <app-swiper #mm [options]="CarouselOptions">

      @for (item of Articles; track $index) {
        <ng-template #slideTempRef >
          <section>
            <div class="floor">
                <app-image [src]="item.image"></app-image>
            </div>

            <div class="article-panel">
              <div class="article-body" (click)="GoToArtile(item)">
                <div class="label">ARTICLE</div>
                
                <h4>{{item.title}}</h4>

                <p>{{item.body | textShortner : 100}}</p>
              </div>  

              <button (click)="GoToArtile(item)">
                <app-icon name="arrow-right"></app-icon>
              </button>
            </div>
          </section>
        </ng-template>
      }

    </app-swiper>
  `,
  styleUrl: './home-articles-view.component.scss'
})
export class HomeArticlesViewComponent {
  private appService = inject(AppService)

  private router = inject(Router)

  Articles: Article[] = []

  CarouselOptions!: SwiperOptions

  constructor (
    @Inject(APP_GENERAL_IMAGE_CONFIGURATION) public AppImages: {[key: string]: string}
  ){
    if(this.appService.isDesktopView) {
      this.CarouselOptions = {
        spaceBetween: 20,
        slidesPerView: 1.25
      }
    }else {
      this.CarouselOptions = {
        spaceBetween: 20,
        slidesPerView: 1
      }
    }

    this.Articles = Articles.map(article => {
      function rand (nums: number[]) {
        return Math.floor(Math.random() * nums.length)
      }

      return {
        ...article,
        image: this.AppImages['dummy_' + rand([0,1, 2])]
      }
    })
  }

  GoToArtile(article: Article) {
    sessionStorage.setItem("article", JSON.stringify(article))

    this.router.navigate(['article'])
  }
}
