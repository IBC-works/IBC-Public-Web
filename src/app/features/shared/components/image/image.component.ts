import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  imports: [NgStyle],
  template: `
    <img [src]="src" [ngStyle]="{objectFit: fit}" alt="">
  `,
  styles: [`
    :host {
      display: flex;
      overflow: hidden;

      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  `]
})
export class ImageComponent {
  @Input()
  src?: string

  @Input()
  fit?: 'contain' | 'cover' | 'fit'
}
