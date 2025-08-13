import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, ElementRef, EmbeddedViewRef, inject, Input, NO_ERRORS_SCHEMA, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions, PaginationOptions } from 'swiper/types';
import { observeResize } from '../../../../functions/observe-resize.func';
import { setSizeToMatch } from '../../../../functions/set-size-to-match.func';
import SwiperCore from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


// ✅ Enable autoplay
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [
    CommonModule,
  ] ,
  template: `
    @if(pagination){
      <swiper-container #swiper [pagination]="pagination">
        @for (item of slideChildrenTemplateRefs; track $index) {
          <ng-container>
            <swiper-slide [ngStyle]="{height: '85%'}">
              <ng-container #viewContainer></ng-container>
            </swiper-slide>
          </ng-container>
        }      
    </swiper-container>
    }@else {
      <swiper-container #swiper>
        @for (item of slideChildrenTemplateRefs; track $index) {
          <ng-container>
            <swiper-slide>
              <ng-container #viewContainer></ng-container>
            </swiper-slide>
          </ng-container>
        }      
    </swiper-container>
    }
  `,
  styleUrls: ['./swiper.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SwiperComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input()
  options?: SwiperOptions

  @Input()
  pagination?: PaginationOptions

  @ViewChild('swiper')
  private swiperComponent?: ElementRef<SwiperContainer>

  @ViewChildren("viewContainer", {read: ViewContainerRef})
  private viewContainerRefs!: QueryList<ViewContainerRef>

  @ContentChildren('slideTempRef', {descendants: true})
  slideChildrenTemplateRefs!: QueryList<TemplateRef<any>>

  private componentElement: HTMLElement = inject(ElementRef).nativeElement

  private render = inject(Renderer2)

  private initSubj = new Subject<void>()

  private initSubs?: Subscription

  initializeed = false

  swiper?: Swiper

  ngOnInit(): void {
    this.initSubs = this.initSubj.subscribe(() => {
      this.updateSwiper()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initSubj.next()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if(!this.swiperComponent) return

      this.swiper = this.swiperComponent.nativeElement.swiper
  
      this.handleCarouselSize(this.swiperComponent.nativeElement)

      // style or prcess slide elments DOM
      for (let i = 0; i < this.viewContainerRefs.length; i++) {
        const viewRef = this.viewContainerRefs.get(i),
        
        templateRef = this.slideChildrenTemplateRefs.get(i)
  
        if(!templateRef || !viewRef) throw Error('a refernce is missing')
        
        const view: EmbeddedViewRef<any> = viewRef.createEmbeddedView(templateRef),
  
        hostView = view.rootNodes[0]
  
        this.render.setStyle(hostView, "height", " 100%")
      }

      this.initializeed = true

      this.initSubj.next()
    }, 100);
  }

  private updateSwiper(){
    if(this.initializeed && this.swiper && this.options){

      Object.assign(this.swiper.params, this.options)

      console.log(this.options)

      this.swiper.update()
    }
  }

  private handleCarouselSize (carouelDom: HTMLElement) {
    setSizeToMatch(this.componentElement, carouelDom)
    
    observeResize(this.componentElement, () => setSizeToMatch(this.componentElement, carouelDom))
  }

  ngOnDestroy(): void {  
    this.initSubs?.unsubscribe()
  }
}