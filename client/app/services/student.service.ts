import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {

  private headers = new Headers({ 'Content-Type': 'applistudention/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getStudents(): Observable<any> {
    return this.http.get('/api/students').map(res => res.json());
  }

  countStudents(): Observable<any> {
    return this.http.get('/api/students/count').map(res => res.json());
  }

  addStudent(student): Observable<any> {
    return this.http.post('/api/student', JSON.stringify(student), this.options);
  }

  getStudent(student): Observable<any> {
    return this.http.get(`/api/student/${student._id}`).map(res => res.json());
  }

  editStudent(student): Observable<any> {
    return this.http.put(`/api/student/${student._id}`, JSON.stringify(student), this.options);
  }

  deleteStudent(student): Observable<any> {
    return this.http.delete(`/api/student/${student._id}`, this.options);
  }

}
