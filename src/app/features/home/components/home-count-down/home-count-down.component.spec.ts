import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCountDownComponent } from './home-count-down.component';

describe('HomeCountDownComponent', () => {
  let component: HomeCountDownComponent;
  let fixture: ComponentFixture<HomeCountDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCountDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCountDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
