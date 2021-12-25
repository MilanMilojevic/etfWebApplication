import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mysql from "mysql"
import nodemailer from "nodemailer"
import { usersRouter } from "./routers/users.router";
import multer from 'multer'

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

app.listen(4000, err => {
    if (err) {
        return console.error(err);
    }
    return console.log("ElSednica is running...");
});

export const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "milan",
    password: "milaN123@",
    database: "Esednica"
});

connection.connect();


router.use('/users', usersRouter)
