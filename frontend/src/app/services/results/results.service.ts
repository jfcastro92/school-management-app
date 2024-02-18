import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

constructor(private httpClient: HttpClient) { }
  private baseurl = "http://localhost:3001";
  
  getResults() : Observable<any> {
    return this.httpClient.get(this.baseurl + "/result/getresultlist")
  }

  createResult(result: any) : Observable<any> {
    console.log(result);
    return this.httpClient.post(this.baseurl + "/result", result);
  }

  editResult(result: any) : Observable<any> {
    return this.httpClient.patch(this.baseurl + "/result/"+result.id, result);
  }

  deleteResult(id: number) : Observable<any> {
    return this.httpClient.delete(this.baseurl + "/result/"+id);
  }
}
