import { Component, OnInit } from '@angular/core';
import { Accounts } from '../models/Accounts';
import { Point } from '../models/Point';
import { UsersService } from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {    this.account = JSON.parse(localStorage.getItem('logedIn'))

  }
account: Accounts;

}
