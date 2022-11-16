import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittodaybillsComponent } from './edittodaybills.component';

describe('EdittodaybillsComponent', () => {
  let component: EdittodaybillsComponent;
  let fixture: ComponentFixture<EdittodaybillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittodaybillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittodaybillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
