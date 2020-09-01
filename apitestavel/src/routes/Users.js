import {Router} from 'express';
import Users from '../models/Users';
import UserController from '../controllers/UserController';

const User = new UserController(Users);

const routes = new Router();


routes.get('/', (req,res) => User.getAll().then(response => res.status(response.statusCode).json(response.data))); 
routes.get('/:id',(req,res) => User.getById(req.params).then(response => res.status(response.statusCode).json(response.data)).catch(err => res.json(err)));
routes.put('/:id',(req,res) => User.update(req.body,req.params).then(response => res.status(response.statusCode).json(response.data)).catch(err => res.json(err)));
routes.post('/',(req,res) => User.create(req.body).then(response => res.status(response.statusCode).json(response.data)).catch(err => res.json(err)));
routes.delete('/:id',(req,res) => User.delete(req.params).then(response => res.status(response.statusCode).json(response.data)).catch(err => res.json(err)));

module.exports = routes;