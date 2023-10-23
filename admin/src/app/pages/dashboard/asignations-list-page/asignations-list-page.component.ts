import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-asignations-list-page',
  templateUrl: './asignations-list-page.component.html',
  styleUrls: ['./asignations-list-page.component.scss']
})
export class AsignationsListPageComponent implements OnInit {
  transactions;
  users;
  usersAll: any;
  modalRef: BsModalRef;
  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.userService.index().subscribe ( res =>{
      console.log( res )
      if ( res.status == 201){
        this.users = res.data;
        this.usersAll = res.data;
      }
    })
    this.transactionService.asignations(1).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        this.transactions = res.data;
      }
    })
  }
  open(modal ){
    this.modalRef = this.modalService.show(modal);
  }
  search;
  type = 'P';
  onSearch(search){
    if ( search ){
      this.users = this.users.filter(( user ) => user.id === search.id )
    }else{
      this.users = this.usersAll;
    }
  }
  onSubmit(values){
    let tx;
    if ( this.type == 'T'){
      tx = {
        ...values,
      }
    }else{
      tx = {
        ...values,
        user_id: values.toUser.id
      }
    }
    console.log( values );
    this.transactionService.store(tx).subscribe( res => {
      console.log( res )
      if ( res.status == 201){
        location.reload();
      }
    })
  }
}
