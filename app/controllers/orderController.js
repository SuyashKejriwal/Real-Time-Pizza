const Order=require('../models/Order');
const moment=require('moment')
const postOrder=(req,res)=>{
    //console.log(req.body);

    //Validate request 
    const {phone,address}=req.body;
    if(!phone||!address){
        req.flash('error','All fields are required');
        return res.redirect('/cart');
    }

    const order=new Order({
        customerId: req.user._id,
        items:req.session.cart.items,
        phone,
        address
    })

    order.save().then(result=> {
        req.flash('success','Order placed successfully');
        delete req.session.cart
        return res.redirect('/customer/orders');
    }).catch(err=>{
        req.flash('error','Someting went wrong');
        return res.redirect('/cart');
    })
}

const renderOrderPage=async (req,res)=>{
    const orders=await Order.find({customerId: req.user._id},
        null,
        {sort: {'createdAt':-1 }})
   console.log(orders);
   res.header('Cache-Control', 'no-store')
    return res.render('customers/orders',{
        orders,
        moment
    })
}
module.exports={
    postOrder,
    renderOrderPage
}