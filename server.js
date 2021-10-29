const express=require('express');
const app=express();
const port=process.env.PORT||3000;
const path=require('path')
const ejs=require('ejs');
const initRoutes=require('./app/routes/initRoutes');
const customerRoutes=require('./app/routes/customerRoutes');
const adminRoutes=require('./app/routes/adminRoutes');
const cartRoutes=require('./app/routes/cartRoutes');
const expressLayout = require('express-ejs-layouts')
const connectDB=require('./app/config/db');

connectDB();

//Assets
app.use(express.static('public'))
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