import passport from 'passport';
import jwt from 'passport-jwt';

const JwtStrategy = jwt.Strategy;

const ExtractJwt = jwt.ExtractJwt;


import { config } from './config.js';

const CODERKEY = config.secret.coderkey;

const initializePassport = () => {

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: CODERKEY
        },
        async (jwt_payload, done) => {
            
            try {

                return done(null, jwt_payload);

            } catch (error) {

                return done(error);

            };

        }
        
    ));

};

const cookieExtractor = (req) => {

    let token = null;
    
    if (req && req.cookies) {
    
        token = req.cookies['token']
    
    };

    return token;

};

export default initializePassport;