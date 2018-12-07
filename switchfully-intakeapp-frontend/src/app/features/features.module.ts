import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { HomepageComponent } from './homepage/homepage.component';
import { RoutingModule } from '../routing/routing.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
HomepageComponent,
  ],
  imports: [
    CoreModule,
    RoutingModule
  ]
})
export class FeaturesModule { }
