const Menu=require('../models/Menu')
const renderHomePage=async (req,res)=>{
    const pizzas = await Menu.find()
    res.render('home',{ pizzas:pizzas});
}

const renderLoginPage=(req,res)=>{
    res.render('auth/login');
}

const renderRegisterPage=(req,res)=>{
    res.render('auth/register');
}

const renderCartPage=(req,res)=>{
    res.render('customers/cart');
}


module.exports={
    renderHomePage,
    renderLoginPage,
    renderRegisterPage,
    renderCartPage,
    
}