import { CampaignService } from './campaign.service';
import { HttpClient } from '@angular/common/http';
import { Campaign } from './classes/campaign';
import { ApiUrl } from '../apiUrl/apiUrl';
import { of } from 'rxjs';

fdescribe('CampaignService', () => {
  let httpClient: HttpClient;
  let campaignservice: CampaignService;

  beforeEach(() => {
    httpClient = ({ get: null, post: null } as unknown) as HttpClient;
    campaignservice = new CampaignService(httpClient);
  })
  it('A new campaign should be created', () => {
    let campaign: Campaign = {
      campaignId: 'B2A21DD7-E3A7-4B43-A38A-2041287049F5',
      name: "java",
      client: "vab",
      startDate: new Date(),
      endDate: new Date(),
      status: true
    };
    spyOn(httpClient, 'post').and.callFake((url: string) => {
      expect(url).toBe(ApiUrl.urlCampaign);
      return of(campaign);
    });

    campaignservice.createCampaign(campaign)
      .subscribe((result: Campaign) => expect(result).toEqual(campaign));
  });

  it('should return all campaigns', () => {

    spyOn(httpClient, 'get').and.callFake((url: string) => {
      expect(url).toBe(ApiUrl.urlCampaign);
      return of(createSomeCampaigns());
    });
    campaignservice.getCampaigns()
      .subscribe((result: Campaign[]) =>
        expect(result.length).toEqual(2));
  });
  function createSomeCampaigns(): Campaign[] {
    return [
      {
        campaignId: 'B2A21DD7-E3A7-4B43-A38A-2041287049F6',
        name: "java",
        client: "vab",
        startDate: new Date(),
        endDate: new Date(),
        status: true
      },
      {
        campaignId: 'B2A21DD7-E3A7-4B43-A38A-2041287049F5',
        name: "java",
        client: "vab",
        startDate: new Date(),
        endDate: new Date(),
        status: true
      }

    ]
  };
  it('should return a single campaign', () => {
    let campaign: Campaign = {
      campaignId: 'B2A21DD7-E3A7-4B43-A38A-2041287049F5',
      name: "java",
      client: "vab",
      startDate: new Date(),
      endDate: new Date(),
      status: true
    };
    spyOn(httpClient, 'get').and.callFake((url: string) => {
      expect(url).toBe(`${ApiUrl.urlCampaign}id:string?id=B2A21DD7-E3A7-4B43-A38A-2041287049F5`);
      return of(campaign);
    });
    campaignservice.getSingleCampaign('B2A21DD7-E3A7-4B43-A38A-2041287049F5')
      .subscribe((result: Campaign) =>
        expect(result.campaignId).toBe('B2A21DD7-E3A7-4B43-A38A-2041287049F5'));
  })
})
