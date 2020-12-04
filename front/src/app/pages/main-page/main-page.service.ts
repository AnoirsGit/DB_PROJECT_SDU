import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  constructor(private http: HttpClient, ){

  }

  getBooks() {
    return this.http.get<Array<any>>(environment.apiBaseUrl + '/books', );
  }

  getBook(id) {
    return this.http.post(environment.apiBaseUrl + '/book', {id: id});
  }

  getBasket(id) {
    return this.http.post(environment.apiBaseUrl + '/basket',{id:id});
  }

  delBasket(Userid , index) {
    return this.http.post(environment.apiBaseUrl + '/basket/delete', {id:index, userid: Userid });
  }

  insBasket(Userid , index) {
    return this.http.post(environment.apiBaseUrl + '/basket/insert', {id:index, userId: Userid });
  }

}
