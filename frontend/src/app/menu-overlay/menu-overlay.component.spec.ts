import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOverlayComponent } from './menu-overlay.component';

describe('MenuOverlayComponent', () => {
  let component: MenuOverlayComponent;
  let fixture: ComponentFixture<MenuOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
