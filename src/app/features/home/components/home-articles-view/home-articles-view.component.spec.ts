import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArticlesViewComponent } from './home-articles-view.component';

describe('HomeArticlesViewComponent', () => {
  let component: HomeArticlesViewComponent;
  let fixture: ComponentFixture<HomeArticlesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeArticlesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeArticlesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
