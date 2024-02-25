import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { CompanyService } from '../Services/company.service';
import { SectorService } from '../Services/sector.service';
import { Observable } from 'rxjs';
import { Company } from '../Models/company.model';
import { Sector } from '../Models/sector.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];

  sectordata: any;
  labelsector: any[] = [];
  realsectordata: any[] = [];
  companies$?: Observable<Company[]>;

  sectors$?: Observable<Sector[]>;
  constructor(private companyService: CompanyService, private sectorService: SectorService) {

  }

  ngOnInit(): void {
    this.companies$ = this.companyService.getAllCompany();
    this.companyService.getAllCompany().subscribe(result => {
      this.chartdata = result;
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          console.log(this.chartdata[i]);
          debugger
          this.labeldata.push(this.chartdata[i].name);
          this.realdata.push(this.chartdata[i].size);

          // this.colordata.push(this.chartdata[i].colorcode);
        }
      }
      this.renderChart(this.labeldata, this.realdata);
    });

    this.sectors$ = this.sectorService.getAllSector();
    this.sectorService.getAllSector().subscribe(result => {
      this.sectordata = result;
      if (this.sectordata != null) {
        for (let i = 0; i < this.sectordata.length; i++) {
          console.log(this.sectordata[i]);
          debugger
          this.labelsector.push(this.sectordata[i].name);
          this.realsectordata.push(this.sectordata[i].companies.length);

          // this.colordata.push(this.chartdata[i].colorcode);
        }
      }
      this.DounghtChart(this.labelsector, this.realsectordata);
    });

  }
  renderChart(labeldata: any, maindata: any) {
    const myChart = new Chart("piechart", {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: '# size of company',
          data: maindata,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  DounghtChart(labeldata: any, maindata: any) {
    const myChart = new Chart("doughnut", {
      type: 'doughnut',
      data: {
        labels: labeldata,
        datasets: [{
          label: '# size of company',
          data: maindata,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
