import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksdispalyComponent } from './tasksdispaly.component';

describe('TasksdispalyComponent', () => {
  let component: TasksdispalyComponent;
  let fixture: ComponentFixture<TasksdispalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksdispalyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksdispalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
