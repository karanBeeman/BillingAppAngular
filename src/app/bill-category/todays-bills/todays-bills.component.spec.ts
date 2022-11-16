import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysBillsComponent } from './todays-bills.component';

describe('TodaysBillsComponent', () => {
  let component: TodaysBillsComponent;
  let fixture: ComponentFixture<TodaysBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysBillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
