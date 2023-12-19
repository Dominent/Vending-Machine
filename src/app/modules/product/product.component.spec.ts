import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockDeclaration } from 'ng-mocks';
import { of } from 'rxjs';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { ProductComponent } from './product.component';
import { ProductStoreFacadeService } from './store/product-store-facade.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productStoreFacadeServiceSpy: jasmine.SpyObj<ProductStoreFacadeService>;

  beforeEach(async () => {
    productStoreFacadeServiceSpy = {
      actions: {
        fetchProduct: jasmine.createSpy('fetchProduct'),
        addProduct: jasmine.createSpy('addProduct'),
        resetSelectedProducts: jasmine.createSpy('resetSelectedProducts'),
      },
      state: {
        products$: of([
          {
            id: 1,
            name: 'Product 1',
            price: 100,
            quantity: 10,
            imageName: 'image1.jpg',
          },
        ]),
        selected$: of([]),
        totalCash$: of(50),
      },
    } as any;

    await TestBed.configureTestingModule({
      declarations: [
        ProductComponent,
        MockDeclaration(ProductDisplayComponent),
      ],
      providers: [
        {
          provide: ProductStoreFacadeService,
          useValue: productStoreFacadeServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on init', () => {
    expect(
      productStoreFacadeServiceSpy.actions.fetchProduct
    ).toHaveBeenCalled();
  });

  it('should have products$ observable assigned', () => {
    component.products$.subscribe((products) => {
      expect(products).toEqual([
        {
          id: 1,
          name: 'Product 1',
          price: 100,
          quantity: 10,
          imageName: 'image1.jpg',
        },
      ]);
    });
  });
});
