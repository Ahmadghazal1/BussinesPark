import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ComplaintRequest } from '../Models/compaint-comapny-request.model';
import { Observable } from 'rxjs';
import { Complaint } from '../Models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl = environment.apiUrl;
  controller = "Complaint";
  constructor(private http: HttpClient) { }
  addComplaint(model: ComplaintRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl + this.controller, model)
  }
  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.baseUrl + this.controller);
    debugger
  }
  deleteComplaint(id: string): Observable<Complaint> {
    return this.http.delete<Complaint>(`${this.baseUrl}${this.controller}/${id}`);
  }

}
