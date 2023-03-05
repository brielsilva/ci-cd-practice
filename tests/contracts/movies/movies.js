const { expect } = require("chai");
import Joi from 'joi'
import Movie from '../../../src/models/Movies';
import jwt from 'jwt-simple'
import { jwtSecret } from '../../../src/config/config';
import Users from '../../../src/models/Users';


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
            const moviesSchemaArray = Joi.array().items(Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                createdAt: Joi.date().iso(),
                updatedAt: Joi.date().iso()
            }))
            
            request
                .get('/movies')
                .set('Authorization',`bearer ${token}`)
                .end((err,res) =>{
                    Joi.assert(res.body,moviesSchemaArray)
                    done(err);
                })
        })
    });
    describe('Route Show Movies',() =>{
        it('Should return a array of movies avaliables',done =>{
            const moviesSchema = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                createdAt: Joi.date().iso(),
                updatedAt: Joi.date().iso()
            })
            request
                .get('/movies/1')
                .set('Authorization',`bearer ${token}`)
                .end((err,res) =>{
                    Joi.assert(res.body,moviesSchema) 
                    done(err);
                })
        })
    });
    
    describe('Route Post Movie',() => {
        it('Should Create a Movie',done => {
            const moviesSchema = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                createdAt: Joi.date().iso(),
                updatedAt: Joi.date().iso()
            })
            
            const newMovie = {
                id: 2,
                name: 'Rezero'
            };
            request
                .post('/movies')
                .set('Authorization',`bearer ${token}`)
                .send(newMovie)
                .end((err,res) => {
                    Joi.assert(res.body,moviesSchema);
                    done(err);
                })
        })
    });
    describe('Route Update Movie',() => {
        it('Should Update a Movie',done => {
            const newMovie = {
                id: 2,
                name: 'Rezero'
            };
            const updatedCount = Joi.array().items(1)
            request
                .put('/movies/1')
                .set('Authorization',`bearer ${token}`)
                .send(newMovie)
                .end((err,res) => {
                    Joi.assert(res.body,updatedCount);
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
