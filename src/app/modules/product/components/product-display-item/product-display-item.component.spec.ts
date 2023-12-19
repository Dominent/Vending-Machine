import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IProduct } from '../../models/product.models';
import { ProductDisplayItemComponent } from './product-display-item.component';

describe('ProductDisplayItemComponent', () => {
  let component: ProductDisplayItemComponent;
  let fixture: ComponentFixture<ProductDisplayItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDisplayItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind product input correctly', () => {
    const testProduct: IProduct = {
      id: 1,
      name: 'Product 1',
      price: 100,
      quantity: 10,
      imageName: 'image1.jpg',
    };
    component.product = testProduct;
    expect(component.product).toEqual(testProduct);
  });

  it('should emit onClick event with product on handleClick', () => {
    const testProduct: IProduct = {
      id: 2,
      name: 'Product 2',
      price: 200,
      quantity: 5,
      imageName: 'image2.jpg',
    };
    component.product = testProduct;

    spyOn(component.onClick, 'emit');
    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalledWith(testProduct);
  });
});
