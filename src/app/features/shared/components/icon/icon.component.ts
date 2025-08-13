import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [NgIf],
  template: `
    
  <i *ngIf="Flash">
    <i [class]="IconClass" ></i>
  </i>
  `,
  styleUrl: './icon.component.scss'
})
export class IconComponent implements OnChanges {
  @Input('name')
  iconName?: string

  @Input("type")
  iconType?: string
  
  private chr = inject(ChangeDetectorRef)

  get IconClass () {
    return `fa-${this.iconName} fa-${this.iconType ?? "solid"}`
  }

  Flash = true

  ngOnChanges(changes: SimpleChanges): void {
    this.Flash = false

    setTimeout(() => {
      this.Flash = true

      this.chr.detectChanges()
    });
  }
}
