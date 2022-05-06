import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfCalendarComponent } from './uf-calendar.component';

describe('UfCalendarComponent', () => {
  let component: UfCalendarComponent;
  let fixture: ComponentFixture<UfCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UfCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UfCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
