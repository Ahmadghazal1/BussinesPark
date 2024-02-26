import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Sector } from 'src/app/Models/sector.model';
import { SectorService } from 'src/app/Services/sector.service';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.css']
})
export class SectorListComponent implements OnInit {
  sectors$?: Observable<Sector[]>;
  dtOptions: DataTables.Settings = {};
  constructor(private sectorService: SectorService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      dom: 'Bfrtip'
      // Add other options...
    };
  }

  ngOnInit(): void {
    this.sectors$ = this.sectorService.getAllSector();
  }

}
