import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, inject, Input, NO_ERRORS_SCHEMA, OnDestroy, QueryList, Renderer2, TemplateRef, viewChild, ViewChild, viewChildren, ViewChildren, ViewContainerRef } from '@angular/core';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { Subscription } from 'rxjs';
import { JQuerySlickOptions } from 'ngx-slick-options';
import { observeResize } from '../../../../functions/observe-resize.func';
import { setSizeToMatch } from '../../../../functions/set-size-to-match.func';
import CarouselSlideFeature from '../../interfaces/carousel-slide-feature.inter';

@Component({
  selector: 'app-ngx-carousel',
  imports: [
    CommonModule,
    SlickCarouselModule
  ],
  template: `

    <ngx-slick-carousel #carousel>

      @for (item of ngxSlideItems; track $index) {
        <ng-container>

          <ngx-slide #ngxSlideContainer>

            <ng-container #ngxSlideViewContainerRef></ng-container>

          </ngx-slide>

        </ng-container>
      }

    </ngx-slick-carousel>
  `,
  styleUrl: './ngx-carousel.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class NGXCarouselComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  @Input()
  options?: JQuerySlickOptions

  @ViewChild('carousel')
  ngx_carousel!: SlickCarouselComponent

  @ViewChild('carousel', {read: ElementRef})
  private ngx_carousel_DOM!: ElementRef<HTMLElement>

  @ViewChildren('ngxSlideViewContainerRef', {read: ViewContainerRef})
  private ngxSlideViewContainerRefs!: QueryList<ViewContainerRef>

  @ViewChildren('ngxSlideContainer', {read: ElementRef})
  private ngxSlideContainerRefs!: QueryList<ElementRef<HTMLElement>>

  @ContentChildren('ngxSlideItem')
  ngxSlideItems!: QueryList<TemplateRef<any>>

  @ContentChildren('ngxSlideInst')
  private ngxSlideInstances!: QueryList<CarouselSlideFeature | ElementRef>

  private componentElement: HTMLElement = inject(ElementRef).nativeElement

  private SlidesWithItemFeature = new Map<number, CarouselSlideFeature & {_hostNode?: HTMLElement}>()

  private afterChangeSubs?: Subscription

  private render = inject(Renderer2)

  ngAfterViewInit(): void {
    
    for (let i = 0; i < this.ngxSlideViewContainerRefs.length; i++) {
      const viewRef = this.ngxSlideViewContainerRefs.get(i),

      templateRef = this.ngxSlideItems.get(i)

      if(!viewRef) throw Error("Failed to find view reference of " + i)
      
      if(!templateRef) throw Error("Failed to find template reference of " + i)
      
      const view = viewRef.createEmbeddedView(templateRef)

      this.SlidesWithItemFeature.set(i, {_hostNode: view.rootNodes[0]})
    }

    this.handleCarouselSize()
  
    this.ngxSlideContainerRefs.forEach(container => this.handleSlideContainers(container.nativeElement))
    
    //@ts-ignore
    this.afterChangeSubs = this.ngx_carousel.afterChange
    .subscribe(event => this.handleSlideChange(event.currentSlide))

    //@ts-ignore
    if(this.options) this.ngx_carousel.config = this.options
    
    this.ngx_carousel.initSlick()
  }

  ngAfterContentInit(): void {
      setTimeout(() => {
        for (let j = 0; j < this.ngxSlideInstances.length; j++) {
          const instance = this.ngxSlideInstances.get(j);
    
          if((instance as ElementRef).nativeElement) continue
  
          let storedNode = this.SlidesWithItemFeature.get(j)
  
          if(!storedNode) throw Error("SlideItem cannot be less than or more than Slideinstance")
  
          const {_hostNode} = storedNode;
  
          storedNode = (instance as CarouselSlideFeature)
  
          storedNode._hostNode = _hostNode
  
          this.SlidesWithItemFeature.delete(j)
  
          this.SlidesWithItemFeature.set(j, storedNode)
        }
  
        this.handleSlideChange(this.options?.initialSlide ?? 0)
      }, 100);
  }

  private handleCarouselSize(){
    setSizeToMatch(this.componentElement, this.ngx_carousel_DOM.nativeElement)

    observeResize(this.componentElement, () => setSizeToMatch(this.componentElement, this.ngx_carousel_DOM.nativeElement))
  }

  private handleSlideContainers(dom: HTMLElement){
    setSizeToMatch(this.ngx_carousel_DOM.nativeElement, dom, {ignoreWidth: true})
    
    this.render.setStyle(dom.firstChild, "flex", "1")

    observeResize(this.ngx_carousel_DOM.nativeElement, () => setSizeToMatch(this.ngx_carousel_DOM.nativeElement, dom))
  }

  private handleSlideChange(currentIndex: number){
    this.SlidesWithItemFeature.forEach((value, key) => {
      if(key == currentIndex){
        value.isVisible = true

        this.hideOrShowContainer(key, "show")

        if(value.onVisible) value.onVisible()
      }else{
        value.isVisible = false

        this.hideOrShowContainer(key, "hide")

        if(value.onNotVisible) value.onNotVisible()
      }
    })
  }

  private hideOrShowContainer(index: number, action: "show" | "hide"){
    const container = this.ngxSlideContainerRefs.get(index)

    if(!container) throw Error("could not find container of " + index)

    const {nativeElement} = container
    
    
    this.render.setStyle(nativeElement, "visibility", action == 'hide' ? "hidden" : "visible")
  }

  ngOnDestroy(): void {
    this.afterChangeSubs?.unsubscribe() 
  }
}
