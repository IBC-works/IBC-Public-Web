import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NGXCarouselComponent } from './ngx-carousel.component';

describe('NGXCarouselComponent', () => {
  let component: NGXCarouselComponent;
  let fixture: ComponentFixture<NGXCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NGXCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NGXCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
