import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportdialogComponent } from './reportdialog.component';

describe('ReportdialogComponent', () => {
  let component: ReportdialogComponent;
  let fixture: ComponentFixture<ReportdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
