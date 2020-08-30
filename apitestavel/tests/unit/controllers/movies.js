import MovieController from '../../../src/controllers/MovieController';
import { expect } from 'chai';
import td from 'testdouble'

describe('Controllers: Movies',() => {
    describe('Get All Movies: getAll()', () =>{
        it('Should return a list of all movies', () =>{
            const Movies = {
                findAll: td.function(),
            };


            const expectedResponse = [
                {
                    id: 1,
                    name: 'Teste Movie',
                    created_at: '2020-30-08',
                    updated_at: '2020-30-08'
                }
            ]
            td.when(Movies.findAll({})).thenResolve(expectedResponse);
                        
            const movie = new MovieController(Movies);
            return movie.getAll()
                .then(response => expect(response.data).to.be.eql(expectedResponse));

        })
    })
    
    describe('Get a Movie by id', () =>{
        it('Should return a single movie',() => {
            const Movies = {
                findOne: td.function()
            }
            const expectedResponse = {
                    id: 1,
                    name: 'Teste Movie',
                    created_at: '2020-30-08',
                    updated_at: '2020-30-08'
                }
            
            td.when(Movies.findOne({where: {id:1}})).thenResolve(expectedResponse);

            const movie = new MovieController(Movies);
            return movie.getById({id:1})
                .then(response => {
                    console.log(response);
                    return expect(response.data).to.be.eql(expectedResponse)
                });
        })
    })
    
    describe('Create a Movie: create()',() =>{
        it('Should create a book', () =>{
            const Movies = {
                create: td.function()
            }
            const expectedResponse = {
                id: 1,
                name: 'Rezero',
                created_at: '2020-30-08',
                updated_at: '2020-30-08'
            }

            const expectedMovie = {
                name: 'Rezero'
            }
            td.when(Movies.create(expectedMovie)).thenResolve(expectedResponse);

            const movie = new MovieController(Movies);
            return movie.create(expectedMovie)
                .then(response => {
                    expect(response.statusCode).to.be.eql(201);
                    expect(response.data).to.be.eql(expectedResponse);
                })
        })
    })

    describe('Uptade a existing Movie', () =>{
        it('Should modify the name',() =>{
            const Movies = {
                update: td.function()
            }

            const expectedResponse = {
                id: 1,
                name: 'Rezero2',
                created_at: '2020-30-08',
                updated_at: '2020-30-08'
            }

            const expectedMovie = {
                id: 1,  
                name: 'Rezero2'
            }

            td.when(Movies.update(expectedMovie,{where: {id:1}})).thenResolve(expectedResponse);

            const movie = new MovieController(Movies);
            return movie.update(expectedMovie,{id:1})
                .then(response => expect(response.data).to.be.eql(expectedResponse));
        })
    })
    
    describe('Delete a Movie',() =>{
        it('Should return statusCode sucessfully', () =>{
            const Movies = {
                destroy: td.function()
            }

            td.when(Movies.destroy({where: {id:1}})).thenResolve({})

            const movie = new MovieController(Movies);
            return movie.delete({id: 1})
                .then(response => expect(response.statusCode).to.be.eql(204));
        })
    })
})