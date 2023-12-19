import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IDenomination } from '../models/cash.models';
import { CashStoreFacadeService } from './cash-store-facade.service';
import * as fromActions from './cash.actions';
import * as fromSelectors from './cash.selectors';

describe('CashStoreFacadeService', () => {
  let service: CashStoreFacadeService;
  let store: MockStore;

  const initialState = {
    cash: {
      denominations: [],
      insertedDenominations: [],
      totalInsertedCash: 0,
      error: null,
      loading: false,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})], // You can configure the store module here
      providers: [CashStoreFacadeService, provideMockStore({ initialState })],
    });

    service = TestBed.inject(CashStoreFacadeService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch fetchDenominationsRequest action', () => {
    spyOn(store, 'dispatch');
    service.actions.fetchDenominations();
    expect(store.dispatch).toHaveBeenCalledWith(
      fromActions.fetchDenominationsRequest()
    );
  });

  it('should dispatch insertDenomination action with correct payload', () => {
    spyOn(store, 'dispatch');
    const denomination: IDenomination = {
      id: 1,
      denomination: 10,
      quantity: 5,
    };
    service.actions.insertDenomination(denomination);
    expect(store.dispatch).toHaveBeenCalledWith(
      fromActions.insertDenomination({ payload: { denomination } })
    );
  });

  it('should dispatch resetInsertedDenominations action', () => {
    spyOn(store, 'dispatch');
    service.actions.resetDenomination();
    expect(store.dispatch).toHaveBeenCalledWith(
      fromActions.resetInsertedDenominations()
    );
  });

  it('should select denominations from the store', () => {
    const denominations: IDenomination[] = [
      { id: 1, denomination: 10, quantity: 5 },
    ];
    store.overrideSelector(fromSelectors.selectDenominations, denominations);
    service.state.denominations$.subscribe((selectedDenominations) => {
      expect(selectedDenominations).toEqual(denominations);
    });
  });

  it('should select insertedDenominations from the store', () => {
    const insertedDenominations: IDenomination[] = [
      { id: 2, denomination: 20, quantity: 3 },
    ];
    store.overrideSelector(
      fromSelectors.selectInsertedDenominations,
      insertedDenominations
    );
    service.state.insertedDenominations$.subscribe(
      (selectedInsertedDenominations) => {
        expect(selectedInsertedDenominations).toEqual(insertedDenominations);
      }
    );
  });

  it('should select totalInsertedCash from the store', () => {
    const totalInsertedCash = 100;
    store.overrideSelector(
      fromSelectors.selectTotalInsertedCash,
      totalInsertedCash
    );
    service.state.totalInsertedCash$.subscribe((selectedTotalInsertedCash) => {
      expect(selectedTotalInsertedCash).toEqual(totalInsertedCash);
    });
  });
});
