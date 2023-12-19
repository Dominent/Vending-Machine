import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MockDeclaration, MockPipe } from 'ng-mocks';
import { of } from 'rxjs';
import { ProductStoreFacadeService } from '../product/store/product-store-facade.service';
import { RoundPipe } from '../shared/pipes/round.pipe';
import { CashComponent } from './cash.component';
import { CashChangeReturnComponent } from './components/cash-change-return/cash-change-return.component';
import { CashInsertionComponent } from './components/cash-insertion/cash-insertion.component';
import { CashStoreFacadeService } from './store/cash-store-facade.service';

describe('CashComponent', () => {
  let component: CashComponent;
  let fixture: ComponentFixture<CashComponent>;
  let cashStoreFacadeServiceSpy: jasmine.SpyObj<CashStoreFacadeService>;
  let productStoreFacadeServiceSpy: jasmine.SpyObj<ProductStoreFacadeService>;

  beforeEach(async () => {
    cashStoreFacadeServiceSpy = jasmine.createSpyObj('CashStoreFacadeService', [
      'actions',
      'state',
    ]);
    productStoreFacadeServiceSpy = jasmine.createSpyObj(
      'ProductStoreFacadeService',
      ['actions', 'state']
    );

    cashStoreFacadeServiceSpy.actions.fetchDenominations = jasmine.createSpy();
    cashStoreFacadeServiceSpy.actions.insertDenomination = jasmine.createSpy();
    cashStoreFacadeServiceSpy.actions.resetDenomination = jasmine.createSpy();
    cashStoreFacadeServiceSpy.state.denominations$ = of([]);
    cashStoreFacadeServiceSpy.state.totalInsertedCash$ = of(100);

    productStoreFacadeServiceSpy.actions.fetchProduct = jasmine.createSpy();
    productStoreFacadeServiceSpy.actions.addProduct = jasmine.createSpy();
    productStoreFacadeServiceSpy.actions.buySelectedProducts =
      jasmine.createSpy();
    productStoreFacadeServiceSpy.actions.resetSelectedProducts =
      jasmine.createSpy();
    productStoreFacadeServiceSpy.state.products$ = of([]);
    productStoreFacadeServiceSpy.state.selected$ = of([]);
    productStoreFacadeServiceSpy.state.totalCash$ = of(50);

    await TestBed.configureTestingModule({
      declarations: [
        CashComponent,
        MockDeclaration(CashInsertionComponent),
        MockDeclaration(CashChangeReturnComponent),
        MockPipe(RoundPipe),
      ],
      providers: [
        {
          provide: CashStoreFacadeService,
          useValue: cashStoreFacadeServiceSpy,
        },
        {
          provide: ProductStoreFacadeService,
          useValue: productStoreFacadeServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CashComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch denominations on init', () => {
    expect(
      cashStoreFacadeServiceSpy.actions.fetchDenominations
    ).toHaveBeenCalled();
  });

  it('should calculate change correctly', () => {
    component.change$.subscribe((change) => {
      expect(change).toBe(50); // 100 - 50
    });
  });

  it('should call simulateChangeReturn on handleBuy', fakeAsync(() => {
    const cashChangeReturnComponentSpy = jasmine.createSpyObj(
      'CashChangeReturnComponent',
      ['simulateChangeReturn']
    );
    component.cashChangeReturnComponent = cashChangeReturnComponentSpy;

    component.handleBuy(50, 100, []);
    expect(
      cashChangeReturnComponentSpy.simulateChangeReturn
    ).toHaveBeenCalledWith(10);

    tick(5000); // Advance the timer
    expect(
      cashStoreFacadeServiceSpy.actions.resetDenomination
    ).toHaveBeenCalled();
    expect(
      productStoreFacadeServiceSpy.actions.resetSelectedProducts
    ).toHaveBeenCalled();
  }));

  it('should reset denominations and products on handleClear', () => {
    component.handleClear();
    expect(
      cashStoreFacadeServiceSpy.actions.resetDenomination
    ).toHaveBeenCalled();
    expect(
      productStoreFacadeServiceSpy.actions.resetSelectedProducts
    ).toHaveBeenCalled();
  });
});
