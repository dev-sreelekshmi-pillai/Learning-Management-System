import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { response } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private url = `https://projectapi.gerasim.in/api/OnlineLearning`;

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<response> {
    return this.http
      .get<response>(
        `${this.url}/GetAllCourse`
      )
      .pipe(
        map((response) => {
          return response;
        }), catchError(error => {
          // Handle errors appropriately
          console.error('Error fetching courses:', error);
          throw error;
        })
      );
  }
}
