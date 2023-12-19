import * as fromSelectors from './cash.selectors';
import { ICashState } from './cash.state';

describe('Cash Selectors', () => {
  describe('selectDenominations Selector', () => {
    it('should select the denominations', () => {
      const initialState: ICashState = {
        denominations: [{ id: 1, denomination: 100, quantity: 5 }],
        insertedDenominations: [],
        error: { fetchDenominations: null },
        loading: { fetchDenominations: false },
      };

      const result = fromSelectors.selectDenominations.projector(initialState);
      expect(result).toEqual([{ id: 1, denomination: 100, quantity: 5 }]);
    });
  });

  describe('selectInsertedDenominations Selector', () => {
    it('should select the inserted denominations', () => {
      const initialState: ICashState = {
        denominations: [],
        insertedDenominations: [{ id: 2, denomination: 50, quantity: 10 }],
        error: { fetchDenominations: null },
        loading: { fetchDenominations: false },
      };

      const result =
        fromSelectors.selectInsertedDenominations.projector(initialState);
      expect(result).toEqual([{ id: 2, denomination: 50, quantity: 10 }]);
    });
  });

  describe('selectTotalInsertedCash Selector', () => {
    it('should calculate the total inserted cash', () => {
      const initialState: ICashState = {
        denominations: [],
        insertedDenominations: [
          { id: 2, denomination: 50, quantity: 1 },
          { id: 3, denomination: 20, quantity: 2 },
        ],
        error: { fetchDenominations: null },
        loading: { fetchDenominations: false },
      };

      const result =
        fromSelectors.selectTotalInsertedCash.projector(initialState);
      expect(result).toEqual(70);
    });
  });
});
