import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Campaign } from './campaign';
import { Observable } from 'rxjs';

@Injectable()
export class CampaignService {
  private campaignsUrl = 'http://localhost:59089/api/Campaigns'
  
  constructor(private http: HttpClient) { }
  
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.campaignsUrl);
  }

}
