import { Component, OnInit } from '@angular/core';
import { Accounts } from '../models/Accounts';
import { Point } from '../models/Point';
import { CurSession } from '../models/CurSession';
import { UsersService } from '../user.service';
import alertify from "alertifyjs"

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private userService: UsersService) { }
  session: CurSession = {} as CurSession;

  ngOnInit(): void {
    this.account = JSON.parse(localStorage.getItem('logedIn'));

    this.userService.getCurrentSession().subscribe((sessions: CurSession) => {
      this.session = sessions;
      let datum = this.session[0].Start_Date.slice(0, 10)
      let vreme = this.session[0].Start_Date.slice(11, 16)

      alertify.warning('Pocetak sledece sednice je ' + datum + " u " + vreme);

    })
  }

  account: Accounts;
  point: Point
  point_name: string;
  point_description: string;

  send() {
    this.userService.sendPoint(this.account.Id_Users, this.point_name, this.point_description).subscribe(resp => {
    })
    alertify.success('Predlog za tacku uspesno poslat'); 


  }

}
