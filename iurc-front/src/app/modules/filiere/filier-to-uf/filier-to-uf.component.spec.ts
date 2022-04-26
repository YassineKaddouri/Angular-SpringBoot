import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilierToUfComponent } from './filier-to-uf.component';

describe('FilierToUfComponent', () => {
  let component: FilierToUfComponent;
  let fixture: ComponentFixture<FilierToUfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilierToUfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilierToUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
