const { expect } = require("chai");
import jwt from 'jwt-simple'
import Movie from '../../src/models/Movies';
/* import connection from '../../src/database/index'; */
/* Movie.init(connection); */
import app from '../../src/app.js';
import supertest from 'supertest';
import Users from '../../src/models/Users'
import { jwtSecret } from '../../src/config/config';
global.request = supertest(app);

let token;

describe('Routes Movies',() =>{
    const defaultMovie = {
        id: 1,
        name: "Fate-zero heaven's feel spring song"
    };
    
    beforeEach(done => {
        Users
        .destroy({where: {}})
        .then(() => Users.create({
            name: 'John',
            email: 'lelo@gmail.com',
            password: 'ugly'
        }))
        .then(user =>{
            Movie
                .destroy({where: {}})
                .then(() => Movie.create(defaultMovie))
                .then(() => {
                    token = jwt.encode({id: user.id},jwtSecret);
                    console.log(token);
                    done();
                })
        })
        .catch(err => {
            console.log(err);
        })
    });
    
    describe('Route Get Movies',() =>{
        it('Should return a array of movies avaliables',done =>{
            request
                .get('/movies')
                .set('Authorization',`bearer ${token}`)
                .end((err,res) =>{
                    expect(res.body[0].name).to.be.eql(defaultMovie.name);
                    expect(res.body[0].id).to.be.eql(defaultMovie.id);
                    done(err);
                })
        })
    });
    describe('Route Show Movies',() =>{
        it('Should return a array of movies avaliables',done =>{
            request
                .get('/movies/1')
                .set('Authorization',`bearer ${token}`)
                .end((err,res) =>{
                    expect(res.body.name).to.be.eql(defaultMovie.name);
                    expect(res.body.id).to.be.eql(defaultMovie.id);     
                    done(err);
                })
        })
    });
    describe('Route Update Movies',() => {
        it('Should return the same id, but the name most be something else',done =>{
            const updatedMovie = {
                id: 1,
                name: 'Qualquer Coisa'
            }
            request
                .put('/movies/1')
                .set('Authorization',`bearer ${token}`)
                .send(updatedMovie)
                .end((err,res) => {
                    expect(res.body).to.be.eql([1]);
                    done(err);
                })
        })
    });
    describe('Route Create Movie',() => {
        it('Should Create a Movie',done => {
            const newMovie = {
                id: 2,
                name: 'Rezero'
            };
            request
                .post('/movies')
                .set('Authorization',`bearer ${token}`)
                .send(newMovie)
                .end((err,res) => {
                    expect(res.body.id).to.be.eql(newMovie.id);
                    expect(res.body.name).to.be.eql(newMovie.name)
                    done(err);
                })
        })
    });
    describe('Route Delete Movie',() => {
        it('Should Delete Sucessfully a Movie',done =>{
            request
                .delete('/movies/1')
                .set('Authorization',`bearer ${token}`)
                .end((err,res) => {
                    expect(res.statusCode).to.be.eql(204);
                    done(err);
                })
        })
    })
})
