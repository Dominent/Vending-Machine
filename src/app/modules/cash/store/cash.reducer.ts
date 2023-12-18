import { createReducer, on } from '@ngrx/store';
import * as fromActions from './cash.actions';
import { cashInitialState } from './cash.state';

export const cashReducer = createReducer(
  cashInitialState,
  on(fromActions.fetchDenominationsRequest, (state) => {
    return {
      ...state,
      error: {
        ...state.error,
        fetchDenominations: null,
      },
      loading: {
        ...state.loading,
        fetchDenominations: true,
      },
    };
  }),
  on(
    fromActions.fetchDenominationsSuccess,
    (state, { payload: { denominations } }) => {
      return {
        ...state,
        denominations,
        error: {
          ...state.error,
          fetchDenominations: null,
        },
        loading: {
          ...state.loading,
          fetchDenominations: false,
        },
      };
    }
  ),
  on(fromActions.fetchDenominationsFailure, (state, { payload: { error } }) => {
    return {
      ...state,
      error: {
        ...state.error,
        fetchDenominations: error,
      },
      loading: {
        ...state.loading,
        fetchDenominations: false,
      },
    };
  }),
  on(fromActions.insertDenomination, (state, { payload: { denomination } }) => {
    return {
      ...state,
      insertedDenominations: [...state.insertedDenominations, denomination],
    };
  }),
  on(fromActions.resetInsertedDenominations, (state) => {
    return {
      ...state,
      insertedDenominations: [],
    };
  })
);
