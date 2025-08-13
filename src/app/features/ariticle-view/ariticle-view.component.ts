import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MainNavigationComponent } from "../shared/components/main-navigation/main-navigation.component";
import { Article } from '../../entities/Article.entity';
import { Router } from '@angular/router';
import { ImageComponent } from "../shared/components/image/image.component";

@Component({
  selector: 'app-ariticle-view',
  imports: [
    MainNavigationComponent,
    ImageComponent
],
  templateUrl: './ariticle-view.component.html',
  styleUrl: './ariticle-view.component.scss'
})
export class AriticleViewComponent implements AfterViewInit {
  private router = inject(Router)

  Article!: Article

  constructor () {
    this.Article = JSON.parse(sessionStorage.getItem('article') ?? 'undefined')
  }

  ngAfterViewInit(): void {
    if(!this.Article) this.router.navigate([])
  }
}