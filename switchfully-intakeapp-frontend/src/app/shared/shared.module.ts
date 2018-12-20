import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CoreModule,
    CommonModule
  ],
  exports:[
    SearchComponent,
  ]
})
export class SharedModule { }
