import express from 'express';
import { UsersController } from '../controllers/users.controller';

export const usersRouter = express.Router();

usersRouter.route('/login').post(
    (req, res) => new UsersController().login(req, res)
)

usersRouter.route('/getAssociate_Professor').get((req, res) => {
    new UsersController().getAssociate_Professor(req, res);
});
usersRouter.route('/getProfessor').get((req, res) => {
    new UsersController().getProfessor(req, res);
});
usersRouter.route('/getLecturer').get((req, res) => {
    new UsersController().getLecturer(req, res);
});
usersRouter.route('/getAssistant').get((req, res) => {
    new UsersController().getAssistant(req, res);
});
usersRouter.route('/getFiles').get((req, res) => {
    new UsersController().getFiles(req, res);
});
usersRouter.route('/getAssociate').get((req, res) => {
    new UsersController().getAssociate(req, res);
});
usersRouter.route('/getUsers').get((req, res) => {
    new UsersController().getUsers(req, res);
});
usersRouter.route('/getApprovedUsers').get((req, res) => {
    new UsersController().getApprovedUsers(req, res);
});
usersRouter.route('/getUnapprovedUsers').get((req, res) => {
    new UsersController().getUnapprovedUsers(req, res);
});
usersRouter.route('/getPoints').get((req, res) => {
    new UsersController().getPoints(req, res);
});
usersRouter.route('/getCurrentPoints').get((req, res) => {
    new UsersController().getCurrentPoints(req, res);
});
usersRouter.route('/getCurrentExtraVoting').get((req, res) => {
    new UsersController().getCurrentExtraVoting(req, res);
});
usersRouter.route('/getCurrentSession').get((req, res) => {
    new UsersController().getCurrentSession(req, res);
});
usersRouter.route('/getPublicSessions').get((req, res) => {
    new UsersController().getPublicSessions(req, res);
});
usersRouter.route('/register').post(
    (req, res) => new UsersController().registration(req, res)
);
usersRouter.route('/updateSession').post(
    (req, res) => new UsersController().updateSession(req, res)
);
usersRouter.route('/sendComplaint').post(
    (req, res) => new UsersController().sendComplaint(req, res)
);
usersRouter.route('/sendSession').post(
    (req, res) => new UsersController().sendSession(req, res)
);
usersRouter.route('/insertInExtraVoting').post(
    (req, res) => new UsersController().insertInExtraVoting(req, res)
);
usersRouter.route('/update').post(
    (req, res) => new UsersController().update(req, res)
);
usersRouter.route('/updatePoint').post(
    (req, res) => new UsersController().updatePoint(req, res)
);
usersRouter.route('/sendPoint').post(
    (req, res) => new UsersController().sendPoint(req, res)
);
usersRouter.route('/deletePoint').post(
    (req, res) => new UsersController().deletePoint(req, res)
);
usersRouter.route('/denyUser').post(
    (req, res) => new UsersController().denyUser(req, res)
);
usersRouter.route('/getSessions').get((req, res) => {
    new UsersController().getSessions(req, res);
});
usersRouter.route('/getPointFromAgenda').post((req, res) => {
    new UsersController().getPointFromAgenda(req, res);
});
usersRouter.route('/searchSessions').post(
    (req, res) => new UsersController().searchSessions(req, res)
)
usersRouter.route('/approveUser').post(
    (req, res) => new UsersController().approveUser(req, res)
)

usersRouter.route('/getAllDiscussion').get(
    (req, res) => new UsersController().getAllDiscussion(req, res)
)

usersRouter.route('/voting').post(
    (req, res) => new UsersController().voting(req, res)
);

usersRouter.route('/sendMsg').post(
    (req, res) => new UsersController().sendMsg(req, res)
);