const express=require('express');
const app=express();
const port=process.env.PORT||3000;
const path=require('path')
const ejs=require('ejs');
const session=require('express-session');
const flash=require('express-flash');
const MongoStore = require('connect-mongo');
const passport=require('passport');
const Emitter = require('events')
const initRoutes=require('./app/routes/initRoutes');
const customerRoutes=require('./app/routes/customerRoutes');
const adminRoutes=require('./app/routes/adminRoutes');
const cartRoutes=require('./app/routes/cartRoutes');
const expressLayout = require('express-ejs-layouts')
const connectDB=require('./app/config/db');

connectDB();

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*24 }, // 24 hrs
    store:MongoStore.create({mongoUrl:process.env.MONGO_CONNECTION_URL})
}))

app.use(flash());

//Passport config
const passportInit=require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session;
    res.locals.user = req.user
    next()
})
//set template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


//Routes
app.use('/',initRoutes);
app.use('/cart',cartRoutes);
app.use('/customer',customerRoutes);
app.use('/admin',adminRoutes);

app.listen(port,()=>{
    console.log(`Listening on port ${port} `);
})