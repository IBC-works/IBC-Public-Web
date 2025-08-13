import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AriticleViewComponent } from './features/ariticle-view/ariticle-view.component';
import { ArticlesComponent } from './features/articles/articles.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'articles',
        component: ArticlesComponent
    },
    {
        path: 'article-view',
        component: AriticleViewComponent
    }
];
