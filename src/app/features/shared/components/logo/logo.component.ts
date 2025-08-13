import { Component, Inject, OnInit } from '@angular/core';
import { APP_GENERAL_IMAGE_CONFIGURATION } from '../../config/app-image-configuration.config';
import { ImageComponent } from "../image/image.component";

@Component({
  selector: 'app-logo',
  imports: [ImageComponent],
  template: `
    <app-image [src]="LogoPath"></app-image>
  `,
  styleUrl: './logo.component.scss'
})
export class LogoComponent implements OnInit {
  LogoPath = ""

  constructor (
    @Inject(APP_GENERAL_IMAGE_CONFIGURATION) private ImagePaths: {[key: string]: string}
  ){}

  ngOnInit(): void {
    this.LogoPath = this.ImagePaths['black_logo']
  }
}
