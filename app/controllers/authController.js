const User=require('../models/User')
const bcrypt=require('bcrypt');
const passport = require('passport');

const _getRedirectUrl=(req)=>{
    return req.user.role==='admin'?'/admin/orders':'/customer/orders'
}

const postRegister= async (req,res)=>{

    console.log(req.body);
    const { name,email,password } =req.body;
    //Validate request
    if(!name||!email||!password){
        req.flash('error','All fields are required')
        req.flash('name',name);
        req.flash('email',email);
      //  req.flash('password',password);
        return res.redirect('/register')
    }
    
    //check if email exists
    User.exists({email:email},(err,result)=>{
        if(result){
            req.flash('error','Email alreay taken')
            req.flash('name',name);
            req.flash('email',email);
            return res.redirect('/register');
        }
    })

    //Hash Password
    const hashedPassword = await bcrypt.hash(password,10);
    //create a user
    const user=new User({
        name,
        email,
        password:hashedPassword
    })

    user.save().then((user)=>{
        // Login
        return res.redirect('/')
    }).catch(err=>{
        req.flash('error','Something went wrong');
        return res.redirect('/register')
    })
}

const postLogin= (req,res,next)=>{
   // console.log(req.body);
    const { email, password }   = req.body
           // Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
}

const postLogout=(req,res)=>{
    req.logout();
    return res.redirect('/login')
}

module.exports={
    postRegister,
    postLogin,
    postLogout
}