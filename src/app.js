import express from 'express'
const movies = require('./routes/Movies');
const users = require('./routes/Users');
const authRoutes = require('./routes/Auth');
import config from './config/config';
import auth from '../auth';
import { initialize } from 'passport';
//require('./models');
require('./database');


class App{
    constructor(){
        this.config = config;
        this.app = express();
        this.auth = auth(this.app);
        this.middlawares()
        this.routes();
    }

    middlawares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(this.auth.initialize());
    }

    routes(){
        this.app.use('/movies',movies);
        this.app.use('/users',users)
        this.app.use('/token',authRoutes)
    }

    init() {

    }
}

export default new App().app