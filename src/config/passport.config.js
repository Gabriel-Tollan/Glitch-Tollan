import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/models/User.model.js';
import { createHash, validatePassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';
import CartManager from '../dao/Managers/cartManagerMongo.js';


const cartManager = new CartManager();
const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, 
        async (req,username, password,done) =>{
            const newCart = await cartManager.addCart();
            const { first_name, last_name, email, age } = req.body;
            try {
                let user = await userModel.findOne({email:username}); 
                if(user){
                    console.log('El usuario existe');
                    return done(null,false);
                }
                const newUser = {
                    first_name, 
                    last_name, 
                    email, 
                    age, 
                    password: createHash(password),
                    cart:newCart.message,payload_id,
                }

                let result = await userModel.create(newUser);
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
        let user = await userModel.findById(id);
        done(null, user)
    });

    passport.use('login', new LocalStrategy({usernameField:'mail'},
    async (username, password, done)=>{
        try{
            const user = await userModel.findOne({ mail:username });
            if (!user) {
                console.log('Usuario inexistente');
                return done(null, false);
            }
            if(!validatePassword(password, user)){
                return done(null, false);
            }
            return done(null, user)

        }catch(err){
            return done("error al intentar ingresar: "+ err)
        }
    }));




    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.2769a36f8fb80ca1',
        clientSecret:'fdfa3154389009f7522258ea82e946cf5029f72a',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
        scope: ["user:email"]

    }, async (accesToken, refreshToken,profile,done)=>{
        try {
            let email = profile._json.email;
            if(!email){
                email = profile._json.login
            }
            console.log(profile);
            let user = await userModel.findOne({email: profile._json.email})
            if(!user){

                const email = profile._json.email == null ?  profile._json.username : null;

                const newUser = {
                        first_name: profile._json.name,
                        last_name:'',
                        email: email,
                        age: 18,
                        password: '',
                }
                const result = await userModel.create(newUser);
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