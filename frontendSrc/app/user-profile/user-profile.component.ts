import { Component, OnInit } from '@angular/core';
import { Accounts } from '../models/Accounts';
import { UsersService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UsersService,) { }

  ngOnInit(): void {
    this.account = JSON.parse(localStorage.getItem('logedIn'))
  }
   
account: Accounts;
firstname:string;
lastname:string;
username:string;
password:string;
email:string;

  update(){
    
  this.userService.update(this.account.Firstname, this.account.Lastname, this.account.Username, this.account.Password, this.account.Email, this.account.Id_Users).subscribe(resp=>{
      
     })
  
 }
}

