import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IDenomination } from '../../models/cash.models';
import { CashStoreFacadeService } from '../../store/cash-store-facade.service';
import { CashInsertionComponent } from './cash-insertion.component';

describe('CashInsertionComponent', () => {
  let component: CashInsertionComponent;
  let fixture: ComponentFixture<CashInsertionComponent>;
  let cashStoreFacadeService: jasmine.SpyObj<CashStoreFacadeService>;

  beforeEach(async () => {
    cashStoreFacadeService = jasmine.createSpyObj('CashStoreFacadeService', [
      'actions',
      'state',
    ]);

    cashStoreFacadeService.actions.fetchDenominations = jasmine.createSpy();
    cashStoreFacadeService.actions.insertDenomination = jasmine.createSpy();
    cashStoreFacadeService.actions.resetDenomination = jasmine.createSpy();
    cashStoreFacadeService.state.denominations$ = of([]);
    cashStoreFacadeService.state.totalInsertedCash$ = of();

    await TestBed.configureTestingModule({
      declarations: [CashInsertionComponent],
      providers: [
        {
          provide: CashStoreFacadeService,
          useValue: cashStoreFacadeService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CashInsertionComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind denominations input correctly', () => {
    const denominations: IDenomination[] = [
      { denomination: 10, id: 1, quantity: 20 },
    ];
    component.denominations = denominations;
    expect(component.denominations).toEqual(denominations);
  });

  describe('handleDenominationClick', () => {
    it('should call insertDenomination on CashStoreFacadeService', () => {
      const denomination: IDenomination = {
        denomination: 5,
        id: 2,
        quantity: 10,
      };
      component.handleDenominationClick(denomination);

      expect(
        cashStoreFacadeService.actions.insertDenomination
      ).toHaveBeenCalledWith(denomination);
    });
  });
});
