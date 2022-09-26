import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Province} from "../model/province";


@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private httpClient: HttpClient) { }

  findAllProvinces(): Observable<Province[]>{
    return this.httpClient.get<Province[]>("http://localhost:3000/tuors")
  }


  createProvince(province?: Province): Observable<Province>{
    return this.httpClient.post<Province>("http://localhost:3000/tuors", province)
  }

  getProvinceById(id?: number): Observable<Province>{
    return this.httpClient.get<Province>("http://localhost:3000/tuors/" + id)
  }

  updateProvince(id?: number,  province?: Province): Observable<Province>{
    return this.httpClient.put<Province>("http://localhost:3000/tuors/" +id ,province)
  }

  deleteProvince(id?: number): Observable<Province>{
    return this.httpClient.delete("http://localhost:3000/tuors/" + id)
  }
}
