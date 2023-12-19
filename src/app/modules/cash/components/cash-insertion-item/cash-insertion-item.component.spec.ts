import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IDenomination } from '../../models/cash.models';
import { CashInsertionItemComponent } from './cash-insertion-item.component';

describe('CashInsertionItemComponent', () => {
  let component: CashInsertionItemComponent;
  let fixture: ComponentFixture<CashInsertionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashInsertionItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashInsertionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind denomination input correctly', () => {
    const testDenomination: IDenomination = {
      denomination: 10,
      id: 1,
      quantity: 20,
    };
    component.denomination = testDenomination;
    expect(component.denomination).toEqual(testDenomination);
  });

  it('should emit onClick event with correct denomination on handleClick', () => {
    const testDenomination: IDenomination = {
      denomination: 5,
      id: 2,
      quantity: 10,
    };
    component.denomination = testDenomination;

    spyOn(component.onClick, 'emit');
    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalledWith(testDenomination);
  });
});
