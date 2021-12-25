import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'


  login(username, password) {
    const data = {
      username: username,
      password: password

    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  getUsers() {
    return this.http.get(`${this.uri}/users/getUsers`);
  }
  getAssociate_Professor() {
    return this.http.get(`${this.uri}/users/getAssociate_Professor`);
  }
  getProfessor() {
    return this.http.get(`${this.uri}/users/getProfessor`);
  }
  getLecturer() {
    return this.http.get(`${this.uri}/users/getLecturer`);
  }
  getAssistant() {
    return this.http.get(`${this.uri}/users/getAssistant`);
  }
  getAssociate() {
    return this.http.get(`${this.uri}/users/getAssociate`);
  }
  getApprovedUsers() {
    return this.http.get(`${this.uri}/users/getApprovedUsers`);
  }
  getUnapprovedUsers() {
    return this.http.get(`${this.uri}/users/getUnapprovedUsers`);
  }
  getRoles() {
    return this.http.get(`${this.uri}/users/getRoles`)
  }
  getCurrentSession() {
    return this.http.get(`${this.uri}/users/getCurrentSession`)
  }
  getPublicSessions() {
    return this.http.get(`${this.uri}/users/getPublicSessions`)
  }
  getSessions() {
    return this.http.get(`${this.uri}/users/getSessions`)
  }
  getPoints() {
    return this.http.get(`${this.uri}/users/getPoints`)
  }
  getCurrentPoints() {
    return this.http.get(`${this.uri}/users/getCurrentPoints`)
  }
  getCurrentExtraVoting() {
    return this.http.get(`${this.uri}/users/getCurrentExtraVoting`)
  }

  getAllDiscussion() {
    return this.http.get(`${this.uri}/users/getAllDiscussion`);
  }

  insertInExtraVoting(id_users, id_points, voting_allowed) {
    const data = {
      id_users: id_users,
      id_points: id_points,
      voting_allowed: voting_allowed
    }
    return this.http.post(`${this.uri}/users/insertInExtraVoting`, data);
  }
  sendComplaint(id_session, id_users, observation_text) {
    const data = {
      id_session: id_session,
      id_users: id_users,
      observation_text: observation_text
    }
    return this.http.post(`${this.uri}/users/sendComplaint`, data);
  }

  registration(firstname, lastname, usernameReg, passwordReg, email, role, approved) {
    const data = {
      firstname: firstname,
      lastname: lastname,
      usernameReg: usernameReg,
      passwordReg: passwordReg,
      email: email,
      role: role,
      approved: approved
    }
    return this.http.post(`${this.uri}/users/register`, data);
  }

  sendSession(session_title, startDate, endDate, startVote) {
    const data = {
      session_title: session_title,
      startDate: startDate,
      endDate: endDate,
      startVote: startVote
    }
    return this.http.post(`${this.uri}/users/sendSession`, data);
  }
  update(firstname, lastname, username, password, email, id_users) {
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      id_users: id_users
    }
    return this.http.post(`${this.uri}/users/update`, data);

  }
  updateSession(id_sessions, session_title) {
    const data = {
      id_sessions: id_sessions,
      session_title: session_title
    }
    return this.http.post(`${this.uri}/users/updateSession`, data);

  }
  sendPoint(id_users, point_name, point_description) {

    const data = {
      id_users: id_users,
      point_name: point_name,
      point_description: point_description,
      
    }
    console.log(data)

    return this.http.post(`${this.uri}/users/sendPoint`, data);

  }
  searchSessions(id_session) {
    const data = {
      id_session: id_session
    }

    return this.http.post(`${this.uri}/users/searchSessions`, data);
  }
  getPointFromAgenda(id_agenda) {
    const data = {
      id_agenda: id_agenda
    }
    return this.http.post(`${this.uri}/users/getPointFromAgenda`, data);

  }
  getFiles(id_sessions) {
    const data = {
      id_sessions: id_sessions
    }
    return this.http.post(`${this.uri}/users/getFiles`, data);

  }


  approveUser(id_users, approve) {
    const data = {
      id_users: id_users,
      approve: approve
    }
    return this.http.post(`${this.uri}/users/approveUser`, data);

  }
  deletePoint(id_point) {
    const data = {
      id_point: id_point

    }
    return this.http.post(`${this.uri}/users/deletePoint`, data);

  }
  denyUser(id_user) {
    const data = {
      id_user: id_user

    }
    return this.http.post(`${this.uri}/users/denyUser`, data);

  }

  updatePoint(point_voting, point_discussion, point_voting_undeclared, point_voting_public, id_point) {
    const data = {
      point_voting: point_voting,
      point_discussion: point_discussion,
      point_voting_undeclared: point_voting_undeclared,
      point_voting_public: point_voting_public,
      id_point: id_point

    }
    return this.http.post(`${this.uri}/users/updatePoint`, data);

  }

  voting(id_users, voating_public, id_points, voting_for, voting_against, voting_undeclared) {
    const data = {
      id_users: id_users,
      voating_public: voating_public,
      id_points: id_points,
      voting_for: voting_for,
      voting_against: voting_against,
      voting_undeclared: voting_undeclared
    }
    return this.http.post(`${this.uri}/users/voting`, data);
  }

  // sendAttachment(id_users, id_point) {
  //   const data = {
  //     id_users: id_users,
  //     id_point: id_point
  //   }
  //   return this.http.post(`${this.uri}/users/voting`, data);
  // }

  sendMsg(id_users, id_point, discussion_text, discussion_time) {
    const data = {
      id_users: id_users,
      id_point: id_point,
      discussion_text: discussion_text,
      discussion_time: discussion_time
    }
    return this.http.post(`${this.uri}/users/sendMsg`, data);
  }


}