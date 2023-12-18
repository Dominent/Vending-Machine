import { HttpErrorResponse } from '@angular/common/http';
import { IDenomination } from '../models/cash.models';

export const cashStateFeatureKey = 'cash';

export interface ICashState {
  denominations: IDenomination[];
  insertedDenominations: IDenomination[];
  error: {
    fetchDenominations: HttpErrorResponse | null;
  };
  loading: {
    fetchDenominations: boolean;
  };
}

export const cashInitialState: ICashState = {
  denominations: [],
  insertedDenominations: [],
  error: {
    fetchDenominations: null,
  },
  loading: {
    fetchDenominations: false,
  },
};
