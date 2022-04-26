import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleToUserComponent } from './role-to-user.component';

describe('RoleToUserComponent', () => {
  let component: RoleToUserComponent;
  let fixture: ComponentFixture<RoleToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleToUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
