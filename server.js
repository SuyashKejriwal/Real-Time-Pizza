const express=require('express');
const app=express();
const port=process.env.PORT||3000;
const path=require('path')
const ejs=require('ejs');
const initRoutes=require('./routes/web.js')
const expressLayout = require('express-ejs-layouts')

//Assets
app.use(express.static('public'))
//set template engine
//app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

//passing app to initroutes
initRoutes(app);

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(port,()=>{
    console.log(`Listening on port ${port} `);
})