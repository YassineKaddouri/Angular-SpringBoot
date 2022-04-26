import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereToSiteComponent } from './filiere-to-site.component';

describe('FiliereToSiteComponent', () => {
  let component: FiliereToSiteComponent;
  let fixture: ComponentFixture<FiliereToSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiliereToSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliereToSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
