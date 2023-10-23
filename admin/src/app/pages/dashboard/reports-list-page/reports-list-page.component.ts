import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { TicketService } from 'src/app/services/ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports-list-page',
  templateUrl: './reports-list-page.component.html',
  styleUrls: ['./reports-list-page.component.scss']
})
export class ReportsListPageComponent implements OnInit {
  reports: any;
  api = environment.apiUrl;
  constructor(
    private ticketService: TicketService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.ticketService.index().subscribe( res =>{
      console.log(res)
      if ( res.status == 201 ){
        this.reports = res.data;
      }
    })
  }
  approve(id){
    this.productService.delete(id).subscribe( res =>{
      console.log( res )
      if ( res.status == 201){
        location.reload()
      }
    })
  }
}
