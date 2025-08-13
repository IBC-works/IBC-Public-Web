import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AriticleViewComponent } from './ariticle-view.component';

describe('AriticleViewComponent', () => {
  let component: AriticleViewComponent;
  let fixture: ComponentFixture<AriticleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AriticleViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AriticleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
