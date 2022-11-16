import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingbillsComponent } from './pendingbills.component';

describe('PendingbillsComponent', () => {
  let component: PendingbillsComponent;
  let fixture: ComponentFixture<PendingbillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingbillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingbillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
