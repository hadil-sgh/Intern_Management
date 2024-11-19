import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitcreditComponent } from './submitcredit.component';

describe('SubmitcreditComponent', () => {
  let component: SubmitcreditComponent;
  let fixture: ComponentFixture<SubmitcreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitcreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitcreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
