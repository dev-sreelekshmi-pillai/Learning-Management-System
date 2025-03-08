import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `https://projectapi.gerasim.in/api/OnlineLearning`;
  constructor(private http: HttpClient) { }

  checkUserLogin(loginData: FormGroup) {
    return this.http
      .post<{ message: string; result: string; data: [] }>(
        `${this.url}/login`, loginData.value
      )
  }

  handleError(error: any) {
    console.log(`Error message is : ${error.message}`)
    return error
  }
}
