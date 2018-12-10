import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Campaign } from './campaign';
import { Observable } from 'rxjs';
import { ApiUrl } from '../apiUrl/apiUrl';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CampaignService {
  
  
  constructor(private http: HttpClient) { }
  
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(ApiUrl.urlCampaign);
  }
  
  
  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(ApiUrl.urlCampaign, campaign, httpOptions);
  }
  
  getSingleCampaign(id: string): Observable<Campaign> {
   return this.http.get<Campaign>(`${ApiUrl.urlCampaign}/${id}`);
  }
}
