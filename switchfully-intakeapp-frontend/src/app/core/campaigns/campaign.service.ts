import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Campaign } from './classes/campaign';
import { Observable, of } from 'rxjs';
import { ApiUrl } from '../apiUrl/apiUrl';
import { tap, filter } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CampaignService {

  filterdListOfCampaigns: Campaign[];

  constructor(private http: HttpClient) { }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(ApiUrl.urlCampaign)
      .pipe(
        tap(h => { console.log(`fetched all campaigns`) }),
      );
  }

  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(ApiUrl.urlCampaign, campaign, httpOptions)
      .pipe(
        tap(h => { console.log(`campaign added`) }),
      );
  }

  getSingleCampaign(id: string): Observable<Campaign> {
    return this.http.get<Campaign>(`${ApiUrl.urlCampaign}id:string?id=${id}`)
      .pipe(
        tap(h => { console.log(`fetched by campaignId = ${id}`) }),
      );
  }

  searchItemOnGivenElement(searchTerm: string, list: Observable<Campaign[]>): Observable<Campaign[]> {        
    if (!searchTerm) {
      return list;
    }
    list.subscribe(campaigns => this.filterdListOfCampaigns = campaigns);

    return of(this.filterdListOfCampaigns.filter(campaign =>  campaign.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }  
}

