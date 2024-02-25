import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { SuggestionRequest } from '../Models/suggestion-company-request.mode';
import { Observable } from 'rxjs';
import { Suggestion } from '../Models/suggestion.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  baseUrl = environment.apiUrl;
  controller = "Suggestion";
  constructor(private http: HttpClient) { }
  addSuggestion(model: SuggestionRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl + this.controller, model)
  }
  getAllSuggestion(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.baseUrl + this.controller);
  }
}
