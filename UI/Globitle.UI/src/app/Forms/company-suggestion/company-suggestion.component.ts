import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Suggestion } from 'src/app/Models/suggestion.model';
import { SuggestionService } from 'src/app/Services/suggestion.service';

@Component({
  selector: 'app-company-suggestion',
  templateUrl: './company-suggestion.component.html',
  styleUrls: ['./company-suggestion.component.css']
})
export class CompanySuggestionComponent {
  suggestions$?: Observable<Suggestion[]>;
  dtOptions: DataTables.Settings = {};
  constructor(private suggestionService: SuggestionService) {

  }

  ngOnInit(): void {
    this.suggestions$ = this.suggestionService.getAllSuggestion();
  }
}
