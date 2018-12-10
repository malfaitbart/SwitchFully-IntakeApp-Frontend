import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CampaignService } from './campaigns/campaign.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  exports: [
    CommonModule,
    BrowserModule,
  ],
  providers:[
    CampaignService
  ]
})
export class CoreModule { }
