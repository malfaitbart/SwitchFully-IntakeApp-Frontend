import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CampaignService } from './campaigns/campaign.service';
import { AuthService } from './authentication/service/auth.service';
import { AuthGuard } from './authentication/guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
  ],

  providers:[
    CampaignService,
    AuthService,
    AuthGuard,
  ]

})
export class CoreModule { }
