import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIndialogComponent } from './check-indialog.component';

describe('CheckIndialogComponent', () => {
  let component: CheckIndialogComponent;
  let fixture: ComponentFixture<CheckIndialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckIndialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckIndialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
