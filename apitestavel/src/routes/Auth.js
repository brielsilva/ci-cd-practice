import httpStatus from 'http-status';
import jwt from 'jwt-simple';
import {Router} from 'express';
import Users from '../models/Users'
import config from '../config/config'
const routes = new Router();

routes.post('/',(req,res) =>{
    if(req.body.email && req.body.password){
        const email = req.body.email;
        const password = req.body.password;

        Users.findOne({where: {email}})
            .then(user => {
                if(Users.verifyPassword(password,user.password)){
                    const payload = {id: user.id};
                    res.json({
                        token: jwt.encode(payload,config.jwtSecret)
                    })
                    console.log(req.headers);
                }
                return res.sendStatus(httpStatus.UNAUTHORIZED);
            })
            .catch(err => res.sendStatus(httpStatus.UNAUTHORIZED));
    }
    else{
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
})

module.exports = routes;