import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPipe } from 'ng-mocks';
import { of } from 'rxjs';
import { IProduct, IProductGroup } from '../product/models/product.models';
import { ProductStoreFacadeService } from '../product/store/product-store-facade.service';
import { RoundPipe } from '../shared/pipes/round.pipe';
import { InformationComponent } from './information.component';

describe('InformationComponent', () => {
  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;
  let productStoreFacadeServiceSpy: jasmine.SpyObj<ProductStoreFacadeService>;

  beforeEach(async () => {
    productStoreFacadeServiceSpy = jasmine.createSpyObj(
      'ProductStoreFacadeService',
      ['state', 'actions']
    );

    productStoreFacadeServiceSpy.actions.fetchProduct = jasmine.createSpy();
    productStoreFacadeServiceSpy.actions.addProduct = jasmine.createSpy();
    productStoreFacadeServiceSpy.actions.resetSelectedProducts =
      jasmine.createSpy();
    productStoreFacadeServiceSpy.state.products$ = of([]);
    productStoreFacadeServiceSpy.state.selected$ = of([]);
    productStoreFacadeServiceSpy.state.totalCash$ = of(50);

    await TestBed.configureTestingModule({
      declarations: [InformationComponent, MockPipe(RoundPipe)],
      providers: [
        {
          provide: ProductStoreFacadeService,
          useValue: productStoreFacadeServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have selectedProducts$ observable assigned', () => {
    component.selectedProducts$.subscribe((products) => {
      expect(products).toEqual([]);
    });
  });

  describe('groupProducts Method', () => {
    it('should group products correctly', () => {
      const products: IProduct[] = [
        { id: 1, name: 'Product 1', price: 0, quantity: 0, imageName: '' },
        { id: 1, name: 'Product 1', price: 0, quantity: 0, imageName: '' },
        { id: 2, name: 'Product 2', price: 0, quantity: 0, imageName: '' },
      ];

      const groupedProducts: IProductGroup[] =
        component.groupProducts(products);

      expect(groupedProducts).toEqual([
        { id: 1, name: 'Product 1', count: 2 },
        { id: 2, name: 'Product 2', count: 1 },
      ]);
    });

    it('should handle empty product list', () => {
      const groupedProducts: IProductGroup[] = component.groupProducts([]);

      expect(groupedProducts).toEqual([]);
    });
  });
});
