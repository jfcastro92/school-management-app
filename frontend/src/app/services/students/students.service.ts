import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

constructor(private httpClient: HttpClient) { }
  private baseurl = "http://localhost:3001";
  
  getStudents() : Observable<any> {
    return this.httpClient.get(this.baseurl + "/student")
  }

  createStudent(student: any) : Observable<any> {
    return this.httpClient.post(this.baseurl + "/student/", student);
  }

  editStudent(student: any) : Observable<any> {
    return this.httpClient.patch(this.baseurl + "/student/"+student.id, student);
  }

  deleteStudent(id: number) : Observable<any> {
    return this.httpClient.delete(this.baseurl + "/student/"+id);
  }
}
