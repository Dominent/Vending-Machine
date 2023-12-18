import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CashModule } from './modules/cash/cash.module';
import { CashEffects } from './modules/cash/store/cash.effects';
import { cashReducer } from './modules/cash/store/cash.reducer';
import { InformationModule } from './modules/information/information.module';
import { ProductModule } from './modules/product/product.module';
import { ProductEffects } from './modules/product/store/product.effects';
import { productReducer } from './modules/product/store/product.reducer';
import { IAppState } from './store/app.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ProductModule,
    CashModule,
    InformationModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forRoot<IAppState>(
      {
        product: productReducer,
        cash: cashReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    EffectsModule.forRoot([ProductEffects, CashEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
