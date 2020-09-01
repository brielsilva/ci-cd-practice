import {Router} from 'express';
import Movie from '../models/Movies';
import MovieController from '../controllers/MovieController';


const Movies = new MovieController(Movie);

const routes = new Router();


routes.get('/',(req,res) => Movies.getAll().then(response => res.status(response.statusCode).json(response.data))); 
routes.get('/:id',(req,res) => Movies.getById(req.params).then(response => res.status(response.statusCode).json(response.data)).catch(err => res.json(err)));
routes.put('/:id',(req,res) => Movies.update(req.body,req.params).then(response => res.status(response.statusCode).json(response.data)).catch(err => res.json(err)));
routes.post('/',(req,res) => Movies.create(req.body).then(response => res.status(response.statusCode).json(response.data)).catch(err => res.json(err)));
routes.delete('/:id',(req,res) => Movies.delete(req.params).then(response => res.status(response.statusCode).json(response.data)).catch(err => res.json(err)));

module.exports = routes;