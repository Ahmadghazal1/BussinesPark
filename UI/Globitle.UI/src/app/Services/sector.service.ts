import { Injectable } from '@angular/core';
import { AddSectorRequest } from '../Models/add-sector-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Sector } from '../Models/sector.model';
import { UpdateSectorRequest } from '../Models/update-sector-request.model';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  baseUrl = environment.apiUrl;
  controller = "Sector";
  constructor(private http: HttpClient) { }

  addsector(model: AddSectorRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl + this.controller, model)
  }

  getAllSector(): Observable<Sector[]> {
    return this.http.get<Sector[]>(this.baseUrl + this.controller);
  }
  updateSector(id: string, updateSectorRequest: UpdateSectorRequest): Observable<Sector> {
    return this.http.put<Sector>(`${this.baseUrl}${this.controller}/${id}`, updateSectorRequest);
  }

  getSectorById(id: string): Observable<Sector> {
    return this.http.get<Sector>(`${this.baseUrl}${this.controller}/${id}`);
  }
  deleteSector(id: string): Observable<Sector> {
    return this.http.delete<Sector>(`${this.baseUrl}${this.controller}/${id}`);
  }
}
