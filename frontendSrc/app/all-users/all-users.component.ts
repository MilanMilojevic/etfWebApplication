import { Component, OnInit } from '@angular/core';
import { Accounts } from '../models/Accounts';
import { Roles } from '../models/Roles';
import { UsersService } from '../user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  constructor( private userService: UsersService) { }
  userAccount: Accounts;
  account: Accounts[];

  ngOnInit(): void {
    this.userAccount = JSON.parse(localStorage.getItem('logedIn'))
    this.userService.getApprovedUsers().subscribe((accounts: Accounts[]) =>{
      this.account = accounts;
      })
  }

  
}
