import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-credits-members-list-page',
  templateUrl: './credits-members-list-page.component.html',
  styleUrls: ['./credits-members-list-page.component.scss']
})
export class CreditsMembersListPageComponent implements OnInit {
  transactions;
  users;
  usersAll: any;
  constructor(
    private transactionService: TransactionService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.index().subscribe ( res =>{
      console.log( res )
      if ( res.status == 201){
        this.users = res.data;
        this.usersAll = res.data;
      }
    })
    this.transactionService.index(1).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.transactions = res.data;
      }
    })
  }
  open(modal, user){}
  search;
  onSearch(search){
    if ( search ){
      this.users = this.users.filter(( user ) => user.id === search.id )
    }else{
      this.users = this.usersAll;
    }
  }
}
