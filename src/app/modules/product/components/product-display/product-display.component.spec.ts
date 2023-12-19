import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IProduct } from '../../models/product.models';
import { ProductStoreFacadeService } from '../../store/product-store-facade.service';
import { ProductDisplayComponent } from './product-display.component';

describe('ProductDisplayComponent', () => {
  let component: ProductDisplayComponent;
  let fixture: ComponentFixture<ProductDisplayComponent>;
  let productStoreFacadeServiceSpy: jasmine.SpyObj<ProductStoreFacadeService>;

  beforeEach(async () => {
    productStoreFacadeServiceSpy = jasmine.createSpyObj(
      'ProductStoreFacadeService',
      ['actions', 'state']
    );

    await TestBed.configureTestingModule({
      declarations: [ProductDisplayComponent],
      providers: [
        {
          provide: ProductStoreFacadeService,
          useValue: productStoreFacadeServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDisplayComponent);
    component = fixture.componentInstance;

    productStoreFacadeServiceSpy.actions.fetchProduct = jasmine.createSpy();
    productStoreFacadeServiceSpy.actions.addProduct = jasmine.createSpy();
    productStoreFacadeServiceSpy.actions.resetSelectedProducts =
      jasmine.createSpy();
    productStoreFacadeServiceSpy.state.products$ = of([]);
    productStoreFacadeServiceSpy.state.selected$ = of([]);
    productStoreFacadeServiceSpy.state.totalCash$ = of(0);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind products input correctly', () => {
    const testProducts: IProduct[] = [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 10,
        imageName: 'image1.jpg',
      },
    ];
    component.products = testProducts;
    expect(component.products).toEqual(testProducts);
  });

  it('should call addProduct on handleProductClick', () => {
    const testProduct: IProduct = {
      id: 2,
      name: 'Product 2',
      price: 200,
      quantity: 5,
      imageName: 'image2.jpg',
    };
    component.handleProductClick(testProduct);
    expect(
      productStoreFacadeServiceSpy.actions.addProduct
    ).toHaveBeenCalledWith(testProduct);
  });
});
