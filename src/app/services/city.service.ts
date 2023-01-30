import { Injectable } from '@angular/core';
import { ICity } from '../models/City';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http : HttpClient) { }
  getCityList() : Observable<ICity[]>{
    return this.http.get<ICity[]>(environment.APIURL+'SL_City_/GetAllCity');
  }
}
