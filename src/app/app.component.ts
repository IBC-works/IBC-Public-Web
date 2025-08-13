import { Component, DoCheck, ElementRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AllChildElementFlexer } from './functions/all-child-element-flexer.func';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements DoCheck {
  private componentElement = inject(ElementRef).nativeElement

  ngDoCheck(): void {
    AllChildElementFlexer(this.componentElement, ['router-outlet'])
  }
}