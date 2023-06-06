import passport from 'passport';
import local from 'passport-local';
import userService from '../models/User.model.js';
import { createHash, validatePassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';


const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, 
        async (req,username, password,done) =>{
            const { first_name, last_name, email, age } = req.body;
            try {
                let user = await userService.findOne({email:username}); 
                if(user){
                    console.log('El usuario existe');
                    return done(null,false);
                }
                const newUser = {
                    first_name, 
                    last_name, 
                    email, 
                    age, 
                    password: createHash(password)
                }

                let result = await userService.create(newUser);
                return done(null, result);

            } catch (error) {
                return done("Error al registrar el usuario: " + error)
            }
        }
    ));
    passport.serializeUser((user,done)=>{
        done(null, user._id)
    });
    passport.deserializeUser( async (id, done)=>{
        let user = await userService.findById(id);
        done(null, user)
    });
    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.2769a36f8fb80ca1',
        clientSecret:'fdfa3154389009f7522258ea82e946cf5029f72a',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
        scope: ["user:email"]

    }, async (accesToken, refreshToken,profile,done)=>{
        try {
            
            console.log(profile);
            let user = await userService.findOne({email: profile._json.email})
            if(!user){

                const email = profile._json.email == null ?  profile._json.username : null;

                const newUser = {
                        first_name: profile._json.name,
                        last_name:'',
                        email: email,
                        age: 18,
                        password: '',
                }
                const result = await userService.create(newUser);
                done(null,result)
            }else{
                
                done(null, user)
            }

        } catch (error) {
            return done(null,error)
        }
    }))
}
export default initializePassport;