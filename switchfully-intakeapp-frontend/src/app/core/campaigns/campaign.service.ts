import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Campaign } from './campaign';
import { Observable } from 'rxjs';
import { ApiUrl } from '../apiUrl/apiUrl';

@Injectable()
export class CampaignService {

  
  constructor(private http: HttpClient) { }
  
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(ApiUrl.urlCampaign);
  }

}
