import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AriticleViewComponent } from './features/ariticle-view/ariticle-view.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'article',
        component: AriticleViewComponent
    }
];
