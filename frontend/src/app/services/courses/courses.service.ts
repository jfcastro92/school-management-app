import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

constructor(private httpClient: HttpClient) { }
  private baseurl = "http://localhost:3001";
  
  getCourses() : Observable<any> {
    return this.httpClient.get(this.baseurl + "/course")
  }

  createCourse(course: any) : Observable<any> {
    console.log(course);
    return this.httpClient.post(this.baseurl + "/course", course);
  }

  editCourse(id: number, course: any) : Observable<any> {
    return this.httpClient.patch(this.baseurl + "/course/"+id, course);
  }

  deleteCourse(id: number) : Observable<any> {
    return this.httpClient.delete(this.baseurl + "/course/"+id);
  }
}
