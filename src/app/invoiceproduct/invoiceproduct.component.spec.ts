import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceproductComponent } from './invoiceproduct.component';

describe('InvoiceproductComponent', () => {
  let component: InvoiceproductComponent;
  let fixture: ComponentFixture<InvoiceproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
