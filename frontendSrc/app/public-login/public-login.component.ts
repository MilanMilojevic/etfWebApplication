import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accounts } from '../models/Accounts';
import { Sessions } from '../models/Sessions';

import { UsersService } from '../user.service';

@Component({
  selector: 'app-public-login',
  templateUrl: './public-login.component.html',
  styleUrls: ['./public-login.component.css']
})
export class PublicLoginComponent implements OnInit {

  

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.userService.getPublicSessions().subscribe((sessions: Sessions) => {
      this.session = sessions
    })
    this.userService.getUsers().subscribe((accounts: Accounts[]) => {
      this.accounts = accounts;
    });
  }
  accounts: Accounts[];
  user: Accounts[];
  acc: Accounts[];
  session: Sessions;
  usernameReg: string;
  passwordReg: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;;
  email: string;
  role: string;
  approved: boolean;



  login() {
    this.userService.login(this.username, this.password).subscribe((account: Accounts) => {

      localStorage.setItem('logedIn', JSON.stringify(account));
      this.acc = JSON.parse(localStorage.getItem('logedIn'))
      if (this.acc["Id_Roles"] == 6) {
        this.router.navigate(['/admin-main-page'])
      }
      else {
        this.router.navigate(['/main-page'])
      }

    }, err => {

      alert("Loše uneti podaci")
    })
  }


  send() {
    this.userService.registration(this.firstname, this.lastname, this.usernameReg, this.passwordReg, this.email, this.role, this.approved).subscribe(resp => {
      if (resp['affectedRows'] == '1') {
        alert("Vas zahtev je uspesno poslat")
      }
      else {
        alert("Korisnicko ime je zauzeto")
      }
    })
  }

}
