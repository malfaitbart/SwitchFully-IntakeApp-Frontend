import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CampaignService } from './campaigns/campaign.service';
import { AuthService } from './authentication/service/auth.service';
import { AuthGuard } from './authentication/guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobapplicationService } from './jobapplications/jobapplication.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
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
    JobapplicationService,
  ]

})
export class CoreModule { }
