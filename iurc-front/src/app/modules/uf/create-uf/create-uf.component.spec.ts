import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUfComponent } from './create-uf.component';

describe('CreateUfComponent', () => {
  let component: CreateUfComponent;
  let fixture: ComponentFixture<CreateUfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
