import { Component, ContentChild, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [],
  template: `
    <div>
      
      <loadTemplate>
        <ng-tempalte></ng-tempalte>
      </loadTemplate>

      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './loader.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoaderComponent {
  @ContentChild('loadTarget', {read: ElementRef})
  loadTarget?: ElementRef

  @Input()
  LoadObvs?: Observable<any>


}
