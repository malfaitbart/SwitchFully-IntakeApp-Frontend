import { Candidate } from '../../candidates/classes/candidate';
import { Campaign } from '../../campaigns/classes/campaign';
import { Status } from './status';
import { FileInfo } from './fileInfo';

export class JobApplication{
  id: string;
  candidate: Candidate;
  campaign: Campaign;
  status: Status;
  cv: FileInfo;
  motivation: FileInfo;
}
