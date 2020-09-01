import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import Users from './src/models/Users';
import config from './src/config/config';

export default app => {
    const opts = {};
    opts.secretOrKey = config.jwtSecret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    const strategy = new Strategy(opts,(payload,done) =>{
        Users.findByPk(payload.id)
            .then(user => {
                if(user){
                    return done(null,{
                        id: user.id,
                        email: user.email,
                    })
                }
                return done(null,false)
            })
            .catch(err => done(err,null))
    })

    passport.use(strategy)

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt',config.jwtSession)
    }
}