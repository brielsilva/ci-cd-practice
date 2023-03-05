const { expect } = require("chai");

import Users from '../../src/models/Users';



describe('Routes Users',() =>{
    const defaultUser = {
        id: 1,
        name: "Jorge",
        email: 'gabrielcostasilva100@gmail.com',
        password: 'nojento'
    };
    
    beforeEach(done => {
        Users
        .destroy({where: {}})
        .then(() => Users.create(defaultUser))
        .then(() => {
            done();

        })
        .catch(err => {
            console.log(err);
        })
    });
    
    describe('Route Get Users',() =>{
        it('Should return a array of Users avaliables',done =>{
            request
                .get('/users')
                .end((err,res) =>{
                    expect(res.body[0].id).to.be.eql(defaultUser.id);
                    expect(res.body[0].name).to.be.eql(defaultUser.name);
                    expect(res.body[0].email).to.be.eql(defaultUser.email);
                    done(err);
                })
        })
    });
    describe('Route Show Users',() =>{
        it('Should return a array of Users avaliables',done =>{
            request
                .get('/users/1')
                .end((err,res) =>{
                    expect(res.body.name).to.be.eql(defaultUser.name);
                    expect(res.body.id).to.be.eql(defaultUser.id);   
                    expect(res.body.email).to.be.eql(defaultUser.email);
                    expect(res.body.password_hash).to.be.eql(defaultUser.password_hash)
                    done(err);
                })
        })
    });
    describe('Route Update Users',() => {
        it('Should return the same id, but the name most be something else',done =>{
            const updatedUsers = {
                id: 1,
                name: 'Qualquer Coisa',
                email: 'newEmail@email.com'
            }
            request
                .put('/Users/1')
                .send(updatedUsers)
                .end((err,res) => {
                    expect(res.body).to.be.eql([1]);
                    done(err);
                })
        })
    });
    describe('Route Create User',() => {
        it('Should Create a User',done => {
            const newUsers = {
                id: 2,
                name: 'Rezero',
                email: 'gabriel@email.com',
                password: 'nojento2'
            };
            request
                .post('/users')
                .send(newUsers)
                .end((err,res) => {
                    expect(res.body.id).to.be.eql(newUsers.id);
                    expect(res.body.name).to.be.eql(newUsers.name)
                    expect(res.body.email).to.be.eql(newUsers.email)
                    done(err);
                })
        })
    });
    describe('Route Delete User',() => {
        it('Should Delete Sucessfully a User',done =>{
            request
                .delete('/users/1')
                .end((err,res) => {
                    expect(res.statusCode).to.be.eql(204);
                    done(err);
                })
        })
    })
})
