import { TestBed, async } from '@angular/core/testing';
import { MockDeclaration } from 'ng-mocks';
import { AppComponent } from './app.component';
import { CashComponent } from './modules/cash/cash.component';
import { InformationComponent } from './modules/information/information.component';
import { ProductComponent } from './modules/product/product.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockDeclaration(InformationComponent),
        MockDeclaration(ProductComponent),
        MockDeclaration(CashComponent),
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
