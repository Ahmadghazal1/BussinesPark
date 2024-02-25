import { Component, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnDestroy {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  companies$?: Observable<Company[]>;
  constructor(private companyService: CompanyService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.companies$ = this.companyService.getAllCompany();
    this.spinner.hide();
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      dom: 'Bfrtip'

    };

  }
  /**Default name for excel file when download**/
  fileName = 'ExcelSheet.xlsx';

  exportexcel() {
    /**passing table id**/
    let data = document.getElementById('table-data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /**Generate workbook and add the worksheet**/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /*save to file*/
    XLSX.writeFile(wb, this.fileName);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
