import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RoutingModule} from './routing/routing.module'
import {CoreModule} from './core/core.module'
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { HeaderComponent } from './features/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    CoreModule,
    FeaturesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
