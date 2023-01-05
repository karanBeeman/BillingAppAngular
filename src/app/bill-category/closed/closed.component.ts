import { Component, OnInit } from '@angular/core';
import { InoviceBillService } from 'src/app/shared/inovice-bill.service';

@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.css']
})
export class ClosedComponent implements OnInit {

  displayedRows: any

  constructor(private invoiceBillService: InoviceBillService) { }

  ngOnInit(): void {
      this.invoiceBillService.getClosedBills().subscribe(result => {
        this.displayedRows = result;
      });
  }

}
