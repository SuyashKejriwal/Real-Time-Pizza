const renderHomePage=(req,res)=>{

    res.render('home');
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
    renderCartPage
}