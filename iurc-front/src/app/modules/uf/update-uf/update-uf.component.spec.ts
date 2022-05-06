import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUfComponent } from './update-uf.component';

describe('UpdateUfComponent', () => {
  let component: UpdateUfComponent;
  let fixture: ComponentFixture<UpdateUfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
