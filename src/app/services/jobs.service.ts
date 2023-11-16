import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient) {}

  createJob(
    jobDetails: Partial<{
      _id: string;
      jobTitle: string;
      jobType: string;
      for: string;
      jobDetails: object;
      sectorId: string;
    }>
  ): Observable<any> {
    const storedUserData: object | any = localStorage.getItem('user');
    const userId = JSON.parse(storedUserData)._id;
    const headers = new HttpHeaders().set('userId', userId);
    console.log(jobDetails);

    return this.http.post('http://localhost:4444/jobs', jobDetails, {
      headers,
    });
  }

  getJobList(sectorId: string): Observable<any> {
    return this.http.get('http://localhost:4444/jobs/sector/' + sectorId);
  }

  deleteJob(sectorId: string): Observable<any> {
    return this.http.delete('http://localhost:4444/jobs/' + sectorId);
  }

  completeJob(jobId: string, sectorId: string): Observable<any> {
    return this.http.patch('http://localhost:4444/jobs/changeJobStatus', {
      status: 'completed',
      JobId: jobId,
      sectorId: sectorId,
    })
  }
}
