import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancedispalayComponent } from './performancedispalay.component';

describe('PerformancedispalayComponent', () => {
  let component: PerformancedispalayComponent;
  let fixture: ComponentFixture<PerformancedispalayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformancedispalayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformancedispalayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
