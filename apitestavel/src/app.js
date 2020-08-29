import express from 'express'
const movies = require('./routes/Movies');
require('./database');


class App{
    constructor(){
        this.app = express();
        this.middlawares()
        this.routes();
    }

    middlawares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
    }

    routes(){
        this.app.use('/movies',movies);
    }
}

export default new App().app