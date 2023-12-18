/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashChangeReturnComponent } from './cash-change-return.component';

describe('CashChangeReturnComponent', () => {
  let component: CashChangeReturnComponent;
  let fixture: ComponentFixture<CashChangeReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CashChangeReturnComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashChangeReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
