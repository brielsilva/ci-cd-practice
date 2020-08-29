import {Router} from 'express';
import Movie from '../models/Movies';

const routes = new Router();


routes.get('/', (req,res) =>{
    Movie.findAll({}).then(data => res.json(data)).catch(err => res.json(err)); 
})
routes.get('/:id',(req,res) => {
    const id = req.params;
    Movie.findOne({where: id}).then(data => res.json(data)).catch(err => res.status(412).res.json(err));
})
routes.put('/:id',(req,res) =>{
    const id = req.params;
    Movie.update(req.body,{where: id}).then(data => res.json(data)).catch(err => res.status(412).res.json(err));
})
routes.post('/',(req,res) =>{
    Movie.create(req.body).then(data => res.json(data)).catch(err => res.status(412).json(err));
})
routes.delete('/:id',(req,res) => {
    Movie.destroy({where: req.params}).then(() => res.sendStatus(204)).catch(err => res.status(412).json(err));
})

module.exports = routes;