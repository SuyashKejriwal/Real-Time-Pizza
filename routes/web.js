

function initRoutes(app){

    app.get('/',(req,res)=>{
        res.render('home');
    })

    
}

module.exports=initRoutes