
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../apiUrl/apiUrl';
import { of } from 'rxjs';
import { CandidateService } from './candidate.service';
import { Candidate } from './classes/candidate';

fdescribe('CandidateService', () => {
  let httpClient: HttpClient;
  let candidateservice: CandidateService;

  beforeEach(() => {
    httpClient = ({ get: null, post: null } as unknown) as HttpClient;
    candidateservice = new CandidateService(httpClient);
  })
  it('A new candidtae should be created', () => {
    let candidate: Candidate = {
      id: '5',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.be',
      phone: 'phone',
      linkedIn: 'www.be',
      comment: 'blabla'
    };
    spyOn(httpClient, 'post').and.callFake((url: string) => {
      expect(url).toBe(ApiUrl.urlCandidates);
      return of(candidate);
    });

    candidateservice.createCandidate(candidate)
      .subscribe((result: Candidate) => expect(result).toEqual(candidate));
  });

  it('should return all candidates', () => {

    spyOn(httpClient, 'get').and.callFake((url: string) => {
      expect(url).toBe(ApiUrl.urlCandidates);
      return of(createSomeCandidates());
    });
    candidateservice.getCandidates()
      .subscribe((result: Candidate[]) =>
        expect(result.length).toEqual(2));
  });
  function createSomeCandidates(): Candidate[] {
    return [
      {
        id: '5',
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.be',
        phone: 'phone',
        linkedIn: 'www.be',
        comment: 'blabla'
      },
      {
        id: '7',
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.be',
        phone: 'phone',
        linkedIn: 'www.be',
        comment: 'blabla'
      }

    ]
  };
  it('should return a single candidate', () => {
    let candidate: Candidate = {
      id: '5',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.be',
      phone: 'phone',
      linkedIn: 'www.be',
      comment: 'blabla'
    };
    spyOn(httpClient, 'get').and.callFake((url: string) => {
      expect(url).toBe(`${ApiUrl.urlCandidates}5`);
      return of(candidate);
    });
    candidateservice.getById('5')
      .subscribe((result: Candidate) =>
        expect(result.id).toBe('5'));
  });
})
