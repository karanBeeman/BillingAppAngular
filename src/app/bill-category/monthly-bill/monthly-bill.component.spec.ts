import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBillComponent } from './monthly-bill.component';

describe('MonthlyBillComponent', () => {
  let component: MonthlyBillComponent;
  let fixture: ComponentFixture<MonthlyBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
