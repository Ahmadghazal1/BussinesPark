import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Company } from '../Models/company.model';
import { AddCompanyRequest } from '../Models/add-company.request.model';
import { UpdateCompanyRequest } from '../Models/update-company-request.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl = environment.apiUrl;
  controller = "Company";
  constructor(private http: HttpClient) { }
  getAllCompany(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseUrl + this.controller);
  }
  addCompany(model: AddCompanyRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl + this.controller, model)
  }
  getcompanyById(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}${this.controller}/${id}`);
  }
  updateCompany(id: string, updateSectorRequest: UpdateCompanyRequest): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}${this.controller}/${id}`, updateSectorRequest);
  }
  deleteCompany(id: string): Observable<Company> {
    return this.http.delete<Company>(`${this.baseUrl}${this.controller}/${id}`);
  }
}
