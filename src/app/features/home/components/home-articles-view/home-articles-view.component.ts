import { AfterViewInit, Component, inject, Inject } from '@angular/core';
import { SwiperComponent } from "../../../shared/components/swiper/swiper.component";
import { SwiperOptions } from 'swiper/types';
import { CommonModule } from '@angular/common';
import { ImageComponent } from "../../../shared/components/image/image.component";
import { APP_GENERAL_IMAGE_CONFIGURATION } from '../../../shared/config/app-image-configuration.config';
import { IconComponent } from "../../../shared/components/icon/icon.component";
import { TextShortnerPipe } from '../../../shared/pipes/text-shortner.pipe';
import { AppService } from '../../../../services/app.service';
import { Article } from '../../../../entities/Article.entity';
import { ArticlesService } from '../../../shared/services/articles.service';
import { JQuerySlickOptions } from 'ngx-slick-options';
import { NGXCarouselComponent } from "../../../shared/components/ngx-carousel/ngx-carousel.component";

@Component({
  selector: 'app-home-articles-view',
  imports: [
    CommonModule,
    SwiperComponent,
    ImageComponent,
    IconComponent,
    TextShortnerPipe,
    NGXCarouselComponent
],
  template: `
    @if(IsDesktop) {
      <app-swiper [options]="SwiperCarouselOptions">
        @for (item of Articles; track $index) {
          <ng-template #slideTempRef>
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
    }@else {
      <app-ngx-carousel [options]="NgxSlickCarouselOptions">
        @for (item of Articles; track $index) {
          <ng-template #ngxSlideItem>
            <section #ngxSlideInst>
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
      </app-ngx-carousel>
    }
  `,
  styleUrl: './home-articles-view.component.scss'
})
export class HomeArticlesViewComponent implements AfterViewInit {
  private appService = inject(AppService)

  private articlesService = inject(ArticlesService)

  Articles: Article[] = []

  SwiperCarouselOptions: SwiperOptions = {
    spaceBetween: 20,
    slidesPerView: 1.25
  }

  NgxSlickCarouselOptions: JQuerySlickOptions = {
    autoplay: true,
    autoplaySpeed: 5000
  }

  get IsDesktop () {
    return this.appService.isDesktopView
  }

  constructor (
    @Inject(APP_GENERAL_IMAGE_CONFIGURATION) public AppImages: {[key: string]: string}
  ){
    this.Articles = this.articlesService.Articles
  }

  ngAfterViewInit(): void {

  }

  GoToArtile(article: Article) {
    this.articlesService.goToArticle(article)
  }
}
