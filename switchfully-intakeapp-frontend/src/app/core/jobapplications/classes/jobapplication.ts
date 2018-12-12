import { Candidate } from '../../candidates/classes/candidate';
import { Campaign } from '../../campaigns/classes/campaign';
import { Status } from './status';

export class JobApplication{
  id: string;
  candidateId: string;
  candidate: Candidate;
  campaignId: string;
  campaign: Campaign;
  statusId: string;
  status: Status;
}
