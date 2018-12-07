import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { HomepageComponent } from './homepage/homepage.component';
import { RoutingModule } from '../routing/routing.module';

@NgModule({
  declarations: [
HomepageComponent
  ],
  imports: [
    CoreModule,
    RoutingModule
  ]
})
export class FeaturesModule { }
