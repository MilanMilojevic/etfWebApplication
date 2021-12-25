import express from 'express';
import nodemailer from "nodemailer";
import { multer } from 'multer';
import { connection } from '..';


export class UsersController {

    login(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Users WHERE Username=? AND Password=? AND Approved=1', [req.body.username, req.body.password], (err, user) => {
            if (err) console.log(err);
            else if (user.length == 0) {
                res.status(401)
                res.json({})

            }
            else {
                res.status(200)
                res.json(user[0])
            }

        })
    }
    registration(req: express.Request, res: express.Response) {
        connection.query('INSERT INTO Users (Username, Firstname, Lastname, Password, Id_Roles, Email, Approved) VALUES (?,?,?,?,?,?,0)', [req.body.usernameReg, req.body.firstname, req.body.lastname, req.body.passwordReg, req.body.role, req.body.email], (err, user) => {
            res.status(200)
            res.json(user || err)


        })
    }
    updateSession(req: express.Request, res: express.Response) {
        connection.query('UPDATE Sessions SET Session_Title=? WHERE Id_Sessions=? ', [req.body.session_title, req.body.id_sessions], (err, user) => {
            res.status(200)
            res.json(user || err)


        })
    }
    sendComplaint(req: express.Request, res: express.Response) {
        connection.query('INSERT INTO Observation (Id_Sessions, Id_Users, Observation_Text) VALUES (?,?,?)', [req.body.id_session, req.body.id_users, req.body.observation_text], (err, user) => {
            res.status(200)
            res.json(user || err)


        })
    }

    sendSession(req: express.Request, res: express.Response) {
        connection.query('INSERT INTO Sessions (Session_Title, Start_Date, End_Date, Start_Voting) VALUES (?,?,?,?)', [req.body.session_title, req.body.startDate, req.body.endDate, req.body.startVote], (err, user) => {
            connection.query("INSERT INTO Agenda(Id_Sessions) VALUES((SELECT MAX(Id_Sessions)FROM Sessions))", (err, user) => {
                res.status(200)
                res.json(user || err)


            })


        })



        this.sendNotifications(req, res)

    }
    sendNotifications(req: express.Request, res: express.Response) {
        connection.query('SELECT Email FROM Users WHERE  Approved=1 ', (err, rows) => {
            if (err) throw err;
            const transporter = nodemailer.createTransport({
                service: "gmail",
                pool: true,
                auth: {
                    user: "prvagrupa.etf@gmail.com",
                    pass: "programiranje1."
                }
            });
            for (let i = 0; i < rows.length; i++) {

                let datum = req.body.startDate.slice(0, 10)
                let vreme = req.body.startDate.slice(11, 16)
                let mailOptions = {
                    from: `"Tim 1", "prvagrupa.etf@gmail.com"`,
                    to: `${rows[i].Email}`,
                    subject: "Notifikacija za sednicu",
                    html: "Naziv sednice: " + req.body.session_title + ", datum pocetka sednice: " + datum + ", vreme pocetka sednice: " + vreme
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) console.log(error)
                })
            }

        });
    }


    sendPoint(req: express.Request, res: express.Response) {
console.log(req.body)
        connection.query('INSERT INTO Points (Id_Users, Point_Name, Point_Description) VALUES (?,?,?)', [req.body.id_users, req.body.point_name, req.body.point_description], (err, user) => {
            connection.query('INSERT INTO Point_On_Agenda(Id_Agenda, Id_Points) VALUES((SELECT MAX(Id_Agenda)FROM Agenda), (SELECT MAX(Id_Points) FROM Points))', (err, user) => {
                res.status(200)
            res.json(user || err)
            })


        })

    }
    insertInExtraVoting(req: express.Request, res: express.Response) {
        connection.query('INSERT INTO Extra_Voting (Id_Users, Id_Points, Voting_Allowed) VALUES (?,?,?)', [req.body.id_users, req.body.id_points, req.body.voting_allowed], (err, user) => {
            res.status(200)
            res.json(user || err)


        })
    }
    deletePoint(req: express.Request, res: express.Response) {
        connection.query('DELETE FROM Points WHERE Id_Points=?', [req.body.id_point], (err, user) => {
            res.status(200)
            res.json(user || err)


        })
    }
    denyUser(req: express.Request, res: express.Response) {
        connection.query('DELETE FROM Users WHERE Id_Users=?', [req.body.id_user], (err, user) => {
            res.status(200)
            res.json(user || err)


        })
    }

    update(req: express.Request, res: express.Response) {
        connection.query('UPDATE Users SET Username=?, Firstname=?, Lastname=?, Password=?, Email=? WHERE Id_Users=?', [req.body.username, req.body.firstname, req.body.lastname, req.body.password, req.body.email, req.body.id_users], (err, user) => {
            res.status(200)
            res.json(user || err)


        })
    }
    updatePoint(req: express.Request, res: express.Response) {


        connection.query('UPDATE Points SET Point_Voting=?, Point_Discussion=?, Point_Voting_Undeclared=?, Point_Voting_Public=? WHERE Id_Points=?', [req.body.point_voting, req.body.point_discussion, req.body.point_voting_undeclared, req.body.point_voting_public, req.body.id_point], (err, user) => {
            res.status(200)
            res.json(user || err)


        })
    }
    approveUser(req: express.Request, res: express.Response) {
        connection.query('UPDATE Users SET Approved=? WHERE Id_Users=?', [req.body.approve, req.body.id_users], (err, user) => {
            res.status(200)
            res.json(user || err)


        })
    }




    getUsers(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Users', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }

    getFiles(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Attachments', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });


    }


    getCurrentSession(req: express.Request, res: express.Response) {
        connection.query('SELECT S.* FROM Sessions S WHERE S.Id_Sessions = ( SELECT MAX(Id_Sessions) AS Latest FROM Sessions)', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    getPublicSessions(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Sessions WHERE Public=1 ORDER BY Id_Sessions DESC LIMIT 5 ', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    getPoints(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Points P, Users U WHERE P.Id_Users=U.Id_Users', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }

    getSessions(req: express.Request, res: express.Response) {
        connection.query('SELECT S.Id_Sessions, S.Session_Title, S.Start_Date, S.End_Date, A.Conclusion, A.Id_Agenda from Sessions S, Agenda A where S.Id_Sessions = A.Id_Sessions', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    getPointFromAgenda(req: express.Request, res: express.Response) {
        connection.query('SELECT P.Point_Name, P.Voting_Results, X.Id_Agenda FROM Points P, Point_On_Agenda X WHERE P.Id_Points = X.Id_Points AND X.Id_Agenda=?', [req.body.id_agenda], (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    searchSessions(req: express.Request, res: express.Response) {
        connection.query('SELECT S.Id_Sessions, S.Session_Title , S.Start_Date, S.End_Date, P.Voting_Results, P.Point_Name FROM Sessions S, Points P WHERE S.Id_Sessions=?', [req.body.id_session], (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    getProfessor(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Users WHERE Id_Roles=1', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    getAssociate_Professor(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Users WHERE Id_Roles=2', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    getLecturer(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Users WHERE Id_Roles=3', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    getAssistant(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Users WHERE Id_Roles=4', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    getAssociate(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Users WHERE Id_Roles=5', (err, rows) => {
            if (err) throw err;
            res.json(rows);

        });
    }
    getApprovedUsers(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Users U, Roles R WHERE (U.Id_Roles = R.Id_Roles AND Approved=1 AND Id_Users!=1) ', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    getUnapprovedUsers(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Users U, Roles R WHERE (U.Id_Roles = R.Id_Roles AND Approved=0)', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    getCurrentPoints(req: express.Request, res: express.Response) {
        connection.query('SELECT * FROM Points P, Sessions S, Agenda A, Point_On_Agenda PA WHERE S.Id_Sessions = A.Id_Sessions AND A.Id_Agenda = PA.Id_Agenda AND PA.Id_Points = P.Id_Points AND A.Id_Agenda=(SELECT MAX(Id_Agenda) FROM Agenda)', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    getCurrentExtraVoting(req: express.Request, res: express.Response) {
        connection.query('SELECT EV.* FROM Extra_Voting EV, Points P, Agenda A, Point_On_Agenda PA WHERE EV.Id_Points = P.Id_Points AND P.Id_Points= PA.Id_Points AND PA.Id_Agenda = A.Id_Agenda AND A.Id_Agenda=(SELECT MAX(Id_Agenda) FROM Agenda)', (err, rows) => {
            if (err) throw err;
            res.json(rows);

        });


    }

    getAllDiscussion(req: express.Request, res: express.Response) {
        connection.query('SELECT U.Firstname, U.Lastname, U.Username, D.Id_Users, D.Discussion_Text, D.Discussion_Time, PD.Id_Points, P.Point_Name, A.Id_Sessions FROM Users U, Discussion D, Point_Discussion PD, Points P, Point_On_Agenda PA, Agenda A WHERE U.Id_Users = D.Id_Users AND D.Id_Discussion = PD.Id_Discussion AND PD.Id_Points = P.Id_Points AND P.Id_Points = PA.Id_Points AND PA.Id_Agenda = A.Id_Agenda AND A.Id_Agenda=(SELECT MAX(Id_Agenda) FROM Agenda)', (err, rows) => {
            if (err) throw err;
            res.json(rows);
        })
    }

    voting(req: express.Request, res: express.Response) {
        console.log(req.body);
        connection.query('UPDATE Points SET Voting_For=Voting_For+?, Voting_Against=Voting_Against+?, Voting_Undeclared=Voting_Undeclared+? WHERE Id_Points=?', [req.body.voting_for, req.body.voting_against, req.body.voting_undeclared, req.body.id_points], (err, user) => {
            if (req.body.voating_public == 1) {
                if (req.body.voting_for == 1) {
                    connection.query('INSERT INTO Public_Voting VALUES (?,?,"Da")', [req.body.id_users, req.body.id_points], (err, res) => {
                        console.log('object');
                    })
                }
                if (req.body.voting_against == 1) {
                    connection.query('INSERT INTO Public_Voting VALUES (?,?,"Ne")', [req.body.id_users, req.body.id_points], (err, res) => {
                        console.log('object');
                    })

                }
                if (req.body.voting_undeclared == 1) {
                    connection.query('INSERT INTO Public_Voting VALUES (?,?,"Uzdrzan")', [req.body.id_users, req.body.id_points], (err, res) => {
                        console.log('object');
                    })
                }
            }
            res.status(200)
            res.json(user || err)
        })
    }

    sendMsg(req: express.Request, res: express.Response) {
        console.log(req.body);
        connection.query('INSERT INTO Discussion (Id_Users, Discussion_Text) VALUES (?,?)', [req.body.id_users, req.body.discussion_text], (err, user) => {
            connection.query("INSERT INTO Point_Discussion(Id_Points, Id_Discussion) VALUES(?,(SELECT MAX(Id_Discussion)FROM Discussion))", [req.body.id_point], (err, user) => {
                res.status(200)
                res.json(user || err)

            })


        })
    }


}

