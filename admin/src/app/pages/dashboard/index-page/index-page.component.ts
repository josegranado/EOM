import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  public identity;
  users: any;
  products: any;
  transactions: any;
  apiUrl = environment.apiUrl;
  total_credits: any;
  constructor(
    private dashboardService: DashboardService
  ) { 
    this.identity = JSON.parse(localStorage.getItem('identity'));
  }
  public confirmados;
  public registrados;
  public eliminados;
  public productos;
  public servicios;
  ngOnInit(): void {
    this.dashboardService.index().subscribe( res =>{
      console.log( res )
      if ( res.status == 201){
        this.users = res.data.users;
        this.confirmados = this.users.filter((user) => user.is_approved === 1)
        this.eliminados = this.users.filter((user) => user.deleted === 1)
        this.products = res.data.products;
        this.productos = this.products.filter((product) => product.type === 1);
        this.servicios = this.products.filter((product) => product.type === 2);
        this.transactions = res.data.transactions;
        this.total_credits = res.data.total_credits;
      }
    })
  }

}
