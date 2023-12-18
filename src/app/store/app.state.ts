import { ICashState } from '../modules/cash/store/cash.state';
import { IProductState } from '../modules/product/store/product.state';

export interface IAppState {
  product: IProductState;
  cash: ICashState;
}
