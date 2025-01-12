import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private url = `https://projectapi.gerasim.in/api`;

  constructor(private http: HttpClient) { }

  getAllCourses() {
    return this.http
      .get<{ message: string; result: string; data: [] }>(
        `${this.url}/OnlineLearning/GetAllCourse`
      )
      .pipe(
        map((response) => {
          return response.data;
        }), catchError(error => {
          // Handle errors appropriately
          console.error('Error fetching courses:', error);
          throw error;
        })
      );
  }
}
