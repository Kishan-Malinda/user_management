import { Injectable } from '@angular/core';
import { IUser } from '../models/User';

//import HttpClient
import {HttpClient} from '@angular/common/http';
//rxjs for handling async request and responses
import { Observable } from 'rxjs';
//import environments
import { environment } from 'src/assets/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http : HttpClient) { }
  getUserList(): Observable<IUser[]>{
    return this.http.get<IUser[]>(environment.APIURL+'User/GetAll');
  }
  getUserById(val:any): Observable<IUser>{
    return this.http.get<IUser>(environment.APIURL+'User/GetById/?userID='+val);
  }
  addUser(val:any){
    return this.http.post(environment.APIURL+'User/AddUser/',val);
  }
  deleteUser(val:any){
    return this.http.delete(environment.APIURL+'User/Delete/?userID='+val);
  }
  updateUser(val:any){
    return this.http.put(environment.APIURL+'User/Update/',val);
  }
}
